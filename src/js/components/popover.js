import { BaseComponent } from '../core/base-component.js';

export class Popover extends BaseComponent {
  constructor(el){
    super(el);
    this._content = el.getAttribute('data-el-content') || '';
    this._title = el.getAttribute('data-el-title') || '';
    this._panel = null;
    this._outside = this._onDoc.bind(this);
    this._store();
  }
  _onDoc(e){
    if(this._panel && !this._panel.contains(e.target) && !this._el.contains(e.target)){
      this.hide();
    }
  }
  show(){
    if(this._panel) return;
    const div = document.createElement('div');
    div.className = 'el-popover';
    div.innerHTML = (this._title ? `<div class="el-popover-header">${this._title}</div>`:'')
      + `<div class="el-popover-body">${this._content}</div>`;
    document.body.appendChild(div);
    this._panel = div;
    const r = this._el.getBoundingClientRect();
    div.style.position='absolute';
    div.style.top = (window.scrollY + r.bottom + 6)+'px';
    div.style.left = (window.scrollX + r.left + r.width/2)+'px';
    div.style.transform='translateX(-50%)';
    requestAnimationFrame(()=> div.classList.add('show'));
    document.addEventListener('mousedown', this._outside);
  }
  hide(){
    if(!this._panel) return;
    const p = this._panel;
    p.classList.remove('show');
    setTimeout(()=> p.remove(), 120);
    this._panel = null;
    document.removeEventListener('mousedown', this._outside);
  }
  toggle(){
    if(this._panel) this.hide(); else this.show();
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const t = e.target.closest('[data-el-toggle="popover"]');
      if(!t) return;
      Popover.getOrCreateInstance(t).toggle();
    });
  }
}