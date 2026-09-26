import { clampOffset } from "./windowDrag";

const bounds = { left: 0, top: 0, right: 1000, bottom: 600 };
// Window currently at (100, 50), 400 x 300, with no drag offset yet.
const start = { offset: { x: 0, y: 0 }, rect: { left: 100, top: 50, width: 400, height: 300 } };

describe("clampOffset", () => {
  it("moves the window by the pointer delta", () => {
    expect(clampOffset(start, { x: 120, y: 40 }, bounds)).toEqual({ x: 120, y: 40 });
  });

  it("keeps the window inside the left and top edges", () => {
    expect(clampOffset(start, { x: -500, y: -500 }, bounds)).toEqual({ x: -100, y: -50 });
  });

  it("keeps the window inside the right and bottom edges", () => {
    expect(clampOffset(start, { x: 900, y: 900 }, bounds)).toEqual({ x: 500, y: 250 });
  });

  it("builds on an existing offset", () => {
    const moved = { ...start, offset: { x: 30, y: 10 } };
    expect(clampOffset(moved, { x: 20, y: 5 }, bounds)).toEqual({ x: 50, y: 15 });
  });
});
