const CalcularNuevaPartida = (tamañoTablero, numMines) => {

    // Crear una matriz 5x5 para representar el campo de juego
    const rows = tamañoTablero;
    const cols = tamañoTablero;
    let board = Array(rows)
        .fill(0)
        .map(() => Array(cols).fill(0));

    // Función para colocar minas aleatoriamente
    function placeMines(board, numMines) {
        let minesPlaced = 0;
        let arrayPlaceMines = []
        while (minesPlaced < numMines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (board[row][col] !== 'M') {
                board[row][col] = 'M';
                minesPlaced++;
                arrayPlaceMines.push([row], [col])
            }
        }
        return arrayPlaceMines
    }

    // Función para contar minas adyacentes
    function countAdjacentMines(board, row, col) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        let count = 0;
        // evaluamos cada direccion cercana a la que tenemos
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            // si la direccion existe y tiene una M contamos una mas
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (board[newRow][newCol] === 'M') {
                    count++;
                }
            }
        }

        return count;
    }

    // Colocar 5 minas aleatoriamente en el tablero
    // const numMines = 5;
    const arrayPlaceMines = placeMines(board, numMines);

    // Calcular el número de minas adyacentes para cada celda
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] !== 'M') {
                const minesCount = countAdjacentMines(board, i, j);
                if (minesCount > 0) {
                    board[i][j] = minesCount;
                }
            }
        }
    }

    return [board, arrayPlaceMines]
}

export default CalcularNuevaPartida