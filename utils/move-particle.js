//@flow
import { Particle } from './../entities/Particle';
import { add, multiply } from './vector-helpers';
import { Vector } from './../entities/Vector';
import type { VectorType } from './../entities/Vector';
import type { ParticleType } from './../entities/Particle';

randomVector = (vector: VectorType) => {
  const x = (Math.random() * 2 - 1) * vector.x;
  const y = (Math.random() * 2 - 1) * vector.y;
  return Vector(x,y);
};

export const move = (particle: ParticleType): ParticleType => {
  const acceleration = particle.randomAcceleration ? add(particle.acceleration, randomVector(particle.randomAcceleration)) : particle.acceleration;
  let velocity = multiply(add(particle.velocity, acceleration), particle.damping || 1);
  const position = add(particle.position, velocity);

  const angularVelocity = particle.angularVelocity || 0 * particle.angularDamping || 0;
  const rotation = particle.rotation || 0 + angularVelocity;
  const size = Math.max(0, particle.size + particle.sizeGrow || 0); // TODO make this affected by delta time
  return Particle(velocity, particle.acceleration, particle.id, position, size, rotation, angularVelocity, particle.randomAcceleration, particle.damping, particle.angularDamping, particle.sizeGrow);
};

export default Particle;
