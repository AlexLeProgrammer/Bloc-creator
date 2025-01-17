let boulder = {};
let zoom = 1;
let x = 0;
let y = 0;

document.addEventListener('loaded-images', () => {
  drawWall(boulder, zoom, x, y);
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const posX = (e.clientX - rect.left) * canvas.width / rect.width;
  const posY = (e.clientY - rect.top) * canvas.height / rect.height;

  for (let i in Object.values(holdsPositions)) {
    const pos = Object.values(holdsPositions)[i];
    if (posX > pos.left && posX < pos.right && posY > pos.top && posY < pos.bottom) {
      const hold = Object.keys(holdsPositions)[i];
      if (boulder.hasOwnProperty(hold)) {
        delete boulder[hold];
      } else {
        boulder[hold] = 0;
      }
      drawWall(boulder, zoom, x, y);
      break;
    }
  }
});
