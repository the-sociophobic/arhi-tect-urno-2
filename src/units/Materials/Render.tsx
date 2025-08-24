import { FC } from 'react'

import { MaterialsRenderData } from './Types'
import { MaterialsRenderOne } from './RenderOne'


export const MaterialsRender: FC<MaterialsRenderData> = ({
  materials,
  materialGroups,
  ...otherProps
}) => {
  const materialIndexes = materialGroups.map(group => group.materialIndex)
  const usedMaterials = materials.filter(material => materialIndexes.includes(material.materialIndex))

  return usedMaterials.map(material =>
    <MaterialsRenderOne
      key={material.id}
      material={material}
      {...otherProps}
    />
  )
}
