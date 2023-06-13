export function Square({ value, onSquareClick, highlight, isGameOver }) {
    // Learn about styled components
    return (
        <button disabled={isGameOver || value} className={highlight ? "highlight" : "square"} onClick={onSquareClick}>
            {value}
        </button>
    );
}