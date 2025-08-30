import { BaseComponent } from '../core/base-component.js';

export class Toast extends BaseComponent {
  constructor(el){
    super(el);
    this._timeout = null;
    this._delay = parseInt(el.getAttribute('data-el-delay') || '3000',10);
    this._store();
  }
  show(){
    this._el.classList.add('show');
    clearTimeout(this._timeout);
    this._timeout = setTimeout(()=> this.hide(), this._delay);
  }
  hide(){
    this._el.classList.remove('show');
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const t = e.target.closest('[data-el-toggle="toast"]');
      if(!t) return;
      const sel = t.getAttribute('data-el-target');
      if(!sel) return;
      const toastEl = document.querySelector(sel);
      if(!toastEl) return;
      Toast.getOrCreateInstance(toastEl).show();
    });
  }
}