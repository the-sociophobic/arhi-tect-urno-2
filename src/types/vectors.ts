import { Vector3, Vector4 } from './core'

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
