import { BaseComponent } from '../core/base-component.js';
import { triggerEvent } from '../core/event.js';

export class Collapse extends BaseComponent {
  constructor(el){
    super(el);
    this._isTransitioning = false;
    this._store();
  }
  show(){
    if(this._el.classList.contains('show') || this._isTransitioning) return;
    triggerEvent(this._el,'show.el.collapse',{});
    this._el.style.height = '0px';
    this._el.classList.add('collapsing');
    this._el.classList.remove('collapse');
    this._isTransitioning = true;
    const height = this._el.scrollHeight;
    requestAnimationFrame(()=>{
      this._el.style.height = height + 'px';
      setTimeout(()=> this._completeShow(), 200);
    });
  }
  _completeShow(){
    this._isTransitioning = false;
    this._el.classList.remove('collapsing');
    this._el.classList.add('collapse','show');
    this._el.style.height = '';
    triggerEvent(this._el,'shown.el.collapse',{});
  }
  hide(){
    if(!this._el.classList.contains('show') || this._isTransitioning) return;
    triggerEvent(this._el,'hide.el.collapse',{});
    const height = this._el.scrollHeight;
    this._el.style.height = height+'px';
    this._el.offsetHeight; // reflow
    this._el.classList.add('collapsing');
    this._el.classList.remove('collapse','show');
    this._isTransitioning = true;
    requestAnimationFrame(()=>{
      this._el.style.height = '0px';
      setTimeout(()=> this._completeHide(), 200);
    });
  }
  _completeHide(){
    this._isTransitioning = false;
    this._el.classList.remove('collapsing');
    this._el.classList.add('collapse');
    this._el.style.height = '';
    triggerEvent(this._el,'hidden.el.collapse',{});
  }
  toggle(){
    if(this._el.classList.contains('show')) this.hide(); else this.show();
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const t = e.target.closest('[data-el-toggle="collapse"]');
      if(!t) return;
      const sel = t.getAttribute('data-el-target') || t.getAttribute('href');
      if(!sel) return;
      const el = document.querySelector(sel);
      if(!el) return;
      Collapse.getOrCreateInstance(el).toggle();
    });
  }
}