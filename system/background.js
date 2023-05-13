export class Layer {
   constructor(game, x, y, width, height, speedModifier, image) {
      this.game = game;
      this.width = width;
      this.height = height;
      this.speedModifier = speedModifier;
      this.image = image;
      this.x = x;
      this.y = y;
   }

   update() {
      if (this.x < -this.width) this.x = 0;
      // else if (this.game.gameStart) this.x -= this.game.speed * this.speedModifier;
      else this.x -= this.game.speed * this.speedModifier;
   }

   draw(context) {
      if (this.speedModifier > 0) {
         for (let i = 0; i < 2; i++) {
            context.drawImage(this.image, this.width > this.game.width ? this.x + this.width * i : this.x, this.y, this.width, this.height);
         }
      } else {
         context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }
   }
}
