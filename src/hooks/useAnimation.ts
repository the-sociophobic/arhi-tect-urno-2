import { useCallback, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import { Vector3 } from '../types/three.type'


export type AnimationProps<T> = {
  startValue: T
  endValue: T
  duration: number
  onChange: (value: T) => void
}

export type AnimationStateType = 'forward' | 'backward' | 'paused' | 'start' | 'finish'


const useAnimation = <T = number | Vector3>({
  startValue,
  endValue,
  duration,
  onChange,
}: AnimationProps<T>) => {
  const state = useRef<AnimationStateType>('start')
  const startTime = useRef(0)
  const alpha = useRef(0)
  const { clock } = useThree()

  const handleAnimation = (
    elapsedTime: number
  ) => {
    // if (['start', 'finish'].includes(state.current))
    //   return

    const endTime = startTime.current + duration
    if (elapsedTime < startTime.current || elapsedTime > endTime)
      return

    if (state.current === 'paused') {
      startTime.current = elapsedTime - duration * alpha.current
    } else {
      let pastTime = 0
      switch (state.current) {
        case 'forward':
          pastTime = elapsedTime - startTime.current
          break
        case 'backward':
          pastTime = endTime - elapsedTime
          break
      }
      let updatedAlpha = pastTime / duration
      let updatedState = state.current

      if (state.current === 'forward' && updatedAlpha >= 1) {
        updatedState = 'finish'
        updatedAlpha = 1
      }
      if (state.current === 'backward' && updatedAlpha <= 0) {
        updatedState = 'start'
        updatedAlpha = 0
      }

      const isNumberType = typeof startValue === 'number'
      const currentValue: T = isNumberType ?
        lerpNumber(startValue, endValue as number, updatedAlpha) as T
        :
        lerpVector3(startValue as Vector3, endValue as Vector3, updatedAlpha) as T

      alpha.current = updatedAlpha
      state.current = updatedState
      onChange(currentValue)
    }
  }

  useFrame(threeState => {
    const { elapsedTime } = threeState.clock
    handleAnimation(elapsedTime)
  })

  const play = useCallback(() => {
    if (['forward', 'finish'].includes(state.current))
      return

    if (state.current === 'start')
      startTime.current = clock.elapsedTime
    if (['backward', 'paused'].includes(state.current))
      startTime.current = clock.elapsedTime - alpha.current * duration

    state.current = 'forward' as AnimationStateType
  }, [clock.elapsedTime])
  const playBackward = useCallback(() => {
    if (['backward', 'start'].includes(state.current))
      return

    if (state.current === 'finish')
      startTime.current = clock.elapsedTime
    if (['forward', 'paused'].includes(state.current))
      startTime.current = clock.elapsedTime - (1 - alpha.current) * duration

    state.current = 'backward' as AnimationStateType
  }, [clock.elapsedTime])
  const pause = () => {
    state.current = 'paused'
  }

  return {
    play,
    playBackward,
    pause,
    state
  }
}


export default useAnimation


export const lerpNumber = (
  startValue: number,
  endValue: number,
  alpha: number
) => {
  return startValue + (endValue - startValue) * alpha
}

export const lerpVector3 = (
  startValue: Vector3,
  endValue: Vector3,
  alpha: number
) => {
  return [
    lerpNumber(startValue[0], endValue[0], alpha),
    lerpNumber(startValue[1], endValue[1], alpha),
    lerpNumber(startValue[2], endValue[2], alpha),
  ] as Vector3
}
