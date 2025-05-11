/**
 * Game utility functions for common tasks
 */

/**
 * Creates a button with text and hover effects
 * @param {Phaser.Scene} scene - The scene to add the button to
 * @param {number} x - The x position of the button
 * @param {number} y - The y position of the button
 * @param {string} text - The text to display on the button
 * @param {Function} callback - The function to call when the button is clicked
 * @param {Object} textStyle - The style object for the text
 * @returns {Object} - The button and text objects
 */
export const createButton = (scene, x, y, text, callback, textStyle = {}) => {
  // Default text style
  const defaultStyle = {
    fontSize: '32px',
    fill: '#fff',
    fontFamily: 'Arial'
  };
  
  // Merge default style with provided style
  const style = { ...defaultStyle, ...textStyle };
  
  // Create button
  const button = scene.add.image(x, y, 'button');
  button.setScale(0.5);
  
  // Create text
  const buttonText = scene.add.text(x, y, text, style);
  buttonText.setOrigin(0.5);
  
  // Make button interactive
  button.setInteractive();
  
  // Button hover effect
  button.on('pointerover', () => {
    button.setScale(0.55);
  });
  
  button.on('pointerout', () => {
    button.setScale(0.5);
  });
  
  // Button click
  button.on('pointerdown', callback);
  
  return { button, text: buttonText };
};

/**
 * Creates a simple particle effect
 * @param {Phaser.Scene} scene - The scene to add the particles to
 * @param {number} x - The x position of the particles
 * @param {number} y - The y position of the particles
 * @param {string} texture - The texture key to use for the particles
 * @param {Object} options - Options for the particle effect
 * @returns {Phaser.GameObjects.Particles.ParticleEmitter} - The particle emitter
 */
export const createParticleEffect = (scene, x, y, texture, options = {}) => {
  // Default options
  const defaultOptions = {
    speed: 100,
    quantity: 10,
    scale: { start: 1, end: 0 },
    lifespan: 800,
    blendMode: 'ADD'
  };
  
  // Merge default options with provided options
  const emitterOptions = { ...defaultOptions, ...options };
  
  // Create particle emitter
  const particles = scene.add.particles(texture);
  const emitter = particles.createEmitter(emitterOptions);
  
  // Set emitter position
  emitter.setPosition(x, y);
  
  return emitter;
};

/**
 * Saves game data to local storage
 * @param {string} key - The key to save the data under
 * @param {any} data - The data to save
 */
export const saveGameData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving game data:', error);
  }
};

/**
 * Loads game data from local storage
 * @param {string} key - The key to load the data from
 * @param {any} defaultValue - The default value to return if no data is found
 * @returns {any} - The loaded data or the default value
 */
export const loadGameData = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading game data:', error);
    return defaultValue;
  }
};
