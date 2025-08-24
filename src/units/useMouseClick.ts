import { useEffect, useRef } from 'react'


// Функция определяет нажатие мышкой без drag. Обычный click лисенер срабатывает на drag
const useMouseClick = (
  callback: (e: MouseEvent) => void,
  target: Window | HTMLElement = window
) => {
  const startX = useRef(0)
  const startY = useRef(0)
  const dragged = useRef(false)

  const setClickStart = (e: MouseEvent) => {
    startX.current = e.pageX
    startY.current = e.pageY
    dragged.current = false
  }

  const handleMouseMove = () => {
    dragged.current = true
  }

  const checkClickEnd = (e: MouseEvent) => {
    // if (startX.current === e.pageX && startY.current === e.pageY)
    if (!dragged.current)
      callback(e)
  }

  useEffect(() => {
    target.addEventListener('mousedown', setClickStart as any)
    target.addEventListener('mousemove', handleMouseMove)
    target.addEventListener('mouseup', checkClickEnd as any)

    return () => {
      target.removeEventListener('mousedown', setClickStart as any)
      target.removeEventListener('mousemove', handleMouseMove)
      target.removeEventListener('mouseup', checkClickEnd as any)
    }
  }, [callback])
}


export default useMouseClick
