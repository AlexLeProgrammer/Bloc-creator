const canvas = document.querySelector('#wall');
const ctx = canvas.getContext('2d');

const WALL_SPRITE = new Image();
WALL_SPRITE.src = './images/wall/wall.png';

const HOLDS_SPRITE = new Image();
HOLDS_SPRITE.src = './images/wall/holds.png';

function drawWall(boulder, zoom = 1, x = 0, y = 0, otherHolds = true) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.drawImage(WALL_SPRITE, x, y, canvas.width * zoom, canvas.height * zoom);
  if (otherHolds) {
    ctx.drawImage(HOLDS_SPRITE, x, y, canvas.width * zoom, canvas.height * zoom);
  }

  let holdsPositions = [];
  let startPositions = [];
  let topPosition = {};

  // holds
  for (let hold of Object.keys(boulder)) {
    const holdSprite = new Image();
    holdSprite.src = `./images/wall/holds/${hold}.png`;
    holdSprite.onload = () => {
      ctx.drawImage(holdSprite, x, y, canvas.width * zoom, canvas.height * zoom);

      const position = getHoldPosition(holdSprite);

      holdsPositions.push(position);

      if (boulder[hold] === 1) {
        startPositions.push(position);
      }

      if (boulder[hold] === 2) {
        topPosition = position;
      }
    }
  }
}

function getHoldPosition(holdSprite) {
  // Créer un canvas temporaire
  const _canvas = document.createElement('canvas');
  const _ctx = _canvas.getContext('2d');

  _canvas.width = holdSprite.width;
  _canvas.height = holdSprite.height;

  // Dessiner l'image sur le canvas
  _ctx.drawImage(holdSprite, 0, 0);

  // Obtenir les données des pixels
  const imageData = _ctx.getImageData(0, 0, _canvas.width, _canvas.height);
  const pixels = imageData.data;

  // Initialiser les limites
  let top = holdSprite.height;
  let bottom = 0;
  let left = holdSprite.width;
  let right = 0;

  // Parcourir tous les pixels
  for (let y = 0; y < holdSprite.height; y++) {
    for (let x = 0; x < holdSprite.width; x++) {
      const index = (y * holdSprite.width + x) * 4; // Index du pixel dans le tableau
      const alpha = pixels[index + 3]; // Canal alpha

      if (alpha > 1) {
        ctx.fillRect(x, y, 0, 0);

        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
        left = Math.min(left, x);
        right = Math.max(right, x);
      }
    }
  }

  if (top <= bottom && left <= right) {
    return { top, bottom, left, right };
  } else {
    return null;
  }
}