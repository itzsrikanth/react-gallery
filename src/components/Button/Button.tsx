import React, { ReactNode } from 'react';
import styles from  './Button.module.scss';

export type ButtonProps = {
  variant: 'primary' | 'secondary' | 'success' | 'danger';
  children: ReactNode;
}

function Button(props: ButtonProps) {
  const {variant = 'primary', children, ...rest} = props;
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  )
}

export default Button;
