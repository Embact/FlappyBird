// import { background } from "./background.js";
import { Layer } from "./system/background.js";
import { Bird } from "./system/bird.js";
import { GameOver } from "./system/gameover.js";
import { InputHandler } from "./system/input.js";
import { Level } from "./system/level.js";
import { Platforms } from "./system/platforms.js";
import { Score } from "./system/score.js";
import { Sound } from "./system/sound.js";
import { StartGame } from "./system/startGame.js";

window.addEventListener("load", (e) => {
   const canvas = document.getElementById("canvas");
   const ctx = canvas.getContext("2d");
   // Canvas : Height , Width
   canvas.width = 288;
   canvas.height = 512;
   // New Merge Game Class
   class Game {
      constructor(width, height) {
         this.context;
         this.width = width;
         this.height = height;
         this.ground = 112;
         this.speed = 1;
         this.score = 0;
         this.sound = new Sound();
         this.platforms = new Platforms(this);
         this.scoreLayer = new Score(this);
         this.startGame = new StartGame(this);
         this.gameOver = new GameOver(this);
         this.level = new Level(this);
         this.bird = new Bird(this);
         this.input = new InputHandler(this);
         this.gameStart = false;
         this.gameOverState = false;
         this.clickable = true;
         this.night = false;
         //Backgrounds
         //
         this.background = new Image();
         this.base = new Image();
         //
         this.background.src = `./sprites/background-${this.night ? "night" : "day"}.png`;
         this.base.src = "./sprites/base.png";
         //
         this.backgroundLayer = new Layer(this, 0, 0, this.width, this.height, 0, this.background);
         this.baseLayer = new Layer(this, 0, this.height - 112, 336, this.ground, 1, this.base);
      }

      update(deltaTime) {
         if (this.gameStart) this.backgroundLayer.update();
         if (this.gameStart) this.platforms.update();
         this.bird.update(this.input.keys, deltaTime);
         if (this.gameStart) this.baseLayer.update();
      }

      draw(context) {
         this.context = context;
         this.backgroundLayer.draw(context);
         this.platforms.draw(context);
         if (this.gameStart || this.gameOverState) this.scoreLayer.draw(context);
         if (this.gameStart == true || this.gameOverState == true) this.bird.draw(context);
         this.baseLayer.draw(context);
         if (this.gameOverState) this.gameOver.draw(context);
         if (this.score == 0 && this.gameStart == false && this.gameOverState == false) {
            this.startGame.draw(this.context);
         }
      }
   }
   // Start Build Game : by create Object
   const game = new Game(canvas.width, canvas.height);
   let lastTime = 0;
   // Animate By Frame
   function animate(timeStamp = 0) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      // Remove Previous Frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.update(deltaTime);
      game.draw(ctx);

      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
         requestAnimationFrame(animate);
      }
      // requestAnimationFrame(animate);
   }
   // animate(0);
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
      window.setInterval(animate, 1000 / 130);
   } else {
      animate();
   }
});
