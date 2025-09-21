export default class Score {
    constructor(maxMisses = 5) {
      this.points = 0;
      this.misses = 0;
      this.maxMisses = maxMisses;
  
      this.pointsEl = document.createElement('div');
      this.pointsEl.textContent = `Points: ${this.points} | Misses: ${this.misses}`;
      document.body.prepend(this.pointsEl);
    }
  
    hit() {
      this.points++;
      this.update();
    }
  
    miss() {
      this.misses++;
      this.update();
    }
  
    update() {
      this.pointsEl.textContent = `Points: ${this.points} | Misses: ${this.misses}`;
    }
  
    gameOver() {
      return this.misses >= this.maxMisses;
    }
  }
  