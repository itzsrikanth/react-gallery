import React from 'react';
import styles from './ContentLoader.module.scss';

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
  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <div className={styles.ipga}></div>
    </div>
  )
}

export default ContentLoader;
