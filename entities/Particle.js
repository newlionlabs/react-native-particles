//@flow
import { Vector } from './Vector';
import type { VectorType } from './Vector';

export type ParticleType = {
  velocity: VectorType,
  acceleration: VectorType,
  id: number,
  position: VectorType,
  // Advanced:
  scale: number,
  rotation: number,
  angularVelocity: number,
  randomAcceleration: VectorType,
  damping: VectorType,
  angularDamping: number,
  scaleGrow: number
};

export const Particle = (
  velocity: VectorType = Vector(0, 0),
  acceleration: VectorType = Vector(0, 0),
  id: number,
  position?: VectorType = Vector(0, 0),
  scale?: number,
  rotation?: number,
  angularVelocity?: number,
  randomAcceleration?: number,
  damping?: VectorType,
  angularDamping?: number,
  scaleGrow?: number
): ParticleType => ({
  position,
  velocity,
  acceleration,
  id,
  scale,
  rotation,
  angularVelocity,
  randomAcceleration,
  damping,
  angularDamping,
  scaleGrow
});
