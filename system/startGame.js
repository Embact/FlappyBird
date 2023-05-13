export class StartGame {
    constructor(game){
        this.game = game;
        this.width = 184;
        this.height = 267;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
        this.image = new Image();
        this.image.src= "./sprites/message.png";
    }

    draw(context) {
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}