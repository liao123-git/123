class Game {
    constructor(){
        this.setEvent();
    }
    setEvent(){
        new LevelSelection();
    }
    start(num){
        this.timeArr=[0,0,0,0];
        this.timer=null;
        this.flagNum=0;
        this.mineNum=num;
        this.differentNum= this.mineNum-this.flagNum>=10?String(this.mineNum-this.flagNum):"0"+String(this.mineNum-this.flagNum);
        this.die = false;
        this.startState=false;
        this.setTimeOut();
        this.updateHtml(1);
    }
    stop(){
        $('.face>img').attr('src','images/face_normal.bmp');
        $('.time').remove();
        $('.flagNum').remove();
        $('.mineNum').remove();
        $('.differentNum').remove();
        clearTimeout(this.timer);
    }
    setTimeOut(){
        if(this.die) return;

        this.timer = window.setTimeout(()=>{
            if(!this.startState){
                this.setTimeOut();
                return;
            }

            this.timeArr[3]++;
            this.timeCalculation();
            this.updateHtml();
            this.setTimeOut();
        },1000);
    }
    timeCalculation(){
        if(this.timeArr[3]>9){
            this.timeArr[3]=0;
            this.timeArr[2]++;
        }
        if(this.timeArr[2]>=6){
            this.timeArr[2]=0;
            this.timeArr[1]++;
        }
        if(this.timeArr[1]>9){
            this.timeArr[1]=0;
            this.timeArr[0]++;
        }
    }
    updateHtml(num){
        if(num){
            $('.features').append('<div class="flagNum d-flex"></div>').append('<div class="time d-flex"></div>');
            $('.flagNum').append('<img src="images/number'+this.differentNum[0]+'.png" class="flagNumImg" alt="">').append('<img src="images/number'+this.differentNum[1]+'.png" class="flagNumImg" alt="">');
            for(let i=0;i<this.timeArr.length;i++){
                $('.time').append('<img src="images/number'+this.timeArr[i]+'.png" class="number" alt="">');
                if(i===1){
                    $('.time').append('<img src="images/middle.png" alt="">');
                }
            }
        }
        for(let i=0;i<this.timeArr.length;i++){
            $('.number').eq(i).attr('src','images/number'+this.timeArr[i]+'.png');
        }
        $('.flagNumImg').eq(0).attr('src','images/number'+this.differentNum[0]+'.png');
        $('.flagNumImg').eq(1).attr('src','images/number'+this.differentNum[1]+'.png');
    }
    rest(num){
        $('.face>img').click(()=>{
            new Generate(Number(num));
        });
    }
}
$(()=>{
    window.game = new Game();
    new Generate(0);
});