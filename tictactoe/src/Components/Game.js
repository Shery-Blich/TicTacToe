import {Board} from "./Board";
import {useState} from "react";
import {lastClickedElement} from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [isDesc, setIsDesc] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [clickPoints, setClickPoint] = useState([]);
    function handlePlay(nextSquares) {
        const nextClickPoint = [...clickPoints.slice(0,currentMove + 1), lastClickedElement]
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setClickPoint(nextClickPoint);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    let moves = history.map((squares, move) => {
        let description;
        if(move === 0) {
            description = 'Go to game start';
        }
        else {
            description = `Go to move #${move}, row:${clickPoints[move-1].row},col:${clickPoints[move-1]?.col}`;
        }

        return (
            <li key={move}>
                <button className="button" onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
     function handleToggle() {
            setIsDesc(!isDesc);
     }

    if (!isDesc) {
        moves = moves.slice().reverse();
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} finishedMoves={moves.length === 10} />
            </div>
            <div className="game-info">
                <button onClick={handleToggle} className="button">Sorting by:{isDesc ? "Desc" : "ASC"}</button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}