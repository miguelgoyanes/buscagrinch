function Celda({ valor, onCeldaClick }) {

    return (
        <div>
            <button 
                className="border-0 rounded p-0 m-1 fs-2 fw-bold text-light bg-transparent"
                style={{ width: 50, height: 50 }}
                onClick={onCeldaClick}
            >
                {
                    valor === "oc" ?
                        <img 
                            src="./regalo2.png" 
                            style={{ width: 40, display: 'block', margin: 'auto' }}
                            alt="Regalo"
                        /> : 
                        valor === 0 ? 
                            "\u00A0" :
                            valor === 'M' ? 
                                <img 
                                    src="./grinch.png" 
                                    style={{ width: 40, display: 'block', margin: 'auto' }}
                                    alt="Grinch"
                                /> :
                                valor
                }
            </button>
        </div>
    );
}

export default Celda;
