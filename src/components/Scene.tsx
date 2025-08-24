import { FC } from 'react'
import { Canvas } from '@react-three/fiber'

import MediaReel from '../units/MediaReel'


const Scene: FC = () => {
  return (
    <Canvas
      orthographic
      camera={{
          zoom: 115,
          position: [0, 0, 10]
        }}
    >
      <MediaReel />
    </Canvas>
  )
}


export default Scene
