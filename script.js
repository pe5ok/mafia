class Profile{
    constructor(el, ind){
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
        this.h1 = document.createElement("h1")
        this.h1.innerText="Player "+ind
        this.obverse.appendChild(this.h1)
        this.h1 = document.createElement("h1")
        this.h1.innerText="Player "+ind
        this.reverse.appendChild(this.h1)
        el.appendChild(this.obverse)
        el.appendChild(this.reverse)

        this.role = document.createElement("div")
        this.reverse.appendChild(this.role)

        this.vote = document.createElement("button")
        this.vote.addEventListener("click",(e)=>{
            e.stopPropagation()
            console.log("vote");
        })
        this.vote.innerText = "vote"
        this.obverse.appendChild(this.vote);

        this.kill = document.createElement("button")
        this.kill.addEventListener("click",(e)=>{
            e.stopPropagation()
            console.log("kill");
        })
        this.kill.innerText = "kill"
        this.obverse.appendChild(this.kill);
    }
}
profiles = Array.from(document.getElementsByClassName("profile"))
for(ind in profiles){
    console.log(profiles[ind])
    new Profile(profiles[ind], 1+Number(ind))
}