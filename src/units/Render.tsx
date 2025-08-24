import React from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

import useMouseClick from './useMouseClick'
import useStore from '../hooks/useStore'


const rayOrigin = new THREE.Vector3()
const rayDirection = new THREE.Vector3()


export type SelectableUnitProps = {
  userData: {
    id?: string
    getId?: (intersectionPos: THREE.Vector3) => string
    type: string
  }
}

export type IntersectionObjectType = null | (THREE.Object3D & SelectableUnitProps)


const RaycasterRender: React.FC = () => {
  const {
    hoveredIds,
    setHoveredIds,
    setSelectedIds,
    mouseClicked
  } = useStore()
  
  useFrame(three => {
    if (mouseClicked) {
      return
    }

    const { raycaster, camera, scene, pointer: cursorOnScreen } = three
    
    raycaster.setFromCamera(cursorOnScreen, camera)

    const intersections = raycaster
      .intersectObjects(scene.children)
      .sort((a, b) => a.distance - b.distance)
    const intersection = intersections[0]

    if (!intersection || !intersection.object) {
      if (hoveredIds.length > 0)
        setHoveredIds([])
      return
    }

    rayOrigin.copy(raycaster.ray.origin)
    rayDirection.copy(raycaster.ray.direction)
    const intersectionPos = rayOrigin.add(rayDirection.normalize().multiplyScalar(intersection.distance))

    const parent_with_id = intersection.object as IntersectionObjectType
    // while (parent_with_id && !(
    //   (parent_with_id.userData.id || parent_with_id.userData.getId) &&
    //   parent_with_id.userData.interactive
    // )) {
    //   parent_with_id = parent_with_id.parent as IntersectionObjectType
    // }

    if (parent_with_id) {
      const hoveredId = parent_with_id.userData.id || parent_with_id.userData.getId?.(intersectionPos)
      const newHoveredIds = hoveredId ? [hoveredId] : []

      if (hoveredIds[0] !== newHoveredIds[0]) {
        setHoveredIds(newHoveredIds)
      }
    } else {
      if (hoveredIds.length > 0) {
        setHoveredIds([])
      }
    }
  })

  const { gl } = useThree()

  useMouseClick(() => {
    setSelectedIds(hoveredIds)
  }, gl.domElement)

  return (
    <></>
  )
}


export default RaycasterRender
