import { FC } from 'react'


export type TransparentMaterialProps = {
  opacity?: number
}


export const TransparentMaterial: FC<TransparentMaterialProps> = ({
  opacity = 0
}) => {
  return (
    <meshStandardMaterial
      transparent
      opacity={opacity}
    />
  )
}
