class Profile{
    constructor(el, ind, rl){
        this.obverse = document.createElement("div")
        this.obverse.className="obverse"
        this.reverse = document.createElement("div")
        this.reverse.className="reverse"
        this.obverse.addEventListener("click",()=>{
            this.obverse.style.display = "none"
            this.reverse.style.display = "block"    
        })
        this.reverse.addEventListener("click",()=>{
            this.reverse.style.display = "none"
            this.obverse.style.display = "block"    
        })
        this.obverse.style.display = "block"
        this.reverse.style.display = "none"
        this.h1 = document.createElement("div")
        this.h1.innerText="Player "+ind
        this.obverse.appendChild(this.h1)
        this.h1 = document.createElement("div")
        this.h1.innerText="Player "+ind
        this.reverse.appendChild(this.h1)
        el.appendChild(this.obverse)
        el.appendChild(this.reverse)

        this.role = document.createElement("div")
        this.role.innerText = rl
        this.reverse.appendChild(this.role)

        this.vote = document.createElement("button")
        this.vote.addEventListener("click",(e)=>{
            e.stopPropagation()
            console.log("vote");
        })
        this.vote.classList.add("panel_button")
        this.vote.innerText = "vote"
        this.obverse.appendChild(this.vote);

        this.kill = document.createElement("button")
        this.kill.addEventListener("click",(e)=>{
            e.stopPropagation()
            console.log("kill");
        })
        this.kill.classList.add("panel_button")
        this.kill.innerText = "kill"
        this.obverse.appendChild(this.kill);
    }
    IsObverse(){
        return this.obverse.style.display=="block"
    }
    Flip(){
        if(this.IsObverse()){
            this.obverse.dispatchEvent(new Event("click"))
        }else{
            this.reverse.dispatchEvent(new Event("click"))
        }
    }
}
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

function restart(){
    Array.from(profile_table.children).forEach(e=>e.remove())
    profiles.splice(0, profiles.length)
    _a = new Array(0)
    players.forEach(key=>{
            for(i=0;i<key[1];++i){
                _a.push(key[0])
            }
        }
    )
    var rv=new Uint32Array(_a.length);
    crypto.getRandomValues(rv)
    for(i=_a.length-1;i>=0;--i){
        rv[i]%=i+1;
        [_a[i],_a[rv[i]]]=[_a[rv[i]],_a[i]];
    }
    for(i=0;i<_a.length;++i){
        profile = document.createElement("div")
        profile.classList.add("profile")
        profile_table.appendChild(profile)
        profiles.push(new Profile(profile, i+1, _a[i]))
    }
}
function flip(){
    if(profiles.every(e=>e.IsObverse())){
        profiles.forEach(e=>e.Flip())
    }else{
        profiles.forEach(e=>{
            if(!e.IsObverse())e.Flip()
        })
    }
}