import { BaseComponent } from '../core/base-component.js';

export class Dropdown extends BaseComponent {
  constructor(el){
    super(el);
    this._menu = document.getElementById(el.getAttribute('aria-controls')) ||
                 el.parentElement.querySelector('.el-dropdown-menu');
    this._outsideHandler = this._handleOutside.bind(this);
    this._store();
  }
  _handleOutside(e){
    if(!this._el.contains(e.target) && !this._menu?.contains(e.target)){
      this.hide();
    }
  }
  show(){
    if(!this._menu) return;
    this._menu.classList.add('show');
    document.addEventListener('mousedown', this._outsideHandler);
  }
  hide(){
    if(!this._menu) return;
    this._menu.classList.remove('show');
    document.removeEventListener('mousedown', this._outsideHandler);
  }
  toggle(){
    if(this._menu?.classList.contains('show')) this.hide(); else this.show();
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const t = e.target.closest('[data-el-toggle="dropdown"]');
      if(!t) return;
      Dropdown.getOrCreateInstance(t).toggle();
    });
  }
}