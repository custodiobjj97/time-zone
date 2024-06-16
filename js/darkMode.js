export default class DarkMode{
    constructor(input,icon){
        this.input=document.querySelector(input);
        this.body = document.querySelector('body')
        this.icon=document.getElementById(icon);
        this.input.checked=JSON.parse(localStorage.getItem('mode'));
    }

    updateBody(){
        if(this.input.checked){
            this.body.style.backgroundColor = "var(--color-secundary)";
            this.body.style.color = "#fff"
            this.icon.classList.add('fa-moon')
        }else{
            this.body.style.backgroundColor = "whitesmoke";
            this.body.style.color = "#000"
            this.icon.classList.replace('fa-moon','fa-sun')
        }
        this.udpateLocalStorage()
    }

    eventInput(){
        this.input.addEventListener('input',this.updateBody);
    }

    bindEvent(){
        this.updateBody = this.updateBody.bind(this);
    }

    udpateLocalStorage(){
        localStorage.setItem('mode',JSON.stringify(this.input.checked))
    }

    start(){
        if(this.input){
            this.bindEvent();
            this.updateBody()
            this.eventInput();
        }
    }
}