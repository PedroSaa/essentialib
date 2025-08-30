import { BaseComponent } from '../core/base-component.js';
import { triggerEvent } from '../core/event.js';

export class Carousel extends BaseComponent {
  constructor(el){
    super(el);
    this._items = Array.from(el.querySelectorAll('.el-carousel-item'));
    this._index = Math.max(0, this._items.findIndex(i=> i.classList.contains('active')));
    if(this._index < 0) this._index = 0;
    this._interval = null;
    this._delay = parseInt(el.getAttribute('data-el-interval') || '5000',10);
    this._pauseOnHover = el.getAttribute('data-el-pause') !== 'false';
    this._wrap = el.getAttribute('data-el-wrap') !== 'false';
    this._store();
    this._setupHover();
    this._cycle();
  }

  _setupHover(){
    if(!this._pauseOnHover) return;
    this._el.addEventListener('mouseenter', ()=> this.pause());
    this._el.addEventListener('mouseleave', ()=> this.cycle());
  }

  _cycle(){
    if(this._delay > 0){
      this._interval = setInterval(()=> this.next(), this._delay);
    }
  }

  pause(){
    clearInterval(this._interval);
    this._interval = null;
  }

  cycle(){
    this.pause();
    this._cycle();
  }

  to(index){
    if(index === this._index || index < 0 || index >= this._items.length) return;
    triggerEvent(this._el,'slide.el.carousel',{from:this._index, to:index});
    this._items[this._index].classList.remove('active');
    this._items[index].classList.add('active');
    this._index = index;
    triggerEvent(this._el,'slid.el.carousel',{current:this._index});
  }

  next(){
    const nextIdx = this._index + 1;
    if(nextIdx >= this._items.length){
      if(this._wrap) this.to(0);
    } else {
      this.to(nextIdx);
    }
  }

  prev(){
    const prevIdx = this._index - 1;
    if(prevIdx < 0){
      if(this._wrap) this.to(this._items.length - 1);
    } else {
      this.to(prevIdx);
    }
  }

  static initDelegation(){
    document.addEventListener('click', e=>{
      const control = e.target.closest('[data-el-slide]');
      if(!control) return;
      const carouselSel = control.getAttribute('data-el-target') || control.getAttribute('href');
      if(!carouselSel) return;
      const carEl = document.querySelector(carouselSel);
      if(!carEl) return;
      const inst = Carousel.getOrCreateInstance(carEl);
      const dir = control.getAttribute('data-el-slide');
      if(dir === 'next') inst.next();
      else if(dir === 'prev') inst.prev();
    });

    document.addEventListener('click', e=>{
      const indicator = e.target.closest('[data-el-slide-to]');
      if(!indicator) return;
      const target = indicator.getAttribute('data-el-target');
      const idx = parseInt(indicator.getAttribute('data-el-slide-to'),10);
      if(!target || isNaN(idx)) return;
      const carEl = document.querySelector(target);
      if(!carEl) return;
      Carousel.getOrCreateInstance(carEl).to(idx);
    });
  }
}