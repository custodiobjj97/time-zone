import Slide from "./slide.js";

export default class SlideNav extends Slide{
    constructor(slide,wrapper){
        super(slide,wrapper);
        this.bindEventControl()
    }

    addArrow(prev,next){
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.arrowEvent()
    }

    arrowEvent(){
        this.prev.addEventListener('click',this.activeSlidePrev);
        this.next.addEventListener('click',this.activeSlideNext);
    }

    eventControl(item,index){
        item.addEventListener('click', (event)=>{
            event.preventDefault();
            this.changeSlide(index)
        })
        this.wrapper.addEventListener('changeEvent', this.activeClassControl)
    }

    activeClassControl(){
        this.controlArray.forEach((item) => {item.classList.remove(this.activeClass)});
        this.controlArray[this.index.active].classList.add(this.activeClass);
    };

    addControl(customControl){
        this.control=document.querySelector(customControl);
        this.controlArray= [...this.control.children];

        this.activeClassControl();

        this.controlArray.forEach(this.eventControl)
    }

    bindEventControl(){
        this.activeClassControl = this.activeClassControl.bind(this);
        this.eventControl = this.eventControl.bind(this)
    }
}