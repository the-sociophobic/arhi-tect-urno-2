import { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import generatePath from '../utils/generatePath'
import useContentful from '../hooks/useContentful'
import MediaRenderOne from './MediaRenderOne'
import useAnimation from '../hooks/useAnimation'
import useStore from '../hooks/useStore'
import { Vector3 } from '../types/three.type'


const envMapSource = generatePath('/hdri/studio_1k_bw.hdr')

const TIME_SCALE = 0.01


export type MediaReelProps = {
  position?: Vector3
  scale?: Vector3
}


const MediaReel: FC<MediaReelProps> = ({
  position,
  scale
}) => {
  const groupRef = useRef<THREE.Group>(null)
  const alphaScale = useRef(1)
  const modifiedTime = useRef(0)
  const {
    play,
    playBackward
  } = useAnimation<number>({
    startValue: 1,
    endValue: 0,
    duration: .25,
    onChange: value => {
      alphaScale.current = value
    }
  })
  useFrame((threeState, delta) => {
    if (groupRef.current) {
      modifiedTime.current += delta * alphaScale.current
      const scaledTime = modifiedTime.current * TIME_SCALE
      const alpha = scaledTime - Math.floor(scaledTime)

      groupRef.current.rotation.set(
        0,
        alpha * Math.PI * 2,
        0
      )
    }
  })

  const { hoveredIds } = useStore()

  useEffect(() => {
    if (hoveredIds.length > 0)
      play()
    else
      playBackward()
  }, [hoveredIds])

  const { data: contentful } = useContentful()

  if (!contentful)
    return <></>

  const { medias } = contentful

  return (
    <>
      <Environment files={envMapSource} />
      <ambientLight intensity={3} />
      <group
        position={position}
        scale={scale || [.9, .9, .9]}
        rotation={[
          .3,
          0,
          0
          // -.3
        ]}
      >
        <group
          ref={groupRef}
        >
          {medias.map((mediaEntry, mediaEntryIndex) => {
            const rotation = mediaEntryIndex / medias.length * Math.PI * 2

            return (
              <MediaRenderOne
                key={mediaEntryIndex}
                media={mediaEntry}
                position={[4, 0, 0]}
                rotation={[0, rotation, 0]}
                scale={[2, 1.25, .01]}
              />
            )
          }
          )}
        </group>
      </group>
    </>
  )
}


export default MediaReel
