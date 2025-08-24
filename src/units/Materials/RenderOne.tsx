import { FC, useEffect } from 'react'

import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

import { MaterialsRenderOneData } from './Types'


export const MaterialsRenderOne: FC<MaterialsRenderOneData> = ({
  _ref,
  material,
  textureOffset: textureOffsetFromProps,
  textureSize: textureSizeFromProps,
  ...otherProps
}) => {
  const hasTextureMaps = !!material.textureMaps
  const texturesToLoad = hasTextureMaps ?
    material.textureMaps!.map(textureMap => textureMap.src)
    :
    [material.src]

  const loadedTextures = useLoader(
    TextureLoader,
    texturesToLoad
  )

  // Инициализация текстур
  loadedTextures.forEach(texture => {
    // TODO Придумать более красивый способ определять, что текстура проинициализирована
    if (texture.wrapS === THREE.RepeatWrapping)
      return

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    const { textureSize: textureSizeFromMaterialData } = material
    const textureSize = {
      U: (textureSizeFromMaterialData?.U || 1) * (textureSizeFromProps?.U || 1),
      V: (textureSizeFromMaterialData?.V || 1) * (textureSizeFromProps?.V || 1),
    }
    const textureOffset = {
      U: textureOffsetFromProps?.U || 0,
      V: textureOffsetFromProps?.V || 0,
    }

    texture.repeat.set(
      1 / textureSize.U,
      1 / textureSize.V,
    )
    texture.offset.set(
      -textureOffset.U / textureSize.U,
      textureOffset.V / textureSize.V,
    )
  })

  // Обновление текстур при смещении точки раскладки
  useEffect(() => {
    loadedTextures.forEach(texture => {
      const { textureSize: textureSizeFromMaterialData } = material
      const textureSize = {
        U: (textureSizeFromMaterialData?.U || 1) * (textureSizeFromProps?.U || 1),
        V: (textureSizeFromMaterialData?.V || 1) * (textureSizeFromProps?.V || 1),
      }
      const textureOffset = {
        U: textureOffsetFromProps?.U || 0,
        V: textureOffsetFromProps?.V || 0,
      }

      texture.offset.set(
        -textureOffset.U / textureSize.U,
        textureOffset.V / textureSize.V,
      )
    })
  }, [textureOffsetFromProps])

  const textureMapProps = hasTextureMaps ?
    material.textureMaps!
      .map((textureMap, textureMapIndex) => ({ [textureMap.mapType]: loadedTextures[textureMapIndex] }))
      .reduce((a, b) => ({ ...a, ...b }))
    :
    ({ map: loadedTextures[0] })

  return (
    <meshStandardMaterial
      ref={_ref}
      // attach={`material-${loadedMaterial.materialIndex}`}
      transparent
      {...textureMapProps}
      {...otherProps}
    />
  )
}
