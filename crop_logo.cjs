const Jimp = require('jimp');

async function cropLogos() {
  try {
    // Read both logos
    const lightLogo = await Jimp.read('public/logo.png');
    const darkLogo = await Jimp.read('public/logo-dark.png');
    
    // Autocrop both to remove excess transparent padding
    lightLogo.autocrop();
    darkLogo.autocrop();
    
    // Save them back
    await lightLogo.writeAsync('public/logo.png');
    await darkLogo.writeAsync('public/logo-dark.png');
    
    console.log('Logos successfully cropped and overwritten!');
  } catch (err) {
    console.error('Error cropping logos:', err);
  }
}

cropLogos();
