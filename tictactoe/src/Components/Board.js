import {Square} from "./SquareButton";

export let lastClickedElement = {row: -1, col: -1};

export function Board({ xIsNext, squares, onPlay, finishedMoves}) {
    function handleClick(i) {
        lastClickedElement = {row: Math.floor(i/3),col: (i%3)};

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winnerData = calculateWinner(squares);
    const winner = winnerData?.winner;
    const winningLine = winnerData?.winningLine;

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else  if (finishedMoves) {
        status = "Tie";
    }
        else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

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