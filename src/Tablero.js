import Celda from './Celda.js'
import Tiempo from './Tiempo.js'
import './App.css';
import { useEffect, useRef, useState } from 'react';
import AdjacentElements from './helpers/AdjacentElements.js';

function Tablero({ board, running, actualizarRunning, actualizarControlScreen, difficulty }) {

    // Definir State
    const [boardJugando, setBoardJugando] = useState(() => {
        return Array(difficulty.row).fill().map(() => Array(difficulty.col).fill("oc"))
    })
    const [celdasVistas, setCeldasVistas] = useState([])
    const [bandera, setBandera] = useState({
        nBanderas: difficulty.mines,
        state: false
    })

    // Definir Ref
    // esto lo podemos usar para contar sin los problemas que nos da el useState al ejecutarlo en un for
    const contadorCeldasVistas = useRef(0);

    useEffect(() => {
        comprobarGanar()
        console.log(contadorCeldasVistas)
    }, [contadorCeldasVistas])

    //* LOGICA JUEGO
    // comprueba si el elemento clickado es 0 o otro
    const comprobarSiClick0ConHermanos = (row, col) => {
        if (board[row][col] === 0) {
            let listCeldasPorComprobar = []
            listCeldasPorComprobar = adjacentesSi0(row, col, listCeldasPorComprobar)
            dispersionHermanos0(listCeldasPorComprobar)
        } else {
            let valoresNuevos = mostrarValor(row, col)

            // Comprobar si has perdido
            comprobarPerder(valoresNuevos, row, col)  //? podriamos probar a hacerlo directamente con boardjugano pero creo qeu daria problemas

            // metemos esta celda en celdasVistas
            let copiaCeldasVistas = celdasVistas.slice()
            if (!copiaCeldasVistas.some(item => JSON.stringify(item) === JSON.stringify([row, col]))) {
                copiaCeldasVistas.push([row, col])
                setCeldasVistas(copiaCeldasVistas)
            }
        }
    }

    // calcular la lista de celdas que hay que mostrar si son hermanas de 0
    const dispersionHermanos0 = (listCeldasPorComprobar) => {
        let copiaListCeldasPorComprobar = [...listCeldasPorComprobar];

        for (let i = 0; i < copiaListCeldasPorComprobar.length; i++) {
            const [row, col] = copiaListCeldasPorComprobar[i];
            let resultado = adjacentesSi0(row, col, copiaListCeldasPorComprobar)

            if (resultado !== undefined && Array.isArray(resultado)) {
                for (let j = 0; j < resultado.length; j++) {
                    copiaListCeldasPorComprobar.push(resultado[j])
                }
            }
        }
        // meter dichos elementos en celdas vistas
        setCeldasVistas([...celdasVistas, ...copiaListCeldasPorComprobar])
        let numeroBanderas = 0
        // mostrar todos los elementos
        copiaListCeldasPorComprobar.forEach(([row, col]) => {
            // devolver las banderas que se quiten a la cuenta
            if (boardJugando[row][col] === "?") {
                numeroBanderas += 1
            }
            // mostrar valores
            mostrarValor(row, col)
        })
        setBandera({...bandera, nBanderas: bandera.nBanderas + numeroBanderas})
    }

    // si elemento es 0 calculamos los elementos adjacentes y incorporamos a listCeldasPorComprobar
    const adjacentesSi0 = (row, col, listCeldasPorComprobar) => {
        if (board[row][col] === 0) {
            const adjacentsElements = AdjacentElements(row, col, difficulty.row, difficulty.col)
            adjacentsElements.push([row, col])
            let resultado = adjacentsElements.filter(adjacent => !listCeldasPorComprobar.some(cell => cell[0] === adjacent[0] && cell[1] === adjacent[1]))
            console.log(resultado)
            return resultado
        }
    }

    // funcion que muestra el valor de una celda
    const mostrarValor = (row, col) => {
        contadorCeldasVistas.current += 1;
        console.log(contadorCeldasVistas)

        let valoresNuevos = boardJugando.slice()
        valoresNuevos[row][col] = board[row][col]
        setBoardJugando(valoresNuevos)
        return valoresNuevos //? esto lo devolvemos por aqui porque setBoardJugando puede tardar
    }

    // comprobar si perdio y manejar lo que toca
    const comprobarPerder = (valoresNuevos, row, col) => {
        if (valoresNuevos[row][col] === 'M') {
            setTimeout(() => {
                actualizarControlScreen({
                    show: true,
                    title: '¡Has Perdido!',
                    subtitle: 'Te has encontrado al Grinch y te ha estropeado la navidad, prueba otra vez',
                    btnText: 'Volver a Jugar'
                })
            }, 3000)

            setBoardJugando(board)
            actualizarRunning(false)
        }
    }

    // comprobar si gano y manejar lo que toca
    const comprobarGanar = () => {
        // todo comprobar esto contando las veces que comprueba perder y no pierde
        // if (celdasVistas.length == difficulty.row * difficulty.col - difficulty.mines) {
        if (contadorCeldasVistas.current == difficulty.row * difficulty.col - difficulty.mines) {
            actualizarControlScreen({
                show: true, 
                title: '¡Has Ganado!',
                subtitle: `Felicidades, has conseguido abrir todos los regalos sin encontrarte al Grinch en la dificultad ${difficulty.name}`,
                btnText: 'Volver a Jugar'
            })

            actualizarRunning(false)
        }
    }

    //* OTRA LOGICA
    // gestionar click en elemento
    const clickEnCelda = (row, col) => {
        let valoresNuevos = boardJugando.slice()
        if (bandera.state) {
            if (bandera.nBanderas > 0) {
                if (valoresNuevos[row][col] === "?") {
                    valoresNuevos[row][col] = "oc"
                    setBandera({...bandera, nBanderas: bandera.nBanderas + 1})
                } else {
                    valoresNuevos[row][col] = "?"
                    setBandera({...bandera, nBanderas: bandera.nBanderas - 1})
                }
                setBoardJugando(valoresNuevos)
            }
        } else {
            if (valoresNuevos[row][col] === "?") {
                setBandera({...bandera, nBanderas: bandera.nBanderas + 1})
            }
            comprobarSiClick0ConHermanos(row, col)
        }
    }

    
    // gestionar click en restart
    const clickEnRestart = () => {
        actualizarControlScreen({
            show: true, 
            title: '¿Te has dado por vencido?',
            subtitle: 'Vuelve a intentarlo, !!Se que tu puedes!!',
            btnText: 'Volver a Jugar'
        })

        actualizarRunning(false)
    }
    
    return (
        <div className="grid bg-blur text-center p-4 border border-3 rounded-5 m-auto shadow" style={{ width: 60 * difficulty.col + 50 }}>
            <div className="row ">
                <div className="d-flex flex-wrap justify-content-around">
                    <Tiempo 
                        running={running}
                        bandera={bandera}
                        onBanderaClick={() => setBandera({...bandera, state: !bandera.state})}
                        onRestart={clickEnRestart}
                    />
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
                                            <Celda 
                                                valor={val} 
                                                onCeldaClick={() => clickEnCelda(indrow, indcol)} 
                                            />
                                        </div>
                                    )
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tablero;