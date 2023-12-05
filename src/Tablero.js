import Celda from './Celda.js'
import Tiempo from './Tiempo.js'
import './App.css';
import { useEffect, useState } from 'react';
import AdjacentElements from './helpers/AdjacentElements.js';

function Tablero({board, arrayPlaceMines, running, actualizarRunning, controlSreen, actualizarControlScreen, difficulty}) {

    // Definir State
    const [boardJugando, setBoardJugando] = useState(() => {
        return Array(difficulty.row).fill().map(() => Array(difficulty.col).fill("oc"));
    });
    const [celdasVistas, setCeldasVistas] = useState([])
    const [listCeldasPorComprobar, setListCeldasPorComprobar] = useState([])



    useEffect(() => {
        if (listCeldasPorComprobar.length > 0) {
            listCeldasPorComprobar.map((element) => {
                mostrarValor(element[0], element[1])
            })
        }
    }, [listCeldasPorComprobar]);



    // Funcion que cambia el valor de una celda
    const mostrarValor = (row, col) => {
        let valoresNuevos = boardJugando.slice()   // buena practica trabajar sobre una copia
        valoresNuevos[row][col] = board[row][col]
        setBoardJugando(valoresNuevos)

        // Comprobar si has perdido
        comprobarEliminar(valoresNuevos, row, col)
        
        let copiaCeldasVistas = celdasVistas.slice();
        if (!copiaCeldasVistas.some(item => JSON.stringify(item) === JSON.stringify([row, col]))) {
            copiaCeldasVistas.push([row, col]);
            setCeldasVistas(copiaCeldasVistas);
        }
        console.log([row, col], copiaCeldasVistas)

        // Comprovar si has clicado en un 0 que tenga hermanos 0
        comprobarSiClick0ConHermanos(copiaCeldasVistas, valoresNuevos, row, col)

        comprobarGanar(valoresNuevos)
    }

    const comprobarEliminar = (valoresNuevos, row, col) => {
        if (valoresNuevos[row][col] === 'M') {
            setTimeout(() => {
                actualizarControlScreen({
                    show: true, 
                    title: '¡Has Perdido!',
                    subtitle: 'Has pisado una mina, prueba otra vez',
                    btnText: 'Volver a Jugar'
                })
            }, 3000);
            
            setBoardJugando(board)
            actualizarRunning(false)
        }
    }

    const comprobarSiClick0ConHermanos = (copiaCeldasVistas, valoresNuevos, row, col) => {
        if (valoresNuevos[row][col] === 0) {
            const adjacentsElements = AdjacentElements(row, col, difficulty.row, difficulty.col, copiaCeldasVistas)

            let set1 = new Set(listCeldasPorComprobar.map(JSON.stringify));
            let set2 = new Set(adjacentsElements.map(JSON.stringify));
            let resultado = Array.from(new Set([...set1, ...set2].map(JSON.parse)));
            // eliminar resultados que esten en celdasvistas
            resultado = resultado.filter(item => !copiaCeldasVistas.some(subItem => JSON.stringify(subItem) === JSON.stringify(item)));

            setListCeldasPorComprobar(resultado)
        }
    }

    const comprobarGanar = () => {
        // console.log(difficulty.row * difficulty.col - difficulty.mines)
        if (celdasVistas.length == difficulty.row * difficulty.col - difficulty.mines) {
            setTimeout(() => {
                actualizarControlScreen({
                    show: true, 
                    title: '¡Has Ganado!',
                    subtitle: `Felicidades, has conseguido abrir todos los regalos sin encontrarte al Grinch en la dificultad ${difficulty.name}`,
                    btnText: 'Volver a Jugar'
                })
            }, 3000);
            
            actualizarRunning(false)
        }
    };



    return (
        <div className="grid bg-blur text-center p-4 border border-3 rounded-5 m-auto" style={{ width: 60*difficulty.col + 50 }}>
            <div className="row ">
                <div className="d-flex flex-wrap justify-content-around">
                    <Tiempo running={running}/>
                </div>
            </div>
            <div className="row text-center justify-content-center">
                <div className="col my-1 p-0">
                    <div className="d-flex flex-wrap justify-content-center">
                        {
                            boardJugando && (
                                boardJugando.map((row, indrow) =>
                                    row.map((val, indcol) =>
                                        <div className="col-auto p-0" key={`${indrow}${indcol}`}>
                                            <Celda valor={val} onCeldaClick={() => mostrarValor(indrow, indcol)} />
                                        </div>
                                    )
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tablero;