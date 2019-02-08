//@flow
import type { Element } from 'react';
import React from 'react';
import { Animated, Easing } from 'react-native';
import { Vector } from './entities/Vector';
import { fromAngle, toRadians } from './utils/vector-helpers';
import { move } from './utils/move-particle';
import emitParticleAdvanced from './utils/emit-advanced-particle';
import type { VectorType } from './entities/Vector';
import type { ParticleType } from './entities/Particle';
import type { BaseEmitterType } from './BaseEmitter';
import BaseEmitter from './BaseEmitter';
import type { RangeType } from '.entities/Range';
import { Range } from './entities/Range';

randomRange = (range: RangeType) => {
  return Math.random() * (range.max - range.min) + range.min;
};

randomFactor = (factor: number) => {
  return factor * (Math.random() * 2 - 1);
};

export type AdvancedEmitterType = BaseEmitterType & {
  /** The direction angle of the particle (in degrees) */
  direction: number,
  /** The spread angle where particles are allowed to be rendered (in degrees) */
  spread: number,
  /** The speed of each particle */
  speed?: RangeType,
  /** Gravity force to be applied to the particle movement */
  gravity?: number,
  /** number of steps the animation will be divided ( more segments == more precise animation == slow performance) */
  segments?: number,

  //Advanced
  scale?: RangeType,

  randomAcceleration?: VectorType,
  damping?: VectorType,
  scaleGrow?: number,
  randomVelocity?: VectorType,
  velocity?: VectorType,

  rotation?: number,
  randomizeRotation?: boolean,
  angularVelocity?: number,
  angularDamping?: number,
  randomAngularVelocity?: number
};

export class AdvancedEmitter extends React.Component<AdvancedEmitterType> {
  emitter: BaseEmitter;

  static defaultProps = {
    gravity: 0.2,
    segments: 10,
    speed: Range(1, 1),
    scale: Range(1, 1),
    randomAcceleration: Vector(0, 0),
    damping: Vector(1, 1),
    scaleGrow: 0,
    randomVelocity: Vector(0, 0),
    velocity: Vector(0, 0),
    rotation: 0,
    randomizeRotation: true,
    angularVelocity: 0,
    angularDamping: 1,
    randomAngularVelocity: 0
  };

  _storeEmitterRef: any => void;

  constructor(props: EmitterType) {
    super(props);
    this._calculate = this._calculate.bind(this);
    this._animateParticle = this._animateParticle.bind(this);
    this._storeEmitterRef = emitter => (this.emitter = emitter);
  }

  render() {
    return (
      <BaseEmitter
        {...this.props}
        onCalculate={this._calculate}
        ref={this._storeEmitterRef}
        onAnimate={this._animateParticle}
      />
    );
  }

  _calculate = (initialPosition: VectorType, particlesCounter: number) => {
    const {
      numberOfParticles,
      emissionRate,
      direction,
      speed,
      spread,
      gravity,
      segments,
      scale,
      randomAcceleration,
      damping,
      scaleGrow,
      randomVelocity,
      velocity,
      rotation,
      randomizeRotation,
      angularVelocity,
      angularDamping,
      randomAngularVelocity
    } = this.props;

    // if we're at our max, stop emitting.
    const rate = Math.min(numberOfParticles, emissionRate);
    const newParticles = [];
    console.log('calculate - scale', scale);
    // for [emissionRate], emit a particle
    for (let j = 0; j < rate; j++) {
      /*
                      first step - Emit new particles
                     */
      console.log('1');  
      const initialSpeed = randomRange(speed);
      console.log('2', scale);
      const initialScale = randomRange(scale);
      console.log('3');
      let initialRotation = randomizeRotation
        ? Math.random() * Math.PI * 2
        : rotation;
      const initialAngularVelocity =
        angularVelocity + randomFactor(randomAngularVelocity);

      const particle = emitParticleAdvanced(
        initialPosition,
        fromAngle(toRadians(direction), initialSpeed),
        toRadians(spread),
        //Apply gravity to the vertical axis
        Vector(0, gravity),
        // Particle id
        particlesCounter + j,
        initialScale,
        initialRotation,
        initialAngularVelocity,
        randomAcceleration,
        damping,
        angularDamping,
        scaleGrow
      );

      // Calculate the particle path
      // TODO: Improve the performance currently O(n2)
      const path: VectorType[] = [];
      const scalePath: number[] = [];
      const rotationPath: number[] = [];
      let particleMovement: ParticleType = particle;
      for (let j = 0; j < segments; j++) {
        path.push(particleMovement.position);
        scalePath.push(particleMovement.scale);
        rotationPath.push(particleMoveent.rotation);
        particleMovement = move(particleMovement);
      }
      newParticles.push({
        particle,
        path,
        scale: scalePath,
        rotation: rotationPath
      });
    }

    return newParticles;
  };


  _animateParticle = (path, transformValue, opacityValue) => {
    const { particleLife } = this.props;
    return Animated.parallel([
      Animated.timing(transformValue, {
        toValue: path.length,
        duration: particleLife,
        useNativeDriver: true
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        ease: Easing.inOut(Easing.quad),
        delay: particleLife * 0.8,
        duration: particleLife * 0.2,
        useNativeDriver: true
      })
    ]);
  };

  start() {
    this.emitter.start();
  }
}

export default AdvancedEmitter;
