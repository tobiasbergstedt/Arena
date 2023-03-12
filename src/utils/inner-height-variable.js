/* eslint-disable no-plusplus */
if (window.CSS && window.CSS.supports('color', 'var(--supports-css-vars)')) {
  const element = document.createElement('style');
  document.head.appendChild(element);
  if (element.sheet && window.requestAnimationFrame) {
    const { sheet } = element;

    let currentLoopIndex = 0;
    const startLoop = function startLoop(callback, time = 0) {
      const index = ++currentLoopIndex;
      const timeout = Date.now() + time;

      const loop = function loop() {
        if (currentLoopIndex !== index) {
          return;
        }

        if (time !== 0 && Date.now() > timeout) {
          currentLoopIndex++;
          return;
        }

        callback();

        window.requestAnimationFrame(loop);
      };
      loop();
    };

    let currentInnerHeight = null;
    const updateInnerHeight = function updateInnerHeight() {
      startLoop(() => {
        if (
          currentInnerHeight === null ||
          currentInnerHeight !== window.innerHeight
        ) {
          currentInnerHeight = window.innerHeight;
          const index = sheet.insertRule(
            `:root { --inner-height: ${currentInnerHeight}px; }`,
            sheet.cssRules.length
          );
          if (index > 0) {
            sheet.deleteRule(index - 1);
          }
        }
      }, 300);
    };
    updateInnerHeight();

    let hasPassiveEvents = false;
    try {
      const options = Object.defineProperty({}, 'passive', {
        get: () => {
          hasPassiveEvents = true;
          return undefined;
        },
      });
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch (error) {
      hasPassiveEvents = false;
    }

    window.addEventListener(
      'resize',
      updateInnerHeight,
      hasPassiveEvents ? { passive: false } : false
    );
    window.addEventListener(
      'orientationchange',
      updateInnerHeight,
      hasPassiveEvents ? { passive: false } : false
    );
    document.addEventListener(
      'touchmove',
      updateInnerHeight,
      hasPassiveEvents ? { passive: false } : false
    );
  } else {
    document.head.removeChild(element);
  }
}
