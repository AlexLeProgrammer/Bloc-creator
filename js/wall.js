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

  // holds
  for (let hold of Object.keys(boulder)) {
    const holdSprite = new Image();
    holdSprite.src = `./images/wall/holds/${hold}.png`;
    holdSprite.onload = () => {
      ctx.drawImage(holdSprite, x, y, canvas.width * zoom, canvas.height * zoom);
    }
  }
}