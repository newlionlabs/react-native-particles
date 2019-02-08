//@flow
import React from 'react';

import { StyleSheet, Animated, Easing } from 'react-native';
import type { InterpolationConfigType } from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation';

import type { Element } from 'react';
import type { VectorType } from './entities/Vector';

export type ParticleKeyframeType = {
  position: VectorType[],
  scale: number[],
  rotation: number[]
};

export interface IAnimatedParticle {
  /** Number of particles to emit */
  path: VectorType[];
  scale: number[];
  rotation: number[];

  /** The position from where the particles should be generated */
  lifetime: number;

  /** Function triggered when the particle reaches the lifetime */
  onLifeEnds: () => any;

  /** Start the animation on the initialization */
  autoStart: boolean;

  /** Start the animation on the initialization */
  style: any;

  children: Element<any>;
}

interface IAnimatedParticleState {
  animatedValue: Animated.Value;
  opacityValue: Animated.Value;
  translateX: InterpolationConfigType;
  translateY: InterpolationConfigType;
  scale: InterpolationConfigType;
  rotation: InterpolationConfigType;
}

type InterpolationConfig = {
  translateX: InterpolationConfigType,
  translateY: InterpolationConfigType,
  scale: InterpolationConfigType,
  rotation: InterpolationConfigType
};

export default class AnimatedParticle extends React.Component<
  IAnimatedParticle,
  IAnimatedParticleState
> {
  static defaultProps = {};

  constructor(props: IAnimatedParticle) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      opacityValue: new Animated.Value(1),
      ...this._createInterpolations(props.path, props.scale, props.rotation)
    };
  }

  render() {
    const { children } = this.props;
    const {
      animatedValue,
      translateX,
      translateY,
      opacityValue,
      scale,
      rotation,
      style
    } = this.state;

    console.log('AnimatedParticle Render', this.props, this.state);

    const animatedStyle = {
      opacity: opacityValue,
      transform: [
        {
          translateX: animatedValue.interpolate(translateX)
        },
        {
          translateY: animatedValue.interpolate(translateY)
        },
        {
          scale: animatedValue.interpolate(scale)
        },
        {
          rotate: animatedValue.interpolate(rotation)
        }
      ]
    };

    return (
      <Animated.View style={[styles.particle, animatedStyle, style]}>
        {children}
      </Animated.View>
    );
  }

  componentDidMount() {
    const { autoStart } = this.props;
    autoStart && this.start();
  }

  start = () => {
    const { path, onLifeEnds, onAnimate } = this.props;
    const { animatedValue, opacityValue } = this.state;

    this.animation =
      this.animation || onAnimate(path, animatedValue, opacityValue);

    this.animation.start(() => {
      onLifeEnds && onLifeEnds();
    });
  };

  _createInterpolations = (
    path: VectorType[],
    scale: number[],
    rotation: number[]
  ): InterpolationConfig => {
    const segments = path.length;

    const inputRange: number[] = new Array(segments);
    const outputRangeTranslateX: number[] = new Array(segments);
    const outputRangeTranslateY: number[] = new Array(segments);
    const outputRangeScale: number[] = new Array(segments);
    const outputRangeRotate: number[] = new Array(segments);

    for (let i = 0; i < path.length; i++) {
      inputRange[i] = i;
      outputRangeTranslateX[i] = path[i].x;
      outputRangeTranslateY[i] = path[i].y;
      outputRangeScale[i] = scale[i];
      outputRangeRotate[i] = rotation[i];
    }

    return {
      translateX: {
        inputRange,
        outputRange: outputRangeTranslateX
      },
      translateY: {
        inputRange,
        outputRange: outputRangeTranslateY
      },
      scale: {
        inputRange,
        outputRange: outputRangeScale
      },
      rotation: {
        inputRange,
        outputRange: outputRangeRotate
      }
    };
  };
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});
