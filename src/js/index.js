// Núcleo
export { BaseComponent } from './core/base-component.js';
export { triggerEvent } from './core/event.js';
export { clamp } from './core/util.js';

// Componentes
export { Alert } from './components/alert.js';
export { Button } from './components/button.js';
export { Collapse } from './components/collapse.js';
export { Dropdown } from './components/dropdown.js';
export { Modal } from './components/modal.js';
export { Tooltip } from './components/tooltip.js';
export { Popover } from './components/popover.js';
export { Toast } from './components/toast.js';
export { Progress } from './components/progress.js';
export { Offcanvas } from './components/offcanvas.js';
export { Carousel } from './components/carousel.js';
export { Tab } from './components/tab.js';
export { ScrollSpy } from './components/scrollspy.js';
export { Swallite } from './components/swallite.js';
export { AdvancedSelect } from './components/select.js';

// Inicialización (solo para los que usan delegación / auto-init conocidos)
function initDelegations(){
  // Comprobaciones defensivas en caso de que algún componente no exista
  typeof Collapse !== 'undefined' && Collapse.initDelegation?.();
  typeof Dropdown !== 'undefined' && Dropdown.initDelegation?.();
  typeof Modal !== 'undefined' && Modal.initDelegation?.();
  typeof Tooltip !== 'undefined' && Tooltip.initDelegation?.();
  typeof Popover !== 'undefined' && Popover.initDelegation?.();
  typeof Toast !== 'undefined' && Toast.initDelegation?.();
  typeof Offcanvas !== 'undefined' && Offcanvas.initDelegation?.();
  typeof Carousel !== 'undefined' && Carousel.initDelegation?.();
  typeof Tab !== 'undefined' && Tab.initDelegation?.();
  typeof ScrollSpy !== 'undefined' && ScrollSpy.initDelegation?.();
  typeof AdvancedSelect !== 'undefined' && AdvancedSelect.initAuto?.();
}

// Auto init opcional
if(document?.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initDelegations);
} else {
  initDelegations();
}

export { initDelegations };