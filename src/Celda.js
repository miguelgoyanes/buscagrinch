function Celda({ valor, onCeldaClick }) {

    return (
        <div>
            <button 
                className="border-0 rounded-circle p-0 fs-2 fw-bold text-danger"
                style={{ width: 60, height: 60 }}
                onClick={onCeldaClick}
            >
                {
                    valor === "oc" ?
                        <img 
                            src="./regalo.png" 
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
