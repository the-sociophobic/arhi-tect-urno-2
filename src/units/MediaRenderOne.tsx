import { FC, useEffect, useRef } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'
// import { useRouter } from 'next/navigation'

import { Vector3 } from '../types/three.type'
import { MaterialsRenderOne } from './Materials/RenderOne'
import useMousePointerOnHover from '../hooks/useMousePointerOnHover'
import useAnimation from '../hooks/useAnimation'
import { ContentfulMediaType } from '../types/contentful.type'
import RaycasterRender from './Render'
import useStore from '../hooks/useStore'


export type MediaRenderOneProps = {
  media: ContentfulMediaType
  position: Vector3
  rotation: Vector3
  scale: Vector3
}


const MediaRenderOne: FC<MediaRenderOneProps> = ({
  media,
  position,
  rotation,
  scale,
}) => {
  const boxRef = useRef<THREE.Mesh>(null)
  const onChange = (value: Vector3) => {
    boxRef.current?.position.set(...value)
  }
  const {
    play,
    playBackward,
  } = useAnimation<Vector3>({
    startValue: position,
    endValue: [position[0] + .3, position[1], position[2]],
    duration: .25,
    onChange,
  })

  const onChangeScale = (value: Vector3) => {
    boxRef.current?.scale.set(...value)
  }
  const {
    play: playScale,
    playBackward: playBackwardScale,
  } = useAnimation<Vector3>({
    startValue: scale,
    endValue: [scale[0] * 1.3, scale[1] * 1.3, scale[2] * 1.3],
    duration: .25,
    onChange: onChangeScale,
  })
  const mousePointerProps = useMousePointerOnHover()

  const { hoveredIds } = useStore()
  useEffect(() => {
    if (hoveredIds[0] === media.id) {
      play()
      playScale()
    } else {
      playBackward()
      playBackwardScale()
    }
  }, [hoveredIds])

  // const router = useRouter()

  return (
    <>
      <RaycasterRender />
      <group
        rotation={rotation}
      >
        <Box
          userData={{
            id: media.id
          }}
          ref={boxRef}
          scale={scale}
          position={position}
          // onClick={() => router.push(`/media/${media.url}`)}
          onClick={() => window.open(media.url)}
          {...mousePointerProps}
        >
          <MaterialsRenderOne
            material={{
              id: media.id,
              src: media.thumbnail.file.url,
              materialIndex: 0
            }}
            opacity={.75}
          />
        </Box>
      </group>
    </>
  )
}


export default MediaRenderOne
