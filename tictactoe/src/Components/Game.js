import {Board} from "./Board";
import {useState} from "react";
import {lastClickedElement} from "./Board";

// fix handlePlay remove usless slice?
// add const for default state of history
// add spaces, AFTER FUNNCTION, BEFORE IFS

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [shouldSortDescending, setShouldSortDescending] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);
    // "1" == 1 => TRUE
    // "1" === 1 => FALSE
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

    // FIX NAMING FOR ISDESC
     function handleToggle() {
         // Always do this for sets dependent on previous values
         // best practice for this situation :)
            setShouldSortDescending(prevValue => !prevValue);
     }

    if (!shouldSortDescending) {
        moves = moves.slice().reverse();
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} finishedMoves={currentMove === 9} />
            </div>
            <div className="game-info">
                <button onClick={handleToggle} className="button">Sorting by:{shouldSortDescending ? "DESC" : "ASC"}</button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}