import { useEffect, useState } from 'react'


const useMousePointerOnHover = () => {
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  
  return ({
    onPointerOver: () => setHovered(true),
    onPointerOut: () => setHovered(false),
  })
}


export default useMousePointerOnHover
