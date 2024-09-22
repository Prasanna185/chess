"use client";

import { Chess, ChessInstance, Square } from "chess.js";
import React, { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
  User,
} from "@nextui-org/react";

import Engine from "@/config/engine";

export const ChessBoard: React.FC = () => {
  const levels = {
    "Easy 🤓": 2,
    "Medium 🧐": 8,
    "Hard 😵": 18,
  };
  const engine = useMemo(() => new Engine(), []);
  const game = useMemo<ChessInstance>(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [stockfishLevel, setStockfishLevel] = useState(2);

  const findBestMove = () => {
    engine.evaluatePosition(game.fen(), stockfishLevel);
    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        // In latest chess.js versions you can just write ```game.move(bestMove)```
        game.move({
          from: bestMove.substring(0, 2) as Square,
          to: bestMove.substring(2, 4) as Square,
          promotion: bestMove.substring(4, 5) as any,
        });
        setGamePosition(game.fen());
      }
    });
  };

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: any) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    setGamePosition(game.fen());

    // illegal move
    if (move === null) return false;

    // exit if the game is over
    if (game.game_over() || game.in_draw()) return false;
    findBestMove();

    return true;
  };

  return (
    <>
      <User
        avatarProps={{
          src: "/assets/stock-fish.jpeg",
          isBordered: true,
          size: "sm",
        }}
        name="Computer"
      />

      <Chessboard
        animationDuration={300}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        id="PlayVsStockfish"
        position={gamePosition}
        onPieceDrop={onDrop}
      />

      <div className="flex items-center justify-between">
        <User
          avatarProps={{
            isBordered: true,
            size: "sm",
            showFallback: true,
          }}
          name="It's You"
        />
        <ButtonGroup size="sm" variant="bordered">
          <Button
            onPress={() => {
              game.reset();
              setGamePosition(game.fen());
            }}
          >
            New game
          </Button>
          <Button
            onPress={() => {
              game.undo();
              game.undo();
              setGamePosition(game.fen());
            }}
          >
            Undo
          </Button>
        </ButtonGroup>
      </div>
      <RadioGroup
        className="mx-auto"
        orientation="horizontal"
        value={`${stockfishLevel}`}
        onValueChange={(value) => setStockfishLevel(Number(value))}
      >
        {Object.entries(levels).map(([level, depth]) => (
          <Radio key={level} size="sm" value={`${depth}`}>
            {level}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};
