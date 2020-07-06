class Generate {
    constructor(num){
        this.board = [];
        this.board2 = [];
        this.click = [];
        this.clickRight = [];
        this.stack = [];
        this.die = false;
        /**
         * 初级9*9   10个雷
         * 中级16*16 40个雷
         * 高级16*30 99个雷
         * */
        this.boardMessage = [[9,9,10],[16,16,40],[16,30,99]];
        this.dir = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        this.dir2 = [[[-1,0],[0,-1],[0,1],[1,0]],[[0,-1],[0,1],[1,0],[-1,0]],[[0,1],[1,0],[-1,0],[0,-1]],[[1,0],[-1,0],[0,-1],[0,1]]];
        this.x = this.boardMessage[num][0];
        this.y = this.boardMessage[num][1];
        this.mine = this.boardMessage[num][2];
        this.textColor = ['blue','red','green','darkblue','darkred','darkgreen'];
        this.flagPng = '<img class="flag" src="images/flag.png" alt="">';
        this.generateBoard();
        this.judgeMine();
        this.updateHtml();
        this.setEvent();
        game.stop();
        game.start(this.mine);
        game.rest(num);
    }
    generateBoard(){
        let sum=0;
        for(let i=0;i<this.x;i++){
            this.board[i] = [];
            this.click[i] = [];
            this.clickRight[i] = [];
            for(let j=0;j<this.y;j++){
                this.board[i][j] = null;
                this.click[i][j] = false;
                this.clickRight[i][j] = false;
                this.board2[sum] = [[i],[j]];
                sum++;
            }
        }
        this.randomMine();
    }
    randomMine(){
        for(let i=0;i<this.mine;i++){
            let num = Math.floor(Math.random()*this.board2.length);
            let arr = this.board2.splice(num,1);
            this.board[arr[0][0]][arr[0][1]] = 'mine';
        }
    }
    judgeMine(){
        for(let i=0;i<this.board2.length;i++){
                let x =this.board2[i][0][0];
                let y =this.board2[i][1][0];
                let num = 0;
                for(let j=0;j<this.dir.length;j++){
                    let newX = x+this.dir[j][0];
                    let newY = y+this.dir[j][1];
                    if(this.inArea(newX,newY)&&this.board[newX][newY]==='mine'){
                        num++
                    }
                }
                this.board[x][y] = num;
        }
    }
    updateHtml(){
        this.content = $('.game-area');
        this.content.children().remove();
        for(let i=0;i<this.x;i++){
            let row = $('<div class="d-flex"></div>');
            for(let j=0;j<this.y;j++){
                let div = $('<div class="click"></div>');
                let state = false;
                for(let z=1;z<8;z++){
                    switch (this.board[i][j]){
                        case 'mine': div.append('<img src="images/boom.png" alt="">');state = 3;break;
                        case z: div.append(`<strong>${z}</strong>`);state=true;break;
                    }
                    if(state){
                        if(state===3){
                            break;
                        }
                        div.addClass(this.textColor[z-1]);
                        break;
                    }
                }
                div.append('<div class="mask"><div class="mask-white"></div><div class="mask-black"></div></div>');
                row.append(div);
            }
            this.content.append(row);
        }
    }
    inArea(x,y){
        return x>=0&&x<this.x&&y>=0&&y<this.y;
    }
    setEvent(){
        let _self = this;

        $('.game-area').click(()=>{
            game.startState = true;
        });
        document.oncontextmenu=function(ev){
            return false;    //屏蔽右键菜单
        };
        $('.click').click(function(e){
            if(this.die) return;

            let x = $(this).parent().index();
            let y = $(this).index();
            _self.divClick(x,y);
        }).mousedown(function(e){
            if(e.button===2){
                let x = $(this).parent().index();
                let y = $(this).index();
                if(_self.click[x][y]) return;
                _self.flag(x,y,this);
            }
        });
        $('.mask').mouseover(function(){
            let x = $(this).parent().parent().index();
            let y = $(this).parent().index();
            if(_self.clickRight[x][y]) return;

            $(this).children().hide();
        }).mouseout(function(){
            $(this).children().show();
        });
    }
    divClick(x,y){
        if(this.die||this.clickRight[x][y]||this.click[x][y]) return;

        $('.game-area .d-flex').eq(x).children('.click').eq(y).children('.mask').remove();
        this.click[x][y]=true;
        this.clickJudge(x,y);
        this.victory();
    }
    clickJudge(x,y){
        if(this.board[x][y]==='mine'){
            this.die =true;
            $('.face>img').attr('src','images/face_fail.bmp');
            this.content.append('<div class="victory"></div>');
            this.remove();
        }else{
            window.setTimeout(()=>{
                let num = Math.floor(Math.random()*this.dir2.length);
                let dir = this.dir2[num];
                for(let i=0;i<dir.length;i++){
                    let newX = x+dir[i][0];
                    let newY = y+dir[i][1];
                    if(this.inArea(newX,newY)&&this.board[newX][newY]==='mine'){
                        this.state=false;
                        return;
                    }
                    if(this.inArea(newX,newY)&&this.board[newX][newY]!=='mine'&&!this.click[newX][newY]){
                        this.divClick(newX,newY);
                        return;
                    }
                }
            });
        }
    }
    victory(){
        let num=0;
        let arr = [];
        for(let i=0;i<this.click.length;i++){
            for(let j=0;j<this.click[i].length;j++){
                if(!this.click[i][j]){
                    num++;
                    arr.push([i,j]);
                }
            }
        }
        if(num===this.mine){
            for(let i=0;i<arr.length;i++){
                let x=arr[i][0];
                let y=arr[i][1];
                if(this.board[x][y]!=='mine'){
                    return;
                }
            }
            this.die=true;
            this.content.append('<div class="victory"></div>');
            this.remove();
        }
    }
    remove(){
        game.die = true;
        let remove = window.setInterval(()=>{
            let currentHeight = $('.victory').position().top;
            let allHeight = this.content.height();

            if(currentHeight===this.content.height()) window.clearInterval(remove);

            let differenceHeight = allHeight-(allHeight-currentHeight);
            let currentDiv = Math.floor(differenceHeight/$('.click').height());
            $('.game-area .d-flex').eq(currentDiv).children('.click').children('.mask').remove();
            $('.game-area .d-flex').eq(currentDiv).children('.click').children('.flag').remove();
        },33)
    }
    flag(x,y,div){
        if(this.die) return;

        this.clickRight[x][y] = !this.clickRight[x][y];
        if(this.clickRight[x][y]){
            if(game.differentNum==='00'){
                alert('旗子不能比炸弹多!');
                return;
            }

            $(div).append(this.flagPng);
            game.flagNum++;
        }else {
            $(div).children('.flag').remove();
            game.flagNum--;
        }
        game.differentNum=game.mineNum-game.flagNum>=10?String(game.mineNum-game.flagNum):"0"+String(game.mineNum-game.flagNum);
        game.updateHtml();
    }
}
