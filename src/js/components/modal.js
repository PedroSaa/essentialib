import { BaseComponent } from '../core/base-component.js';
import { triggerEvent } from '../core/event.js';

export class Modal extends BaseComponent {
  constructor(el){
    super(el);
    this._backdrop = null;
    this._escHandler = e=>{
      if(e.key === 'Escape') this.hide();
    };
    this._store();
  }
  _createBackdrop(){
    if(this._backdrop) return;
    const div = document.createElement('div');
    div.className = 'el-modal-backdrop';
    document.body.appendChild(div);
    this._backdrop = div;
    requestAnimationFrame(()=> div.classList.add('show'));
  }
  _removeBackdrop(){
    if(!this._backdrop) return;
    const bd = this._backdrop;
    bd.classList.remove('show');
    setTimeout(()=> bd.remove(), 150);
    this._backdrop = null;
  }
  show(){
    if(this._el.classList.contains('show')) return;
    triggerEvent(this._el,'show.el.modal',{});
    this._createBackdrop();
    this._el.classList.add('show');
    this._el.removeAttribute('aria-hidden');
    document.body.classList.add('el-modal-open');
    document.addEventListener('keydown', this._escHandler);
    triggerEvent(this._el,'shown.el.modal',{});
  }
  hide(){
    if(!this._el.classList.contains('show')) return;
    triggerEvent(this._el,'hide.el.modal',{});
    this._el.classList.remove('show');
    this._el.setAttribute('aria-hidden','true');
    document.body.classList.remove('el-modal-open');
    document.removeEventListener('keydown', this._escHandler);
    this._removeBackdrop();
    triggerEvent(this._el,'hidden.el.modal',{});
  }
  toggle(){
    if(this._el.classList.contains('show')) this.hide(); else this.show();
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const openBtn = e.target.closest('[data-el-toggle="modal"]');
      if(openBtn){
        const sel = openBtn.getAttribute('data-el-target') || openBtn.getAttribute('href');
        if(sel){
          const el = document.querySelector(sel);
          if(el) Modal.getOrCreateInstance(el).show();
        }
      }
      const closeBtn = e.target.closest('[data-el-dismiss="modal"]');
      if(closeBtn){
        const m = closeBtn.closest('.el-modal');
        if(m) Modal.getOrCreateInstance(m).hide();
      }
      const backdropClickModal = e.target.classList?.contains('el-modal') ? e.target : null;
      if(backdropClickModal && backdropClickModal.getAttribute('data-backdrop') !== 'static'){
        Modal.getOrCreateInstance(backdropClickModal).hide();
      }
    });
  }
}