import debounce from "./debounce.js";

export default class Slide{
    constructor(slide,wrapper){
        this.slide=document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.dist={finalPosition:0,startX:0,movement:0};
        this.activeClass="active";
        this.changeEvent = new Event('changeEvent');
    };

    transition(active){
        this.slide.style.transition = active ? "transform .4s" : ""
    };

    moveSlide(distX){
        this.dist.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px,0,0)`
    };

    udpateSlide(clientX){
        this.dist.movement = (this.dist.startX - clientX) * 1.6;
         return this.dist.finalPosition - this.dist.movement;
    };

    onStart(event){
        let movetype;
        if(event.type === "mousedown"){
            event.preventDefault();
            this.dist.startX = event.clientX;
            movetype = "mousemove";
        }else{
           this.dist.startX = event.changedTouches[0].clientX;
           movetype = "touchmove";
        }
        this.wrapper.addEventListener(movetype, this.onMove);
        this.transition(false);
    };

    onMove(event){
        const pointerPosition = (event.type === "mousemove") ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.udpateSlide(pointerPosition);
        this.moveSlide(finalPosition)
        
    };

    onEnd(event){
        const movetype = (event.type === "mouseup") ? "mousemove" : "touchmove";
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.dist.movePosition = this.dist.finalPosition;
        this.changeSlideOnEnd();
        this.transition(true)
    };

    changeSlideOnEnd(){
        if(this.dist.movement > 120 && this.index.next !== undefined){
            this.activeSlideNext()
        }else if(this.dist.movement < -120 && this.index.prev !== undefined){
            this.activeSlidePrev()
        }else{
            this.changeSlide(this.index.active)
        };
    };


    eventSlides(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    };


    // slide config

    updatePosition(slide){
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2
        return -(slide.offsetLeft - margin)
    };


    slidesConfig(){
        this.slideArray=[...this.slide.children].map((element)=>{
            const position = this.updatePosition(element);
            return {position, element};
        });
    };

    slidesIndexNav(index){
        const last = this.slideArray.length - 1;
        this.index={
            prev:index ? index - 1 : undefined,
            active:index,
            next: index === last ? undefined : index + 1,
        };
    };

    changeSlide(index){
        const slideActive = this.slideArray[index];
        this.moveSlide(slideActive.position);
        this.dist.movePosition = slideActive.position;
        this.slidesIndexNav(index);
        this.wrapper.dispatchEvent(this.changeEvent)
        this.changeSlideActiveClass();
    };

    changeSlideActiveClass(){
        this.slideArray.forEach((item)=>{item.element.classList.remove(this.activeClass)});
        this.slideArray[this.index.active].element.classList.add(this.activeClass);
    };

    activeSlidePrev(){
        if(this.index.prev !== undefined) this.changeSlide(this.index.prev)
    };

    activeSlideNext(){
        if(this.index.next !== undefined) this.changeSlide(this.index.next)
    };

     onResize(){
        setTimeout(()=>{
            this.changeSlide(this.index.active);
            this.slidesConfig();
        },1000);
     };

     eventResize(){
        window.addEventListener('resize',this.onResize);
     };

     bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);

        this.activeSlidePrev = this.activeSlidePrev.bind(this);
        this.activeSlideNext = this.activeSlideNext.bind(this);

        this.onResize =  debounce(this.onResize.bind(this),200);
     };


     init(){
        if(this.slide){
           this.bindEvents();
           this.transition(true);
           this.eventSlides();
           this.slidesConfig();
           this.eventResize();
           this.changeSlide(0) 
        }
        return this
     }
};