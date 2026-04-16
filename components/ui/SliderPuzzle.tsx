"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["#1B2B6B", "#F5C842", "#4AAD52", "#E8623A"];
const TEXT_COLORS = ["#ffffff", "#1A1A18", "#ffffff", "#ffffff"];

function tileColor(n: number) { return COLORS[Math.floor((n - 1) / 4)]; }
function tileText(n: number) { return TEXT_COLORS[Math.floor((n - 1) / 4)]; }

function countInversions(tiles: number[]): number {
  const arr = tiles.filter((t) => t !== 0);
  let count = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) count++;
  return count;
}

function isSolvable(tiles: number[]): boolean {
  const inv = countInversions(tiles);
  const emptyRowFromBottom = 4 - Math.floor(tiles.indexOf(0) / 4);
  return emptyRowFromBottom % 2 === 0 ? inv % 2 === 1 : inv % 2 === 0;
}

function createShuffle(): number[] {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (!isSolvable(arr)) {
    const i1 = arr.findIndex((t) => t !== 0);
    const i2 = arr.findIndex((t, i) => t !== 0 && i !== i1);
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
  }
  return arr;
}

const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

export function SliderPuzzle() {
  const [tiles, setTiles] = useState<number[]>(() => createShuffle());
  const [moves, setMoves] = useState(0);

  const solved = tiles.every((t, i) => t === SOLVED[i]);

  const handleClick = useCallback(
    (index: number) => {
      if (solved) return;
      const emptyIdx = tiles.indexOf(0);
      if (tiles[index] === 0) return;
      const row = Math.floor(index / 4);
      const col = index % 4;
      const eRow = Math.floor(emptyIdx / 4);
      const eCol = emptyIdx % 4;
      const adjacent =
        (row === eRow && Math.abs(col - eCol) === 1) ||
        (col === eCol && Math.abs(row - eRow) === 1);
      if (!adjacent) return;
      const next = [...tiles];
      [next[index], next[emptyIdx]] = [next[emptyIdx], next[index]];
      setTiles(next);
      setMoves((m) => m + 1);
    },
    [tiles, solved]
  );

  const reset = () => {
    setTiles(createShuffle());
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none w-full max-w-[420px] mx-auto">
      {/* Tablero */}
      <div className="w-full bg-[#1A1A18] p-3 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-4 gap-2">
          {tiles.map((tile, index) =>
            tile === 0 ? (
              <div key="empty" className="aspect-square rounded-xl" />
            ) : (
              <motion.button
                key={tile}
                layoutId={`tile-${tile}`}
                layout
                onClick={() => handleClick(index)}
                className="aspect-square rounded-xl flex items-center justify-center font-extrabold text-[clamp(1rem,3vw,1.75rem)] cursor-pointer focus:outline-none"
                style={{
                  backgroundColor: tileColor(tile),
                  color: tileText(tile),
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {tile}
              </motion.button>
            )
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between w-full px-1">
        <span className="text-sm text-neutral-500 font-medium">
          {moves} {moves === 1 ? "movimiento" : "movimientos"}
        </span>
        <button
          onClick={reset}
          className="text-xs font-semibold text-primary hover:text-secondary transition-colors underline underline-offset-4"
        >
          Nuevo juego
        </button>
      </div>

      {/* Mensaje de victoria */}
      <AnimatePresence>
        {solved && moves > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="font-extrabold text-primary text-lg">
              ¡Lo lograste en {moves} movimientos!
            </p>
            <button
              onClick={reset}
              className="mt-2 text-sm text-secondary font-semibold underline underline-offset-4"
            >
              Jugar de nuevo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
