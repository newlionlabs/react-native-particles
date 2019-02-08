//@flow
import { Vector } from './Vector';
import type { VectorType } from './Vector';

export type ParticleType = {
  velocity: VectorType,
  acceleration: VectorType,
  id: number,
  position: VectorType,
  // Advanced:
  size: number,
  rotation: number,
  angularVelocity: number,
  randomAcceleration: VectorType,
  damping: VectorType,
  angularDamping: number,
  sizeGrow: number
};

export const Particle = (
  velocity: VectorType = Vector(0, 0),
  acceleration: VectorType = Vector(0, 0),
  id: number,
  position?: VectorType = Vector(0, 0),
  size?: number,
  rotation?: number,
  angularVelocity?: number,
  randomAcceleration?: number,
  damping?: VectorType,
  angularDamping?: number,
  sizeGrow?: number
): ParticleType => ({
  position,
  velocity,
  acceleration,
  id,
  size,
  rotation,
  angularVelocity,
  randomAcceleration,
  damping,
  angularDamping,
  sizeGrow
});
