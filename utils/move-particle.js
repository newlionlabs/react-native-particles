//@flow
import { Particle } from './../entities/Particle';
import { add, multiply } from './vector-helpers';
import { Vector } from './../entities/Vector';
import type { VectorType } from './../entities/Vector';
import type { ParticleType } from './../entities/Particle';

randomVector = (vector: VectorType) => {
  const x = (Math.random() * 2 - 1) * vector.x;
  const y = (Math.random() * 2 - 1) * vector.y;
  return Vector(x, y);
};

export const move = (particle: ParticleType): ParticleType => {
  const acceleration =
    particle.randomAcceleration !== undefined
      ? add(particle.acceleration, randomVector(particle.randomAcceleration))
      : particle.acceleration;
  let velocity = multiply(
    add(particle.velocity, acceleration),
    particle.damping !== undefined ? particle.damping : 1
  );
  const position = add(particle.position, velocity);

  let angularVelocity =
    particle.angularVelocity !== undefined ? particle.angularVelocity : 0;
  angularVelocity *=
    particle.angularDamping !== undefined ? particle.angularDamping : 1;
  let rotation = particle.rotation !== undefined ? particle.rotation : 0;
  rotation += angularVelocity;
  let scale = particle.scale !== undefined ? particle.scale : 1;
  scale *= particle.scaleGrow !== undefined ? particle.scaleGrow : 1; // TODO make this affected by delta time
  const movedParticle = Particle(
    velocity,
    particle.acceleration,
    particle.id,
    position,
    scale,
    rotation,
    angularVelocity,
    particle.randomAcceleration,
    particle.damping,
    particle.angularDamping,
    particle.scaleGrow
  );
  return movedParticle;
};

export default Particle;
