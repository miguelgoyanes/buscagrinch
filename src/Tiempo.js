import { useEffect, useState } from "react";

export default function Tiempo({ running }) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => {
                if (seconds === 59) {
                    setMinutes((prevMinutes) => prevMinutes + 1);
                    setSeconds(0);
                } else {
                    setSeconds((prevSeconds) => prevSeconds + 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [running, seconds]);

    return (
        <>
            <div className='lcdText bg-light text-danger rounded-pill m-2' style={{ width: 64 }}>
                {minutes}
            </div>
            <div className='align-self-center bg-light rounded-pill m-2'>
                <img src="grinch.png" style={{ width: 54 }} alt="acierto" />
            </div>
            <div className='lcdText bg-light text-danger rounded-pill m-2' style={{ width: 64 }}>
                {seconds}
            </div>
        </>
    );
}
