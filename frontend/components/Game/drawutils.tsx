import type { PlayerType, Net, Ball } from "../../types";

export const canvasWidth = 1080;
export const canvasHeight = 720;

// draw the table
export const drawTable = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string
) => {
  context.fillStyle = color;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
};

// draw the ball
export const drawBall = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) => {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, 20, 0, 2 * Math.PI, false);
  context.closePath();
  context.fill();
};

// draw the rectangle aka the paddle
export const drawRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) => {
  context.beginPath();
  context.roundRect(x, y, width, height, 10);
  context.fillStyle = color;
  context.fill();
  context.closePath();
};

// draw the net
export const drawNet = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) => {
  for (let i = 0; i <= canvasHeight; i += 20) {
    drawRect(context, x, y + i, width, height, color);
  }
};

export const net: Net = {
  x: canvasWidth / 2 - 2 / 2,
  y: 0,
  width: 5,
  height: 10,
  color: "white",
};

export const Player: PlayerType = {
  x: 10,
  y: canvasHeight / 2 - 110,
  width: 20,
  height: 200,
  color: "white",
};
export const Opponent: PlayerType = {
  x: canvasWidth - 30,
  y: canvasHeight / 2 - 110,
  width: 20,
  height: 200,
  color: "white",
};
export const ball: Ball = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  radius: 20,
  velocityX: 5,
  velocityY: 5,
  speed: 7,
  color: "white",
};
