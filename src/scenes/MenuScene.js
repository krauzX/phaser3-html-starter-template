import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = this.scale;
    
    // Add background
    this.add.image(width / 2, height / 2, 'background');
    
    // Add logo
    const logo = this.add.image(width / 2, height / 3, 'logo');
    logo.setScale(0.5);
    
    // Add start button
    const startButton = this.add.image(width / 2, height / 2 + 100, 'button');
    startButton.setScale(0.5);
    
    // Add text to button
    const startText = this.add.text(width / 2, height / 2 + 100, 'Start Game', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
    startText.setOrigin(0.5);
    
    // Make button interactive
    startButton.setInteractive();
    
    // Button hover effect
    startButton.on('pointerover', () => {
      startButton.setScale(0.55);
    });
    
    startButton.on('pointerout', () => {
      startButton.setScale(0.5);
    });
    
    // Start game on button click
    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
    
    // Add version text
    const versionText = this.add.text(10, height - 20, 'Phaser 3 Starter Template v1.0.0', {
      fontSize: '16px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
  }
}
