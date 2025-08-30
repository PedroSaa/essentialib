import { BaseComponent } from '../core/base-component.js';

export class Button extends BaseComponent {
  constructor(el){
    super(el);
    this._loading = false;
    this._store();
  }
  setLoading(state=true, text=''){
    this._loading = state;
    if(state){
      this._origHTML = this._el.innerHTML;
      this._el.disabled = true;
      if(text) this._el.textContent = text;
      this._el.classList.add('is-loading');
    } else {
      this._el.disabled = false;
      this._el.classList.remove('is-loading');
      if(this._origHTML) this._el.innerHTML = this._origHTML;
    }
  }
  toggle(){
    this._el.classList.toggle('is-active');
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const btn = e.target.closest('[data-el-toggle="button"]');
      if(!btn) return;
      Button.getOrCreateInstance(btn).toggle();
    });
  }
}