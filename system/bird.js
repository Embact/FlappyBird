export class Bird {
   constructor(game) {
      this.game = game;
      this.width = 34;
      this.height = 24;
      this.floorHeight = 112;
      this.x = this.game.width / 2 - this.width;
      this.y = this.game.height / 2 - this.height / 2;
      this.vy = 0;
      this.weight = 0.06;
      this.isJump = false;
      this.landVelocity = 0;
      // Animation
      this.maxFrame;
      this.fps = 25 * this.game.speed;
      this.frameInterval = 1000 / this.fps;
      this.frameTimer = 0;
      this.color = "yellowbird";
      this.image = new Image();
      this.image.src = `./sprites/${this.color}-midflap.png`;
      this.image1 = new Image();
      this.image1.src = `./sprites/${this.color}-upflap.png`;
      this.image2 = new Image();
      this.image2.src = `./sprites/${this.color}-downflap.png`;
      this.animateStart = true;
      this.angles = { top: -20, bottom: 90 };
      this.angle = this.angles.top;
   }

   update(input, deltaTime) {
      // Move TO top
      this.y += this.vy;
      // If Jump And Game Is Over
      if (input.includes("Click") && this.isJump == true && this.game.gameOverState === true && this.game.clickable === true) {
         this.game.gameOver.start();
      }
      // Jump
      if (input.includes("Click") && this.isJump == false && this.game.clickable === true) {
         this.isJump = true;
         this.game.gameStart = true;
         this.game.gameOverState = false;
         this.vy = 0;
         this.vy -= 2.1;
         this.landVelocity = 0;
         this.game.sound.play("wing");
         this.game.input.keys = [];
      }

      if (this.game.gameStart && !input.includes("Click")) {
         // Gravity , Fall
         if (this.vy <= 2.4) this.vy += this.weight;
         this.vy > 5.5 && this.game.sound.play("swoosh");
         // Control Click After
         this.isJump = false;
      }

      // Not allow To Cross The Top
      if (this.y < this.height) this.vy += 0.5;
      // Not allow To Cross The Bottom
      if (this.y > this.game.height - this.height - this.floorHeight) {
         this.game.gameStart = false;
         this.vy = 0;
         this.y = this.game.height - this.height - this.floorHeight;
         this.game.sound.play("die");
         this.game.gameOver.stop();
      }
      /**
       * Bird Face Angle
       */
      // Get Bird targetAngle According to the height Velocity [this.vy]
      if (this.vy < 0) {
         this.targetAngle = this.angles.top;
      } else if (this.vy >= 2.4) {
         this.targetAngle = this.angles.bottom;
      }
      // Change The Angle According to the Angle
      if (this.angle < this.targetAngle && this.vy > 2.4) {
         // Fall
         this.angle += 3;
      } else if (this.angle > this.targetAngle && this.vy < 0) {
         // Jump
         this.angle -= 2;
      }
      //// To Make The Angle Equalt the Angles OBJECT =>  not more than or Less than
      if (this.angle < this.angles.top) {
         this.angle = this.angles.top;
      } else if (this.angle > this.angles.bottom) {
         this.angle = this.angles.bottom;
      }
      /**
       * Sprite Animation
       */
      if (this.animateStart) {
         console.log(this.frameTimer, this.frameInterval);
         if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            switch (this.image.src.split("/")[this.image.src.split("/").length - 1]) {
               case `${this.color}-upflap.png`:
                  this.image.src = `./sprites/${this.color}-midflap.png`;
                  break;
               case `${this.color}-midflap.png`:
                  this.image.src = this.image2.src;
                  break;
               case `${this.color}-downflap.png`:
                  this.image.src = this.image1.src;
                  break;
               default:
                  this.image.src = `./sprites/${this.color}-midflap.png`;
                  break;
            }
         } else {
            this.frameTimer += deltaTime;
         }
      } else {
         this.image.src = `./sprites/${this.color}-midflap.png`;
      }
   }

   draw(context) {
      // Save the canvas state
      const degToRad = (deg) => (deg * Math.PI) / 180;
      context.save();
      context.translate(this.x + 16, this.y + 10);
      context.rotate(degToRad(this.angle % 360));
      context.drawImage(this.image, this.width / -2, this.height / -2, this.width, this.height);
      // Restore the canvas state
      context.restore();
   }
}
