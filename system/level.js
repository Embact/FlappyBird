export class Level {
   constructor(game) {
      this.game = game;
      this.increaseBy = 10;
      this.initialValue = 10;
      this.nextLevel = this.initialValue;
   }

   increaseSpeed(speed = 0.3) {
      this.game.speed += speed;
   }

   check() {
      // Check Level
      let score = this.game.score;
      if (score == this.nextLevel) {
         this.increaseSpeed();
         this.nextLevel += this.increaseBy;
      }
   }
}
