import { useEffect } from 'react'


export type FunctionType = (args: any) => any


class ThreeRef<T> {
  constructor(initialValue: T, initialListeners?: FunctionType[]) {
    this.current = initialValue
    this.callbacks = initialListeners || []
  }
  current: T
  callbacks: FunctionType[]
}

const createRef = <T>(value?: T | null): ThreeRef<T | null> => {
  if (value === undefined) {
    return new ThreeRef<T | null>(null)
  }
  return new ThreeRef<T | null>(value)
}

const subscribeThreeRef = <T>(ref: ThreeRef<T>, cb: FunctionType) => {
  if (!ref.callbacks.includes(cb))
    ref.callbacks.push(cb)
}

const notifyThreeRef = <T>(ref: ThreeRef<T>, event: any = undefined) => {
  ref.callbacks
    .forEach(callback => callback(event))
}

const unsubscribeThreeRef = <T>(ref: ThreeRef<T>, callback: FunctionType) => {
  ref.callbacks = ref.callbacks
    .filter(fn => fn !== callback)
}

const useSubscribeThreeRef = <T>(ref: ThreeRef<T>, callback: FunctionType) => {
  useEffect(() => {
    subscribeThreeRef(ref, callback)

    return () => {
      unsubscribeThreeRef(ref, callback)
    }
  }, [callback])
}


export {
  ThreeRef,
  createRef,
  subscribeThreeRef,
  notifyThreeRef,
  unsubscribeThreeRef,
  useSubscribeThreeRef,
}
