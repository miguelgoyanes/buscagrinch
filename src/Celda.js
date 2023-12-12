function Celda({ valor, onCeldaClick }) {

    let valorComponente
    let sePuedeClick = false
    
    switch (valor) {
        case 'oc':
            valorComponente = <img
                src="./regalo2.png"
                style={{ width: 40, display: 'block', margin: 'auto' }}
                alt="Regalo"
            />
            sePuedeClick = true
            break;
        case 0:
            valorComponente = "\u00A0"
            break;
        case 'M':
            valorComponente = <img
                src="./grinch.png"
                style={{ width: 40, display: 'block', margin: 'auto' }}
                alt="Grinch"
            />
            sePuedeClick = true
            break;
        case '?':
            // valorComponente = <i className="bi bi-tree-fill fs-2 text-success"></i>
            valorComponente = <img
                src="./campana.png"
                style={{ width: 40, display: 'block', margin: 'auto' }}
                alt="Grinch"
            />
            sePuedeClick = true
            break;
        default:
            valorComponente = valor
    }

    return (
        <div>
            <button
                className="border-0 rounded p-0 m-1 fs-2 fw-bold text-light bg-transparent"
                style={{ width: 50, height: 50 }}
                onClick={sePuedeClick ? onCeldaClick : null}
            >
                {
                    valorComponente
                }
            </button>
        </div>
    )
}

export default Celda;
