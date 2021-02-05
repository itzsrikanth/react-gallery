import React, { useState } from 'react';
import cx from 'classnames';
import styles from './VerticalGallery.module.scss';

import {init, deviceType} from '../../utils/responsive';

export interface VerticalGalleryProps {
  classNames: Array<string>;
  popFromBehind: string;
  caption: string;
  fg: Array<string>;
}

const VerticalGallery = ({
  classNames,
  fg
}: VerticalGalleryProps): React.ReactNode => {

  const segment = 100 / (fg.length - 1);
  const innerChildren: Array<React.ReactElement> = [];
  const pos: Array<string> = [];
  let i: number;

  for (i = 0; i < fg.length; i++) {
    pos.push((segment * i).toFixed(3) + '%');
  }

  const [position, setPosition] = useState(pos);
  const [mobile, setMobile] = useState(false);
  init({
    breakpoint: 0,
    gtBreakpoint: 2,
    ltBreakpoint: 1,
    negateBreakpoint: 0
  });

  for (i = 0; i < fg.length; i++) {
    const mouseEnterHandler = (function (this: number, prev: Array<string>) {
      const curr = [...prev];
      curr[this] = '50%';
      console.log(curr);
      return curr;
    }).bind(i);

    const mouseLeaveHandler = (function (this: number, prev: Array<string>) {
      const curr = [...prev];
      curr[this] = pos[this];
      console.log(curr);
      return curr;
    }).bind(i);

    innerChildren.push(
      <div key={i}
        style={{
          backgroundImage: 'url(/' + fg[i] + ')',
          backgroundPositionY: mobile ? position[i] : 'center',
          backgroundPositionX: mobile ? 'center' : position[i]
        }}
        onMouseEnter={() => {
          setPosition(mouseEnterHandler)
        }}
        onMouseLeave={() => {
          setPosition(mouseLeaveHandler)
        }}
        className={cx(styles['vg-img'])}>
      </div>
    );
  }

  window.addEventListener('ltTabletBreakpoint', () => {
    console.log('ltTabletBreakpoint');
    setMobile(true);
  });
  window.addEventListener('gtTabletBreakpoint', () => {
    console.log('gtTabletBreakpoint');
    setMobile(false);
  });

  return (
    <section className={cx(styles['vg'], 'd-flex flex-column flex-lg-row', ...classNames)}>
      {innerChildren}
    </section>
  )
};

export default VerticalGallery;
