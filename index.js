
// Game Config

const config = {
        type: Phaser.AUTO,
        width: 600,
        height: 400,
        parent: 'phaser',
        scene: []
    };
    
    const game = new Phaser.game(config)
    
    
    game.scene.add("SceneMain", SceneMain)