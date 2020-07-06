class LevelSelection {
    constructor(){
        this.state = false;
        this.setEvent();
    }
    updateHtml(){
        if(this.state){
            $('.selection').children().remove();
            this.state = !this.state;
            return;
        }

        this.easy = $('<button class="border-0 border-bottom bg-white w-100">Easy</button>');
        this.normal = $('<button class="border-0 border-bottom bg-white w-100">Normal</button>');
        this.hard = $('<button class="border-0 border-bottom bg-white w-100">Hard</button>');
        this.easy.click(()=>{
            new Generate(0);
        });
        this.normal.click(()=>{
            new Generate(1);
        });
        this.hard.click(()=>{
            new Generate(2);
        });
        this.buttons = $('<div></div>');
        this.buttons.append(this.easy);
        this.buttons.append(this.normal);
        this.buttons.append(this.hard);
        $('.selection').prepend(this.buttons);
        this.state =!this.state;
    }
    setEvent(){
        $('.game').click(()=>{
            this.updateHtml();
        });
        $(window).keydown((e)=>{
            if(e.keyCode===71){
                this.updateHtml();
            }
        })
    }
}