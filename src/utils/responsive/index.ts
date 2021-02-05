import throttle from 'lodash.throttle';
import './style.scss';

export interface Config {
  /**
   * 1 -> mobile
   * 2 -> tablet
   * 4 -> desktop
   *  */ 
  breakpoint: number;
  /**
   * 1 -> greater than mobile
   * 2 -> greater than tablet
   */
  gtBreakpoint: number;
  /**
   * 1 -> less than tablet
   */
  ltBreakpoint: number;
  /**
   * 1 -> not-mobile
   * 2 -> not-tablet
   * 4 -> not-desktop
   *  */ 
  negateBreakpoint: number;
  timeout?: number;
}

const computedStyle = getComputedStyle(document.documentElement);
const bp = {
  tablet: parseInt(
    computedStyle.getPropertyValue('--breakpoint-md'), 10
  ),
  desktop: parseInt(
    computedStyle.getPropertyValue('--breakpoint-lg'), 10
  )
};
const mobile = new Event('mobileBreakpoint');
const tablet = new Event('tabletBreakpoint');
const desktop = new Event('desktopBreakpoint');
const gtMobile = new Event('gtMobileBreakpoint');
const gtTablet = new Event('gtTabletBreakpoint');
const ltTablet = new Event('ltTabletBreakpoint');
const notMobile = new Event('notMobileBreakpoint');
const notTablet = new Event('notTabletBreakpoint');
const notDesktop = new Event('notDesktopBreakpoint');

let config: Config = {
  breakpoint: 7,
  gtBreakpoint: 0,
  negateBreakpoint: 0,
  ltBreakpoint: 0,
  timeout: 100
};

export const init = (userConfig: Config): void => {
  config = {...config, ...userConfig};
  window.addEventListener('resize', throttle(deviceType, 100));
}

export const deviceType = (): void => {
  const currWidth = window.innerWidth;
  if (currWidth < bp.tablet) {

    (config.breakpoint & 1) && window.dispatchEvent(mobile);
    (config.negateBreakpoint & 2) && window.dispatchEvent(notTablet);
    (config.negateBreakpoint & 4) && window.dispatchEvent(notDesktop);

  } else if (currWidth < bp.desktop) {

    (config.negateBreakpoint & 1) && window.dispatchEvent(notMobile);
    (config.gtBreakpoint & 1) && window.dispatchEvent(gtMobile);
    (config.ltBreakpoint & 1) && window.dispatchEvent(ltTablet);
    (config.breakpoint & 2) && window.dispatchEvent(tablet);
    (config.negateBreakpoint & 4) && window.dispatchEvent(notDesktop);

  } else {

    (config.negateBreakpoint & 1) && window.dispatchEvent(notMobile);
    (config.gtBreakpoint & 1) && window.dispatchEvent(gtMobile);
    (config.negateBreakpoint & 2) && window.dispatchEvent(notTablet);
    (config.gtBreakpoint & 2) && window.dispatchEvent(gtTablet);
    (config.breakpoint & 4) && window.dispatchEvent(desktop);

  }
}
