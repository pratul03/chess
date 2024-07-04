import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  chess,
  setBoard,
  board,
  socket,
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  return (
    <div className="text-2xl">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRep = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRep);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: { from, to: squareRep },
                          },
                        })
                      );
                      setFrom(null);
                      chess.move({
                        from,
                        to: squareRep,
                      });
                      setBoard(chess.board());
                      console.log({ from, to: squareRep });
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 flex justify-center font-bold text-xl items-center  ${
                    (i + j) % 2 === 0
                      ? "bg-slate-300 opacity-70"
                      : "bg-slate-700 opacity-80"
                  }`}
                >
                  {square ? square.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
