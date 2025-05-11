import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.score = data.score || 0;
  }

  create() {
    const { width, height } = this.scale;
    
    // Add background
    this.add.image(width / 2, height / 2, 'background');
    
    // Add game over text
    const gameOverText = this.add.text(width / 2, height / 3, 'GAME OVER', {
      fontSize: '64px',
      fontFamily: 'Arial',
      fontWeight: 'bold',
      fill: '#ff0000'
    });
    gameOverText.setOrigin(0.5);
    
    // Add score text
    const scoreText = this.add.text(width / 2, height / 2, `Score: ${this.score}`, {
      fontSize: '32px',
      fontFamily: 'Arial',
      fill: '#ffffff'
    });
    scoreText.setOrigin(0.5);
    
    // Add restart button
    const restartButton = this.add.image(width / 2, height / 2 + 100, 'button');
    restartButton.setScale(0.5);
    
    // Add text to button
    const restartText = this.add.text(width / 2, height / 2 + 100, 'Play Again', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
    restartText.setOrigin(0.5);
    
    // Make button interactive
    restartButton.setInteractive();
    
    // Button hover effect
    restartButton.on('pointerover', () => {
      restartButton.setScale(0.55);
    });
    
    restartButton.on('pointerout', () => {
      restartButton.setScale(0.5);
    });
    
    // Restart game on button click
    restartButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
    
    // Add menu button
    const menuButton = this.add.image(width / 2, height / 2 + 180, 'button');
    menuButton.setScale(0.5);
    
    // Add text to button
    const menuText = this.add.text(width / 2, height / 2 + 180, 'Main Menu', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
    menuText.setOrigin(0.5);
    
    // Make button interactive
    menuButton.setInteractive();
    
    // Button hover effect
    menuButton.on('pointerover', () => {
      menuButton.setScale(0.55);
    });
    
    menuButton.on('pointerout', () => {
      menuButton.setScale(0.5);
    });
    
    // Go to menu on button click
    menuButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}
