class Profile{
    constructor(el, ind, rl, elec){
        this.index=ind
        this.obverse=$("<div></div>")
                    .addClass("obverse")
                    .append($(`<h1>Player ${ind}</h1>`))[0]
        this.reverse=$("<div></div>")
                    .addClass("reverse")
                    .append($(`<h1>Player ${ind}</h1>`))
                    .append($(`<div>${rl}</div>`))
                    .hide()[0]
        this.obverse.addEventListener("click",()=>{
            $(this.obverse).hide()
            $(this.reverse).show()
        })
        this.reverse.addEventListener("click",()=>{
            $(this.reverse).hide()
            $(this.obverse).show()
        })
        this.vote=$("<button>vote</button>")[0]
        this.unvote=$("<button>unvote</button>").hide()[0]
        this.kill=$("<button>kill</button>")[0]
        this.revive=$("<button>revive</button>").hide()[0]
        this.vote.addEventListener("click",(e)=>{
            this.Vote()
            e.stopPropagation()
        })
        this.unvote.addEventListener("click",(e)=>{
            this.Unvote()
            e.stopPropagation()
        })
        this.kill.addEventListener("click",(e)=>{
            this.Kill()
            e.stopPropagation()
        })
        this.revive.addEventListener("click",(e)=>{
            this.Revive()
            e.stopPropagation()
        })
        $(this.obverse).append(this.vote, this.unvote, this.kill, this.revive)
        $(el)
            .append(this.obverse)
            .append(this.reverse)
    }    
    IsObverse(){
        return !(this.obverse.style.display=="none")
    }
    Flip(){
        if(this.IsObverse()){
            this.obverse.dispatchEvent(new Event("click"))
        }else{
            this.reverse.dispatchEvent(new Event("click"))
        }
    }
    Vote(){
        $(this.vote).hide()
        $(this.unvote).show()
        election.Add(this)
    }
    Unvote(){
        $(this.unvote).hide()
        $(this.vote).show()
        election.Remove(this)
    }
    Kill(){
        $(this.kill).hide()
        $(this.revive).show()
        this.Unvote()
        $(this.vote).hide()
    }
    Revive(){
        $(this.revive).hide()
        $(this.kill).show()
        $(this.vote).show()
    }
}
class Election{
    list = new Array()
    constructor(el){
        this.element=el
        $(el).append($(`<div>Accused players:</div>`)).append($(`<button>clear</button>`).addClass("panel_button"))
        $(el)[0].children[1].addEventListener("click", (e)=>{this.Clear()})
    }
    Update(){
        this.element.children[0].innerHTML=`Accused players: ${this.list.map(x=>x.index).join(',')}`
    }
    Add(e){
        this.list.push(e)
        this.Update()
    }
    Remove(e){
        i=this.list.indexOf(e)
        if(i==-1)return
        this.list.splice(i,1)
        this.Update()
    }
    Clear(){
        while(this.list.length>0)this.list[this.list.length-1].Unvote()
    }
}
function restart(){
    election.Clear()
    $(profile_table).empty()
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
        profile=$(`<div></div>`).addClass("profile")[0]
        $(profile_table).append(profile)
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