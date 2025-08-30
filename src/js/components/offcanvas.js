import { BaseComponent } from '../core/base-component.js';
import { triggerEvent } from '../core/event.js';

export class Offcanvas extends BaseComponent {
  constructor(el){
    super(el);
    this._backdrop = null;
    this._esc = e => {
      if(e.key === 'Escape' && this._el.getAttribute('data-backdrop') !== 'static'){
        this.hide();
      }
    };
    this._store();
  }

  _createBackdrop(){
    if(this._backdrop) return;
    const div = document.createElement('div');
    div.className = 'el-offcanvas-backdrop';
    document.body.appendChild(div);
    this._backdrop = div;
    requestAnimationFrame(()=> div.classList.add('show'));
    div.addEventListener('click', () => {
      if(this._el.getAttribute('data-backdrop') !== 'static') this.hide();
    });
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
    triggerEvent(this._el,'show.el.offcanvas',{});
    this._createBackdrop();
    this._el.classList.add('show');
    document.body.classList.add('el-offcanvas-open');
    document.addEventListener('keydown', this._esc);
    triggerEvent(this._el,'shown.el.offcanvas',{});
  }

  hide(){
    if(!this._el.classList.contains('show')) return;
    triggerEvent(this._el,'hide.el.offcanvas',{});
    this._el.classList.remove('show');
    document.body.classList.remove('el-offcanvas-open');
    document.removeEventListener('keydown', this._esc);
    this._removeBackdrop();
    triggerEvent(this._el,'hidden.el.offcanvas',{});
  }

  toggle(){
    if(this._el.classList.contains('show')) this.hide(); else this.show();
  }

  static initDelegation(){
    document.addEventListener('click', e=>{
      const openBtn = e.target.closest('[data-el-toggle="offcanvas"]');
      if(openBtn){
        const sel = openBtn.getAttribute('data-el-target') || openBtn.getAttribute('href');
        if(sel){
          const el = document.querySelector(sel);
            if(el) Offcanvas.getOrCreateInstance(el).show();
        }
      }
      const dismiss = e.target.closest('[data-el-dismiss="offcanvas"]');
      if(dismiss){
        const oc = dismiss.closest('.el-offcanvas');
        if(oc) Offcanvas.getOrCreateInstance(oc).hide();
      }
    });
  }
}