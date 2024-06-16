export default class LinkSmooth{
    constructor(links){
        this.links = document.querySelectorAll(links);
    };

    handleSmooth(event){
        event.preventDefault();
        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href);
        section.scrollIntoView({ behavior: "smooth", block: "start"})
    };


    eventSmooth(){
        this.links.forEach((item) =>{item.addEventListener('click', this.handleSmooth)});
    }

    bindEvent(){
        this.handleSmooth = this.handleSmooth.bind(this)
    }

    init(){
        if(this.links.length){
            this.bindEvent();
            this.eventSmooth();
        }
    }
}