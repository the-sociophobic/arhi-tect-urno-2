export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]

export interface Shifts {
  position?: Vector3
  rotation?: Vector3
  scale?: Vector3
}

export interface MatrixTransforms {
  position: Vector3
  quaternion: Vector4
  scale: Vector3
}

