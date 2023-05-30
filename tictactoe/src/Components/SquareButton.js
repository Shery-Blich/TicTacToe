export function Square({ value, onSquareClick, highlight }) {
    return (
        <button className={highlight ? "highlight" : "square"} onClick={onSquareClick}>
            {value}
        </button>
    );
}