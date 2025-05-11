import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Load any assets needed for the loading screen
    this.load.image('loading-background', 'assets/images/loading-background.png');
    this.load.image('loading-bar', 'assets/images/loading-bar.png');
  }

  create() {
    // Set up any configurations or initialize any systems
    this.scale.refresh();
    
    // Transition to the preload scene
    this.scene.start('PreloadScene');
  }
}
