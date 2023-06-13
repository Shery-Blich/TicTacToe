import {Square} from "./Square";


// replace lastClickedElement, you can pass setState for clickpoint in game
export let lastClickedElement = {row: -1, col: -1};

// use consts and default export instead of function?
// most used case is using default export for componenets so it;s neccasery
export function Board({ xIsNext, squares, onPlay, finishedMoves}) {
    const winnerData = calculateWinner(squares);
    const winner = winnerData?.winner;
    const winningLine = winnerData?.winningLine;

    function handleClick(squareIndex) {
        lastClickedElement = {row: Math.floor(squareIndex / 3), col: (squareIndex % 3)};

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[squareIndex] = "X";
        } else {
            nextSquares[squareIndex] = "O";
        }
        onPlay(nextSquares);
    }


    // best practice for logic inside react components?
    // should be only events, funcs and effects
    // can tie to use effect?
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else  if (finishedMoves) {
        status = "Tie";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    // better way to use for in javascript?
    // lodash
    // put 3 in const
    const board = [];
    for (let i = 0; i < 3; i++) {
        const squaresInRow = [];
        for (let j = 0; j < 3; j++) {
            const squareIndex = i * 3 + j;
            squaresInRow.push(
                <Square
                    key={squareIndex}
                    value={squares[squareIndex]}
                    onSquareClick={() => handleClick(squareIndex)}
                    highlight={winner && winningLine.includes(squareIndex)}
                    isGameOver={winner || finishedMoves}
                />
            );
        }
        board.push(
            <div key={i} className="board-row">
                {squaresInRow}
            </div>
        );
    }

    return (
        <>
            <div className="status">{status}</div>
            {board}
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winner: squares[a], winningLine: lines[i]};
        }
    }
    return null;
}