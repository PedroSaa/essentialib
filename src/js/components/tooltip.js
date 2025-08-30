import { BaseComponent } from '../core/base-component.js';

export class Tooltip extends BaseComponent {
  constructor(el){
    super(el);
    this._title = el.getAttribute('data-el-title') || el.getAttribute('title');
    this._tip = null;
    this._store();
    el.removeAttribute('title');
  }
  _create(){
    if(this._tip) return;
    const div = document.createElement('div');
    div.className = 'el-tooltip';
    div.textContent = this._title || '';
    document.body.appendChild(div);
    this._tip = div;
    const rect = this._el.getBoundingClientRect();
    div.style.position='absolute';
    div.style.top = (window.scrollY + rect.top - div.offsetHeight - 6)+'px';
    div.style.left = (window.scrollX + rect.left + rect.width/2)+'px';
    div.style.transform='translateX(-50%)';
    requestAnimationFrame(()=> div.classList.add('show'));
  }
  show(){ this._create(); }
  hide(){
    if(!this._tip) return;
    const t = this._tip;
    t.classList.remove('show');
    setTimeout(()=> t.remove(), 120);
    this._tip = null;
  }
  static initDelegation(){
    document.addEventListener('mouseenter', e=>{
      const t = e.target.closest('[data-el-toggle="tooltip"]');
      if(!t) return;
      Tooltip.getOrCreateInstance(t).show();
    }, true);
    document.addEventListener('mouseleave', e=>{
      const t = e.target.closest('[data-el-toggle="tooltip"]');
      if(!t) return;
      const inst = Tooltip.getInstance(t);
      inst && inst.hide();
    }, true);
    document.addEventListener('focusin', e=>{
      const t = e.target.closest('[data-el-toggle="tooltip"]');
      if(t) Tooltip.getOrCreateInstance(t).show();
    });
    document.addEventListener('focusout', e=>{
      const t = e.target.closest('[data-el-toggle="tooltip"]');
      if(t){
        const inst = Tooltip.getInstance(t);
        inst && inst.hide();
      }
    });
  }
}