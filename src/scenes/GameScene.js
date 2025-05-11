import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.score = 0;
    this.gameOver = false;
  }

  create() {
    // Add background
    this.add.image(400, 300, 'background');
    
    // Create platforms group
    this.platforms = this.physics.add.staticGroup();
    
    // Create ground
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    
    // Create platforms
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');
    
    // Create player
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    // Player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'player', frame: 0 } ],
      frameRate: 20
    });
    
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player-run', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    
    // Create stars
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    
    // Create bombs
    this.bombs = this.physics.add.group();
    
    // Create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
      fontFamily: 'Arial'
    });
    
    // Set up collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    
    // Set up overlaps
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    
    // Set up input
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Add background music
    this.music = this.sound.add('music', { loop: true, volume: 0.5 });
    this.music.play();
    
    // Add sound effects
    this.jumpSound = this.sound.add('jump', { volume: 0.5 });
    this.collectSound = this.sound.add('collect', { volume: 0.5 });
    this.explosionSound = this.sound.add('explosion', { volume: 0.5 });
  }

  update() {
    if (this.gameOver) {
      return;
    }
    
    // Player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
    
    // Player jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
      this.jumpSound.play();
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    
    // Play collect sound
    this.collectSound.play();
    
    // Update score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    
    // Check if all stars are collected
    if (this.stars.countActive(true) === 0) {
      // Respawn stars
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
      
      // Create a bomb
      const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      const bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    // Stop physics
    this.physics.pause();
    
    // Play explosion sound
    this.explosionSound.play();
    
    // Stop music
    this.music.stop();
    
    // Set player tint and stop animation
    player.setTint(0xff0000);
    player.anims.play('turn');
    
    // Set game over flag
    this.gameOver = true;
    
    // Wait a moment before showing game over scene
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOverScene', { score: this.score });
    });
  }
}
