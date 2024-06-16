export default function outsideClick(elements,callback){
    const html = document.documentElement;
    const events=['click','touchstart'];
    const outside='data-outside';

    if(!elements.hasAttribute(outside)){
       setTimeout(()=>{events.forEach((userEvent)=>{html.addEventListener(userEvent,handleOutsideClick)})})
       elements.setAttribute(outside,'')
    }

    function handleOutsideClick(event){
        if(!elements.contains(event.target)){
            elements.removeAttribute(outside)
            events.forEach((userEvent)=>{html.removeEventListener(userEvent, handleOutsideClick)})
            callback();
        }
    }
}