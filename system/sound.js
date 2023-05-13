export class Sound {
   constructor() {
      this.audioList = {
         die: new Audio("./audio/die.ogg"),
         swoosh: new Audio("./audio/swoosh.ogg"),
         smooth: new Audio("./audio/point.ogg"),
         wing: new Audio("./audio/wing.ogg"),
         hit: new Audio("./audio/hit.ogg"),
         point: new Audio("./audio/point.ogg"),
      };

      // Change Volume 
      this.volume();

   }

   play(sound, stopAll = false) {
      if (stopAll) {
         Object.values(this.audioList).forEach((audio) => {
            if (this.audioList[sound].src != audio.src && !audio.paused) {
               audio.pause();
               audio.currentTime = 0;
            }
         });
      }
      if (this.audioList[sound].paused) {
         this.audioList[sound].play();
      } else {
         this.audioList[sound].pause();
         this.audioList[sound].currentTime = 0;
         this.audioList[sound].play();
      }
   }

   volume(volume = 0.3){
      Object.values(this.audioList).forEach((audio) => {
         audio.volume = volume;
      });
   }

   stop(sound) {
      if (!this.audioList[sound].paused) {
         this.audioList[sound].pause();
         this.audioList[sound].currentTime = 0;
      }
   }

   stopAll() {
      Object.values(this.audioList).forEach((audio) => {
         if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
         }
      });
   }
}
