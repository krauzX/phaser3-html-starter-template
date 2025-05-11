import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Create loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Loading background
    const bgBar = this.add.image(width / 2, height / 2, 'loading-background');
    
    // Loading bar
    const progressBar = this.add.image(width / 2, height / 2, 'loading-bar');
    progressBar.setOrigin(0.5, 0.5);
    
    // Crop the loading bar based on loading progress
    const progressBarMask = this.make.graphics();
    progressBarMask.fillRect(
      width / 2 - progressBar.displayWidth / 2,
      height / 2 - progressBar.displayHeight / 2,
      progressBar.displayWidth,
      progressBar.displayHeight
    );
    
    const mask = progressBarMask.createGeometryMask();
    progressBar.setMask(mask);
    
    // Update the loading bar as assets are loaded
    this.load.on('progress', (value) => {
      progressBarMask.clear();
      progressBarMask.fillRect(
        width / 2 - progressBar.displayWidth / 2,
        height / 2 - progressBar.displayHeight / 2,
        progressBar.displayWidth * value,
        progressBar.displayHeight
      );
    });
    
    // Clean up after loading is complete
    this.load.on('complete', () => {
      progressBar.destroy();
      bgBar.destroy();
      progressBarMask.destroy();
      mask.destroy();
    });
    
    // Load game assets
    this.loadAssets();
  }

  loadAssets() {
    // Load images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('button', 'assets/images/button.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('star', 'assets/images/star.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    
    // Load spritesheets
    this.load.spritesheet('player-run', 
      'assets/spritesheets/player-run.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    
    // Load audio
    this.load.audio('jump', 'assets/audio/jump.mp3');
    this.load.audio('collect', 'assets/audio/collect.mp3');
    this.load.audio('explosion', 'assets/audio/explosion.mp3');
    this.load.audio('music', 'assets/audio/music.mp3');
  }

  create() {
    // Create animations
    this.createAnimations();
    
    // Start the menu scene
    this.scene.start('MenuScene');
  }

  createAnimations() {
    // Player run animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  }
}
