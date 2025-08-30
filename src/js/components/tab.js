import { BaseComponent } from '../core/base-component.js';
import { triggerEvent } from '../core/event.js';

export class Tab extends BaseComponent {
  constructor(el){
    super(el);
    this._store();
  }

  show(){
    if(this._el.classList.contains('active')) return;
    const list = this._el.closest('[data-el-role="tablist"]');
    if(!list) return;
    const tabs = Array.from(list.querySelectorAll('[data-el-toggle="tab"]'));
    const active = tabs.find(t=> t.classList.contains('active'));
    const targetSel = this._el.getAttribute('data-el-target') || this._el.getAttribute('href');
    if(!targetSel) return;
    const pane = document.querySelector(targetSel);
    if(!pane) return;

    let oldPane = null;
    if(active){
      const oldSel = active.getAttribute('data-el-target') || active.getAttribute('href');
      if(oldSel) oldPane = document.querySelector(oldSel);
    }

    triggerEvent(this._el,'show.el.tab',{relatedTarget: active});
    if(active){
      active.classList.remove('active');
      active.setAttribute('aria-selected','false');
    }
    this._el.classList.add('active');
    this._el.setAttribute('aria-selected','true');

    if(oldPane) oldPane.classList.remove('active','show');
    pane.classList.add('active','show');
    triggerEvent(this._el,'shown.el.tab',{relatedTarget: active});
  }

  static initDelegation(){
    document.addEventListener('click', e=>{
      const trigger = e.target.closest('[data-el-toggle="tab"]');
      if(!trigger) return;
      e.preventDefault();
      Tab.getOrCreateInstance(trigger).show();
    });
  }
}