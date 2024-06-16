import outsideClick from "./outsideClick.js";

export default class menuMobile{
    constructor(toggle,menu){
        this.toggle=document.querySelector(toggle);
        this.menu = document.querySelector(menu);
        this.activeClass="open";
        this.events=['click','touchstart']
    };

    activeMenuMobile(event){
       if(event.type === "touchstart"){
        event.preventDefault();
       };

       this.menu.classList.add(this.activeClass)
       outsideClick(this.menu,()=>{
        this.menu.classList.remove(this.activeClass)
       })
    };


    eventMenu(){
        this.events.forEach((eventUser)=>{this.toggle.addEventListener(eventUser,this.activeMenuMobile)});
    };

    bindEvent(){
        this.activeMenuMobile = this.activeMenuMobile.bind(this);
    }


    start(){
        if(this.menu){
            this.bindEvent();
            this.eventMenu();
        }
    }
}