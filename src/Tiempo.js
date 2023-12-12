import { useEffect, useState } from "react";

export default function Tiempo({ running, bandera, onBanderaClick, onRestart }) {
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        let interval

        if (running) {
            interval = setInterval(() => {
                if (seconds === 59) {
                    setMinutes((prevMinutes) => prevMinutes + 1)
                    setSeconds(0)
                } else {
                    setSeconds((prevSeconds) => prevSeconds + 1)
                }
            }, 1000)
        } else {
            clearInterval(interval)
        }

        return () => {
            clearInterval(interval)
        }
    }, [running, seconds])

    return (
        <>
            <div className='lcdText bg-light text-danger rounded-pill m-2' style={{ width: 128 }}>
                {minutes}:{seconds}
            </div>
            
            <button 
                className={`p-0 border-0 bg-transparent`}
                onClick={onRestart}
            >
                <div className='align-self-center bg-light rounded-pill m-2' style={{ width: 64 }}>
                <img src="grinch.png" style={{ width: 54 }} alt="acierto" />
            </div>
            </button>
            
            <button 
                className={`p-0 border-0 bg-transparent ${bandera.state ? "text-light" : "text-danger"}`}
                onClick={onBanderaClick}
            >
                <div className={`d-flex align-items-center justify-content-center rounded-pill m-2 ${bandera.state ? "bg-success" : "bg-light"}`} style={{ width: 128 }}>
                        <span className='lcdText bg-transparent me-1'>
                            {bandera.nBanderas}
                        </span>
                        <img src="campana.png" style={{ width: 34 }} alt="acierto" />
                        {/* <i className="bi bi-tree-fill fs-2"></i> */}
                </div>
            </button>
        </>
    )
}
