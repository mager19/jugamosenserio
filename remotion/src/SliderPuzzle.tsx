import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

// ─── Layout ──────────────────────────────────────────────────────────────────
const BOARD_SIZE = 800;
const BOARD_PADDING = 24;
const GAP = 12;
const GRID = 4;
// TILE_SIZE = (800 - 48 - 36) / 4 = 179
const TILE_SIZE = (BOARD_SIZE - BOARD_PADDING * 2 - GAP * (GRID - 1)) / GRID;

// ─── Timing ──────────────────────────────────────────────────────────────────
// 6 moves × 25 frames = 150 frames = 5 s @ 30fps
const MOVE_FRAMES = 18;
const PAUSE_FRAMES = 7;
const CYCLE = MOVE_FRAMES + PAUSE_FRAMES;

// ─── Colors ───────────────────────────────────────────────────────────────────
// Paleta flat: azul, amarillo, verde, naranja-rojo (igual al puzzle de referencia)
const COLORS: Record<number, { bg: string; text: string }> = {
  1:  { bg: "#4F86E8", text: "#FFFFFF" }, // azul
  2:  { bg: "#F5C842", text: "#3A2A00" }, // amarillo
  3:  { bg: "#52B96B", text: "#FFFFFF" }, // verde
  4:  { bg: "#E8694A", text: "#FFFFFF" }, // naranja-rojo
  5:  { bg: "#F5C842", text: "#3A2A00" }, // amarillo
  6:  { bg: "#52B96B", text: "#FFFFFF" }, // verde
  7:  { bg: "#E8694A", text: "#FFFFFF" }, // naranja-rojo
  8:  { bg: "#4F86E8", text: "#FFFFFF" }, // azul
  9:  { bg: "#52B96B", text: "#FFFFFF" }, // verde
  10: { bg: "#E8694A", text: "#FFFFFF" }, // naranja-rojo
  11: { bg: "#4F86E8", text: "#FFFFFF" }, // azul
  12: { bg: "#F5C842", text: "#3A2A00" }, // amarillo
  13: { bg: "#E8694A", text: "#FFFFFF" }, // naranja-rojo
  14: { bg: "#4F86E8", text: "#FFFFFF" }, // azul
  15: { bg: "#F5C842", text: "#3A2A00" }, // amarillo
};

// ─── Board states ─────────────────────────────────────────────────────────────
// 0 = empty slot  (same perspective as the reference image: 15-puzzle 4×4)
type Grid = number[][];

const STATES: Grid[] = [
  // state 0 — start (matches reference image layout)
  [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 15, 14, 0]],
  // after move 0: 14 slides right
  [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 15, 0, 14]],
  // after move 1: 11 slides down
  [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 12], [13, 15, 11, 14]],
  // after move 2: 12 slides left
  [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 12, 0], [13, 15, 11, 14]],
  // after move 3: 8 slides down
  [[1, 2, 3, 4], [5, 6, 7, 0], [9, 10, 12, 8], [13, 15, 11, 14]],
  // after move 4: 7 slides right
  [[1, 2, 3, 4], [5, 6, 0, 7], [9, 10, 12, 8], [13, 15, 11, 14]],
  // after move 5: 12 slides up
  [[1, 2, 3, 4], [5, 6, 12, 7], [9, 10, 0, 8], [13, 15, 11, 14]],
];

const MOVES = [
  { tile: 14, fromRow: 3, fromCol: 2, toRow: 3, toCol: 3 },
  { tile: 11, fromRow: 2, fromCol: 2, toRow: 3, toCol: 2 },
  { tile: 12, fromRow: 2, fromCol: 3, toRow: 2, toCol: 2 },
  { tile: 8,  fromRow: 1, fromCol: 3, toRow: 2, toCol: 3 },
  { tile: 7,  fromRow: 1, fromCol: 2, toRow: 1, toCol: 3 },
  { tile: 12, fromRow: 2, fromCol: 2, toRow: 1, toCol: 2 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const px = (col: number) => BOARD_PADDING + col * (TILE_SIZE + GAP);
const py = (row: number) => BOARD_PADDING + row * (TILE_SIZE + GAP);

// ─── Component ───────────────────────────────────────────────────────────────
export const SliderPuzzle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rawMoveIdx = Math.floor(frame / CYCLE);
  const frameInCycle = frame % CYCLE;
  const isAnimating = rawMoveIdx < MOVES.length && frameInCycle < MOVE_FRAMES;

  // Which board snapshot to render
  const stateIdx = isAnimating
    ? rawMoveIdx
    : Math.min(rawMoveIdx + 1, STATES.length - 1);
  const state = STATES[stateIdx];

  const activeMove = isAnimating ? MOVES[rawMoveIdx] : null;

  // Spring progress for the moving tile (snappy, minimal bounce)
  const progress = activeMove
    ? spring({
        frame: frameInCycle,
        fps,
        config: { damping: 22, stiffness: 180 },
        durationInFrames: MOVE_FRAMES,
      })
    : 1;

  const boardLeft = (1080 - BOARD_SIZE) / 2; // 140
  const boardTop = (1080 - BOARD_SIZE) / 2;  // 140

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FDFCFB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Board */}
      <div
        style={{
          position: "absolute",
          left: boardLeft,
          top: boardTop,
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          backgroundColor: "#2B2B2B",
          borderRadius: 28,
          boxShadow: "0 12px 60px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {state.flatMap((row, rowIdx) =>
          row.map((tileVal, colIdx) => {
            const isEmpty = tileVal === 0;
            const isMoving = activeMove !== null && tileVal === activeMove.tile;

            let x = px(colIdx);
            let y = py(rowIdx);

            if (isMoving && activeMove) {
              x = px(activeMove.fromCol) + (px(activeMove.toCol) - px(activeMove.fromCol)) * progress;
              y = py(activeMove.fromRow) + (py(activeMove.toRow) - py(activeMove.fromRow)) * progress;
            }

            const color = isEmpty ? null : COLORS[tileVal];

            return (
              <div
                key={isEmpty ? "empty" : `tile-${tileVal}`}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  backgroundColor: isEmpty ? "#2B2B2B" : color!.bg,
                  borderRadius: 16,
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isEmpty
                    ? "inset 0 2px 10px rgba(0,0,0,0.10)"
                    : isMoving
                    ? "0 10px 28px rgba(0,0,0,0.22)"
                    : "0 3px 10px rgba(0,0,0,0.14)",
                  zIndex: isMoving ? 10 : 1,
                }}
              >
                {!isEmpty && (
                  <span
                    style={{
                      fontSize: 54,
                      fontWeight: 900,
                      color: color!.text,
                      fontFamily:
                        "system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {tileVal}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </AbsoluteFill>
  );
};
