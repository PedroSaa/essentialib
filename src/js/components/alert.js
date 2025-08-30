import { BaseComponent } from '../core/base-component.js';
import { triggerEvent } from '../core/event.js';

export class Alert extends BaseComponent {
  constructor(el){
    super(el);
    this._store();
  }
  close(){
    triggerEvent(this._el,'close.el.alert',{ element:this._el });
    this._el.remove();
    triggerEvent(document,'closed.el.alert',{ element:this._el });
  }
  static initDelegation(){
    document.addEventListener('click', e=>{
      const btn = e.target.closest('[data-el-dismiss="alert"]');
      if(!btn) return;
      const root = btn.closest('.el-alert');
      if(root) Alert.getOrCreateInstance(root).close();
    });
  }
}