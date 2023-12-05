import './App.css';
import { useState } from 'react';
import CalcularNuevaPartida from './helpers/CalcularNuevaPartida.js';
import Tablero from './Tablero.js';
import ControlScreen from './ControlScreen.js';

function App() {

  // Definir State
  const [board, setBoard] = useState()
  const [arrayPlaceMines, setArrayPlaceMines] = useState()
  const [controlSreen, setControlScreen] = useState({
    show: true,
    title: 'Comenzar Partida',
    subtitle: 'Tienes muchos regalos que abrir, pero cuidado!!!! hay muchos grinch escondidos. Asegurate de que no te estrope la Navidad',
    btnText: 'Jugar'
    // time: null
  })
  const [running, setRunning] = useState(false);
  const [difficulty, setDifficulty] = useState({
    name: "facil",
    row: 7,
    col: 7,
    mines: 5
  })


  // CONTROL SCREAN
  const handleDifficultyChange = (event) => {
    let row
    let col
    let mines
    console.log(event.target.value)
    switch (event.target.value) {
      case "facil":
        row = 7
        col = 7
        mines = 5
        break;
      case "normal":
        row = 8
        col = 10
        mines = 10
        break;
      case "dificil":
        row = 8
        col = 15
        mines = 15
        break;
      default:
        console.log("Dificultad no reconocida");
        break;
    }
    setDifficulty({
      row: row,
      col: col,
      mines: mines
    });
  }
  
  const startGame = () => {
    setControlScreen({...controlSreen, show: false})
    setRunning(true)
    
    const [boardUpdate, arrayPlaceMinesUpdate] = CalcularNuevaPartida(difficulty.row, difficulty.col, difficulty.mines)
    setBoard(boardUpdate)
    console.log(boardUpdate)
    setArrayPlaceMines(arrayPlaceMinesUpdate)
  }

  // TABLERO
  const actualizarRunning = (valorRunning) => {
    setRunning(valorRunning)
  }

  const actualizarControlScreen = (valorRunning) => {
    setControlScreen(valorRunning)
  }

  return (
    <>
      {
        controlSreen.show ?
          <ControlScreen
            onPlay={() => startGame()}
            title={controlSreen.title}
            subtitle={controlSreen.subtitle}
            btnText={controlSreen.btnText}
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          /> :
            <Tablero 
              board={board} 
              arrayPlaceMines={arrayPlaceMines} 
              running={running}
              actualizarRunning={actualizarRunning}
              controlSreen={controlSreen}
              actualizarControlScreen={actualizarControlScreen}
              difficulty={difficulty}
            />
      }
    </>
  );
}

export default App;