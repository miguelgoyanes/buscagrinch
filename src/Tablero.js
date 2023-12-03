import Celda from './Celda.js'
import Tiempo from './Tiempo.js'
import './App.css';
import { useEffect, useState } from 'react';
import AdjacentElements from './helpers/AdjacentElements.js';
import VictoryScreen from './VictoryScreen.js';

function Tablero({board, arrayPlaceMines, tamañoTablero}) {

    // Definir State
    const [boardJugando, setBoardJugando] = useState(() => {
        return Array(tamañoTablero).fill().map(() => Array(tamañoTablero).fill("oc"));
    });
    const [celdasVistas, setCeldasVistas] = useState([])
    const [listCeldasPorComprobar, setListCeldasPorComprobar] = useState([])
    const [victoryScreen, setVictoryScreen] = useState({
        show: true,
        title: 'Comenzar Partida',
        subtitle: 'Te atreves a jugar ?',
        btnText: 'Jugar'
        // time: null
    })
    const [running, setRunning] = useState(false);



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

        if (valoresNuevos[row][col] === 'M') {
            // mostrar todo
            setBoardJugando(board)

            // parar cronometro
            setRunning(false)

            setVictoryScreen({
                show: true, 
                title: '¡Has Perdido!',
                subtitle: 'Has pisado una mina, prueba otra vez',
                btnText: 'Volver a Jugar'
            })
        }
        
        let copiaCeldasVistas = celdasVistas.slice();
        if (!copiaCeldasVistas.some(([r, c]) => r === row && c === col)) {
            copiaCeldasVistas.push([row, col]);
            setCeldasVistas(copiaCeldasVistas);
        }

        if (valoresNuevos[row][col] === 0) {
            // aqui calcular los adkacentrs elements y meterlos en listaCelsasporcomproba
            const adjacentsElements = AdjacentElements(row, col, tamañoTablero, copiaCeldasVistas)

            let set1 = new Set(listCeldasPorComprobar.map(JSON.stringify));
            let set2 = new Set(adjacentsElements.map(JSON.stringify));
            // Unir los conjuntos
            let resultado = Array.from(new Set([...set1, ...set2].map(JSON.parse)));
            // eliminar resultados que esten en celdasvistas
            resultado = resultado.filter(item => !copiaCeldasVistas.some(subItem => JSON.stringify(subItem) === JSON.stringify(item)));

            setListCeldasPorComprobar(resultado)
        }
    }

    const handleWinCondition = () => {
        // Lógica para verificar la condición de victoria
        setVictoryScreen({...victoryScreen, show: true});
    };

    const startGame = () => {
        setVictoryScreen({...victoryScreen, show: false})
        setRunning(true)
    }


    return (
        <div className="grid bg-success py-2 px-4 rounded-3 m-0">
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
                                        <div className="col-auto p-0" key={`${indrow}${indcol}`}><Celda valor={val} onCeldaClick={() => mostrarValor(indrow, indcol)} /></div>
                                    )
                                )
                            )
                        }
                    </div>
                </div>
            </div>
            <VictoryScreen
                show={victoryScreen.show}
                onPlay={() => startGame()}
                title={victoryScreen.title}
                subtitle={victoryScreen.subtitle}
                btnText={victoryScreen.btnText}
            />
        </div>
    );
}

export default Tablero;