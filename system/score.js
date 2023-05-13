export class Score {
   constructor(game) {
      this.context;
      this.game = game;
      this.width = 24;
      this.height = 36;
      this.x = this.game.width / 2 - this.width / 2;
      this.y = 30;
      this.image = new Image();
      this.allImages = [];
      this.numbers = {
         0: "./sprites/0.png",
         1: "./sprites/1.png",
         2: "./sprites/2.png",
         3: "./sprites/3.png",
         4: "./sprites/4.png",
         5: "./sprites/5.png",
         6: "./sprites/6.png",
         7: "./sprites/7.png",
         8: "./sprites/8.png",
         9: "./sprites/9.png",
      };
   }

   loadImages() {
      if (this.allImages.length === 0) {
         for (let i = 0; i < 10; i++) {
            let newImage = new Image();
            newImage.src = this.numbers[i];
            this.allImages[i] = newImage;
         }
      }
   }

   increaseScore() {
      this.game.sound.play("point");
      this.game.score++;
      this.game.level.check();
   }

   draw(context) {
      if (this.allImages.length === 0) {
         // Load All Images
         this.loadImages();
      } else {
         let scores = this.game.score.toString().split("");
         scores.forEach((score, index) => {
            context.drawImage(
               this.allImages[score],
               this.x - (scores.length * this.width) / 2 + 10 + index * this.width,
               this.y,
               this.width,
               this.height
            );
         });
      }
      //
   }
}
