import React, { useEffect, useState } from 'react';
import { findKeyframe } from 'utils/keyframes';
import styles from './ContentLoader.module.scss';

const TOTAL_DURATION = 2000;
const RATIO = .3;
const DURATION = TOTAL_DURATION * RATIO;
const DELAY = TOTAL_DURATION - DURATION;
const RULE_QUERY = RATIO * 100 + '%';

export type ContentLoaderProps = {
  width: number;
  height: number;
  primaryColor?: string;
  secondaryColor?: string;
  background?: string;
  delay?: number;
  duration?: number;
};

const ContentLoader = (props: ContentLoaderProps) => {
  const wrapperStyle = {
    width: props.width,
    height: props.height,
    '--color-gradient-primary': props.primaryColor || 'rgba(255, 255, 255, 0.5)',
    '--color-gradient-secondary': props.secondaryColor || 'rgba(0, 0, 0, 0)',
    backgroundColor: props.background || 'grey'
  } as React.CSSProperties;

  const animParams = {
    totalDuration: TOTAL_DURATION,
    percent: RULE_QUERY
  };

  const mainStyle = {
    animationDuration: (animParams.totalDuration / 1000).toFixed(2) + 's'
  } as React.CSSProperties;

  useEffect(() => {
    if (props.duration || props.delay) {
      const kf: CSSKeyframesRule | null = findKeyframe(styles['waves']);
      if (kf) {
        animParams.totalDuration = (props.delay || DELAY) + (props.duration || DURATION);
        const newRule = kf.findRule(animParams.percent)?.cssText;
        console.log(animParams.totalDuration, newRule);
        const newPercent = ((props.duration || DURATION) * 100 / animParams.totalDuration).toFixed(2) + '%';
        if (newRule) {
          const tmp = newRule?.replace(/\d+%(?:\.\d+)?/, newPercent);
          console.log(tmp, animParams.percent);
          kf.appendRule(tmp);
          kf.deleteRule(animParams.percent);
          animParams.percent = newPercent;
        }
      }
    }
  });

  return (
    <div style={wrapperStyle}>
      <div className={styles.ipga} style={mainStyle}></div>
    </div>
  )
}

export default ContentLoader;
