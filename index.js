'use strict';

let canvas = document.getElementById('ctemp');
let ctx = canvas.getContext('2d');
let cmain = document.getElementById('cmain');
let ctxmain = cmain.getContext('2d');
let imgSnail = document.getElementById('img_snail');
let imgDuck = document.getElementById('img_duck');
let imgSheep = document.getElementById('img_sheep');
let imgRobot = document.getElementById('img_robot');

let lastTime;
let iconImages = [imgSnail, imgDuck, imgSheep, imgRobot];
function draw() {
  ctx.save();

  let curTime = new Date();
  let iterations = 1;

  if (lastTime !== undefined) {
    let deltaTime = curTime - lastTime;
    if (deltaTime < 2000000) {
      iterations = Math.max(1, Math.floor(deltaTime / 20));
      if (iterations > 1) {
        curTime.setTime(lastTime.getTime() + 20);
      }
    }
  }

  let iconPositions = [];
  let finalsp;

  for (let iter = 0; iter < iterations; iter++) {
    let s = curTime.getMilliseconds();
    let m = curTime.getSeconds() + s / 1000;
    let h = curTime.getMinutes() + m / 60;
    let d = curTime.getHours() + h / 60;

    let sp = s / 1000;
    let mp = m / 60;
    let hp = h / 60;
    let dp = d / 24;
    finalsp = sp;

    let cx = canvas.width * 0.5;
    let cy = canvas.width * 0.5;

    let plist = [dp, hp, mp, sp];

    let pradius = [160, 80, 40, 20];

    for (let i = 0; i < 4; i++) {
      let r = pradius[i];
      let p = plist[i];
      let angle = Math.PI * 2 * p - Math.PI * 0.5;
      let x = cx + r * Math.cos(angle);
      let y = cy + r * Math.sin(angle);

      ctx.lineWidth = 2;
      ctx.strokeStyle = `hsl(${360*p},50%,50%)`;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.stroke();

      iconPositions[i] = {x, y};
      cx = x;
      cy = y;
    }

    curTime.setTime(curTime.getTime() + 20);
  }

  ctx.restore();

  ctxmain.save();
  ctxmain.filter = `blur(3px) hue-rotate(${360-finalsp * 360}deg)`;
  //ctxmain.filter = `blur(3px) hue-rotate(${hr}deg)`;
  //ctxmain.filter = `hue-rotate(${hr}deg)`;
  //hr = (hr - 5) % 360;

  ctxmain.clearRect(0, 0, cmain.width, cmain.height);

  ctxmain.drawImage(canvas, 0, 0);
  ctxmain.filter = 'none';
  for (let i = 0; i < 4; i++) {
    ctxmain.drawImage(iconImages[i], iconPositions[i].x - 8, iconPositions[i].y - 8);
  }
  ctxmain.restore();

  lastTime = curTime;
  requestAnimationFrame(draw);
}
let hr = 0;

draw();
