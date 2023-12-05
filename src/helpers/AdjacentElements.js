
// Función para contar minas adyacentes
function AdjacentElements(row, col, rows, cols, celdasVistas) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ]

    let adjacentsElements = []
    // evaluamos cada direccion cercana a la que tenemos
    for (const [dx, dy] of directions) {
        const newRow = row + dx
        const newCol = col + dy

        // si la direccion existe y tiene una M contamos una mas
        if (newRow >= 0 
            && newRow < rows 
            && newCol >= 0 
            && newCol < cols) {
                // asi comprobamos si la celda ya esta en celdasVistas
                if (!celdasVistas.some(cell => JSON.stringify(cell) === JSON.stringify([newRow, newCol]))) {
                    adjacentsElements.push([newRow, newCol])
                }                
        }
    }

    return adjacentsElements
}

export default AdjacentElements