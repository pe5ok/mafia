class Timer{
    basecounter = 600;
    setCounter(x){
        this.counter = x
        this.display.innerText = (x/10|0)+"."+x%10+"s"
    }
    getCounter(){
        return this.counter
    }
    subtractCounter(){
        this.setCounter(this.getCounter()-1)
    }
    constructor(el){
        this.timer = null;
        this.start_stop = document.createElement("button")
        this.start_stop.classList.add("panel_button")
        this.start_stop.innerText="start"
        el.appendChild(this.start_stop)
        this.reset = document.createElement("button")
        this.reset.classList.add("panel_button")
        this.reset.innerText="reset"
        el.appendChild(this.reset)
        this.display = document.createElement("div")
        el.appendChild(this.display)
        this.setCounter(this.basecounter);
        this.start_stop.addEventListener("click",()=>this.timer_start(),{once:true})
        this.reset.addEventListener("click",()=>this.timer_reset())
    }
    timer_start(){
        if(this.getCounter()===0 || !(this.timer === null))this.timer_reset()
        this.timer = setInterval((context)=>{
            this.subtractCounter();
            if(context.getCounter()===0)context.timer_stop();
        },100,this)
        this.start_stop.addEventListener("click",()=>this.timer_stop(),{once:true})
        this.start_stop.innerText="stop"
    }
    timer_stop(){
        clearInterval(this.timer)
        this.timer=null
        this.start_stop.addEventListener("click",()=>this.timer_start(),{once:true})
        this.start_stop.innerText="start"
    }
    timer_reset(){
        if(!(this.timer === null)){
            this.start_stop.dispatchEvent(new Event("click"))
        }
        this.setCounter(this.basecounter);
    }
}