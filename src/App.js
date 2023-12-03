import './App.css';
import { useEffect, useState } from 'react';
import CalcularNuevaPartida from './helpers/CalcularNuevaPartida.js';
import Tablero from './Tablero.js';

function App() {

  const tamañoTablero = 5

  // Definir State
  const [board, setBoard] = useState()
  const [arrayPlaceMines, setArrayPlaceMines] = useState()

  useEffect(() => {
    const [boardUpdate, arrayPlaceMinesUpdate] = CalcularNuevaPartida(tamañoTablero, 5)
    setBoard(boardUpdate)
    console.log(boardUpdate)
    setArrayPlaceMines(arrayPlaceMinesUpdate)
  }, []);


  // Funcion de despuesta al BTN
  const btnComenzar = () => {
    // setBoard(Array(5).fill(Array(5).fill(" ")))
  };

  return (
    <div className="container text-center"  style={{ width: 60*tamañoTablero + 50}}>
        <Tablero board={board} arrayPlaceMines={arrayPlaceMines} tamañoTablero={tamañoTablero}/>
        {/* <div><button className="btn btn-outline-secondary mt-2" onClick={btnComenzar}>COMIENZA LA PARTIDA</button></div> */}
    </div>
  );
}

export default App;