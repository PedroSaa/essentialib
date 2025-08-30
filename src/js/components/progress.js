import { BaseComponent } from '../core/base-component.js';
import { clamp } from '../core/util.js';

export class Progress extends BaseComponent {
  constructor(el){
    super(el);
    this._bar = el.querySelector('.el-progress-bar');
    this._store();
  }
  set(value, max=100){
    const v = clamp(value,0,max);
    if(this._bar){
      this._bar.style.width = (v/max*100)+'%';
      this._bar.setAttribute('aria-valuenow', v);
    }
  }
}