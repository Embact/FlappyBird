export class GameOver {
   constructor(game) {
      this.game = game;
      this.width = 192;
      this.height = 42;
      this.x = this.game.width / 2 - this.width / 2;
      this.y = this.game.height / 2 - this.height / 2;
      this.image = new Image();
      this.image.src = "./sprites/gameover.png";
   }

   stop() {
      // Freeze Bird
      this.game.clickable = false;
      this.game.gameOverState = true;
      this.game.bird.isJump = true;
      this.game.bird.vy = 0;
      this.game.bird.animateStart = false;
      this.game.gameStart = false;
      this.game.speed = 1;
      this.game.level.nextLevel = this.game.level.initialValue;
      setTimeout(() => {
         this.game.sound.stopAll();
         this.game.clickable = true;
      }, 1000);
   }

   start() {
      // Reset Score
      this.game.score = 0;
      // Reset Bird
      this.game.bird.isJump = false;
      this.game.bird.y = this.game.height / 2 - this.game.bird.height / 2;
      this.game.bird.animateStart = true;
      // Reset Platform
      this.game.platforms.platformsList = [];
      this.game.platforms.isScorable = true;
   }

   draw(context) {
      // Show Image
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
   }
}
