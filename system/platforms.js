export class Platforms {
   constructor(game) {
      this.game = game;
      this.context;
      this.width = 52;
      this.height = 320;
      this.x = this.game.width + this.width;
      this.y = 0;
      this.horizontalDistance = 80;
      this.checkPoint = this.game.height;
      this.randomNumber;
      this.platformsList = [];
      this.platforms;
      this.topPlatform = new Image();
      this.topPlatform.src = "./sprites/pipe-green-down.png";
      this.bottomPlatform = new Image();
      this.bottomPlatform.src = "./sprites/pipe-green.png";
      this.isScorable = true;
      this.collisionOpened = true;
   }

   update() {
      // Move
      if (this.x <= -this.width) {
         this.platformsList[0].top.x = this.game.width + this.width;
         this.platformsList[0].bottom.x = this.game.width + this.width;
      } else {
         this.platformsList[0].check.x -= this.game.speed;
         this.platformsList[0].top.x -= this.game.speed;
         this.platformsList[0].bottom.x -= this.game.speed;
      }
      // Check Collision
      this.collision();
   }

   random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   draw(context) {
      this.context = context;
      if (this.platformsList.length === 0) this.createPlatform(context);
      else {
         // Top Platform
         context.drawImage(this.topPlatform, this.platforms.top.x, this.platforms.top.y, this.width, this.height);
         // Bottom Platform
         context.drawImage(this.bottomPlatform, this.platforms.bottom.x, this.platforms.bottom.y, this.width, this.height);
      }
      // Remove Old Platform
      this.removePlatform(context);
   }

   removePlatform(context) {
      if (this.platforms != null && this.platforms.top.x + this.width < 0) {
         this.platformsList = [];
         this.isScorable = true;
         this.createPlatform(context);
      }
   }

   createPlatform() {
      // Random
      this.randomNumber = this.random(-50, 100);
      this.randomCheck = this.random(110, 130);

      this.platforms = {
         random: this.randomNumber,
         check: { x: this.x + this.width / 2, y: this.y },
         top: { x: this.x, y: this.y - this.randomCheck - this.randomNumber },
         bottom: { x: this.x, y: this.game.height - (this.height - this.randomCheck + this.randomNumber) },
      };
      this.platformsList.push(this.platforms);
   }

   collision() {
      // Check Platform Collision
      if (this.collisionOpened) {
         if (
            (this.game.bird.x - this.game.bird.width + 15 >= this.platforms.top.x - this.width &&
               this.game.bird.x - this.game.bird.width + 15 < this.platforms.top.x + this.width / 2 &&
               this.game.bird.y < this.platforms.top.y + this.height &&
               this.game.bird.y >= this.platforms.top.y) ||
            (this.game.bird.x - this.game.bird.width + 15 >= this.platforms.bottom.x - this.width &&
               this.game.bird.x - this.game.bird.width + 15 < this.platforms.bottom.x + this.width / 2 &&
               this.game.bird.y < this.platforms.bottom.y + this.height &&
               this.game.bird.y + this.game.bird.height >= this.platforms.bottom.y)
         ) {
            this.game.sound.play("hit");
            this.game.gameOver.stop();
         }
      }
      // Collision With CheckPoint [Score Line]
      if (
         this.game.bird.x - this.game.bird.width + 15 >= this.platforms.check.x - this.width &&
         this.game.bird.x - this.game.bird.width + 15 < this.platforms.check.x + this.width / 2
      ) {
         this.isScorable && this.game.scoreLayer.increaseScore();
         this.isScorable = false;
      }
   }
}
