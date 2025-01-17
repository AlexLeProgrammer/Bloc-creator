let boulder = {};
let zoom = 1.2;
let x = 40;
let y = -20;

document.addEventListener('loaded-images', () => {
  drawWall(boulder, zoom, x, y);
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const posX = (e.clientX - rect.left) * canvas.width / rect.width / zoom - x;
  const posY = (e.clientY - rect.top) * canvas.height / rect.height / zoom - y;

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
