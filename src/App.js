import "./App.css";
import { useState } from "react";
import CalcularNuevaPartida from './helpers/CalcularNuevaPartida.js';
import Tablero from "./Tablero.js";
import ControlScreen from "./ControlScreen.js";
import Instrucciones from "./Instrucciones.js";

function App() {
  // Definir State
  const [board, setBoard] = useState()
  const [controlSreen, setControlScreen] = useState({
    show: true,
    title: "Comenzar Partida",
    subtitle:
      "Tienes muchos regalos que abrir, pero cuidado!!!! hay muchos Grinch escondidos. Asegurate de que no te estrope la Navidad",
    btnText: "Jugar",
  })
  const [running, setRunning] = useState(false)
  const [difficulty, setDifficulty] = useState({
    name: "facil",
    row: 8,
    col: 8,
    mines: 8,
  })
  const [showIntrucciones, setShowIntrucciones] = useState(false)

  // CONTROL SCREAN
  // funcion que meneja la dificultad y el tamaño del tablero
  const handleDifficultyChange = (event) => {
    let row;
    let col;
    let mines;
    switch (event.target.value) {
      case "facil":
        row = 8;
        col = 8;
        mines = 8;
        break;
      case "medio":
        row = 8;
        col = 10;
        mines = 10;
        break;
      case "dificil":
        row = 8;
        col = 15;
        mines = 15;
        break;
      default:
        console.log("Dificultad no reconocida")
        break;
    }
    setDifficulty({
      row: row,
      col: col,
      mines: mines,
    })
  }

  // genera el tablero y pone todo en marcha
  const startGame = () => {
    setControlScreen({ ...controlSreen, show: false })
    setRunning(true)

    const boardUpdate = CalcularNuevaPartida(
      difficulty.row,
      difficulty.col,
      difficulty.mines
    )
    setBoard(boardUpdate)
  }

  const handleIntrucciones = () => {
    setShowIntrucciones(!showIntrucciones)
  }

  // TABLERO
  // maneja la pausa del cronometro
  const actualizarRunning = (valorRunning) => {
    setRunning(valorRunning)
  }

  // maneja los mensajes y valores de la pantalla de control
  const actualizarControlScreen = (valorControlScreen) => {
    setControlScreen(valorControlScreen)
  }

  return (
    <>
      {controlSreen.show ? (
        <ControlScreen
          onPlay={() => startGame()}
          title={controlSreen.title}
          subtitle={controlSreen.subtitle}
          btnText={controlSreen.btnText}
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          handleIntrucciones={handleIntrucciones}
        />
      ) : (
        <Tablero
          board={board}
          running={running}
          actualizarRunning={actualizarRunning}
          actualizarControlScreen={actualizarControlScreen}
          difficulty={difficulty}
        />
      )}

      <Instrucciones show={showIntrucciones} onClose={handleIntrucciones} />
    </>
  )
}

export default App;
