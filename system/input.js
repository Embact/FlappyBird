export class InputHandler {
   constructor(game) {
      this.game = game;
      this.keys = [];
      this.controlKeys = ["Space", "Click"];
      this.lastPress = new Date().getTime();
      /////////////////////////////////////////////////////////////////////////
      // Keyboard Events
      window.addEventListener("keydown", (e) => {
         if (e.code == "Space" && this.keys.indexOf("Click") === -1) {
            this.keys.push("Click");
         }
      });
      ////////////////////////////////
      window.addEventListener("keyup", (e) => {
         if (this.keys.includes("Click")) {
            this.keys.splice(this.keys.indexOf("Click"), 1);
         }
      });
      /////////////////////////////////////////////////////////////////////////
      // Mouse Events
      window.addEventListener("mousedown", (e) => {
         if (this.keys.indexOf("Click") === -1) {
            this.keys.push("Click");
         }
      });
      ////////////////////////////////
      window.addEventListener("mouseup", (e) => {
         if (this.keys.includes("Click")) {
            this.keys.splice(this.keys.indexOf("Click"), 1);
         }
      });
      /////////////////////////////////////////////////////////////////////////
      // Touch Events
      window.addEventListener("touchstart", (e) => {
         if (this.keys.indexOf("Click") === -1) {
            this.keys.push("Click");
         }
      });
      window.addEventListener("touchend", (e) => {
         if (this.keys.includes("Click")) {
            this.keys.splice(this.keys.indexOf("Click"), 1);
         }
      });
   }
}
