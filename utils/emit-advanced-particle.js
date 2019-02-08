//@flow
import { fromAngle, getAngle, getMagnitude } from './vector-helpers';
import { Particle } from './../entities/Particle';

import type { VectorType } from './../entities/Vector';
import type { ParticleType } from './../entities/Particle';

const emitAdvancedParticle = function(
  position: VectorType,
  velocity: VectorType,
  spread: number = Math.PI / 32,
  acceleration: VectorType,
  id: number,
  scale: number,
  rotation: number,
  angularVelocity: number,
  randomAcceleration: VectorType,
  damping: VectorType,
  angularDamping: number,
  scaleGrow: number
): ParticleType {
  // Use an angle randomized over the spread so we have more of a "spray"
  const angle = getAngle(velocity) + spread - Math.random() * spread * 2;

  // The magnitude of the emitter's velocity
  const magnitude = getMagnitude(velocity);

  // New velocity based off of the calculated angle and magnitude
  const newVelocity = fromAngle(angle, magnitude);

  // return our new Particle in the initialPosition without acceleration
  return Particle(
    newVelocity,
    acceleration,
    id,
    position,
    scale,
    rotation,
    angularVelocity,
    randomAcceleration,
    damping,
    angularDamping,
    scaleGrow
  );
};

export default emitAdvancedParticle;
