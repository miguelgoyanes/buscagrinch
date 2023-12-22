function Intrucciones({ show, onClose }) {
    return (
        <>
            <div
                className={`modal mt-5 ${show ? "show" : ""}`}
                style={{ display: show ? "block" : "none" }}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Instrucciones</h4>
                        </div>
                        <div className="modal-body justifyText">
                            <p>
                                <strong>Regalos y el Grinch:</strong> En lugar de casillas,
                                tendrás una cuadrícula de regalos. La mayoría de los regalos
                                contienen sorpresas agradables, pero algunos esconden al Grinch.
                                Tu objetivo es abrir todos los regalos sin encontrar a ningun
                                Grinch.
                            </p>
                            <p>
                                <strong>Números en los regalos:</strong> Al igual que en el
                                buscaminas clásico, los regalos tendrán números que indicarán
                                cuántos Grinches están en los regalos adyacentes. Esto te
                                ayudará a saber qué regalos evitar.
                            </p>
                            <p>
                                <strong>La Campana de Navidad:</strong> Esta será tu aliada. Si
                                haces clic en la Campana de Navidad, podrás marcar los regalos
                                sospechosos con pequeñas campanas navideñas para recordar dónde
                                podrían estar los Grinches. Tendrás tantas campanas como Grinch
                                haya escondidos.
                            </p>
                            <p>
                                <strong>Evita al Grinch:</strong> Si abres un regalo y
                                encuentras al Grinch, ¡perderás el juego! Sin embargo, si logras
                                abrir todos los regalos sin encontrar al Grinch, ¡habrás ganado
                                y salvado la Navidad!
                            </p>
                            <p>
                                <strong>Estrategia:</strong> Usa la información de los números
                                en los regalos para tomar decisiones. Empieza por abrir los
                                regalos que tienen menos regalos adyacentes, ya que tienen menos
                                probabilidades de esconder al Grinch.
                            </p>
                            <p>
                                <strong>Tiempo:</strong> El tiempo es simplemente un indicador
                                de tu progreso. No hay un límite de tiempo establecido, así que
                                tómate tu tiempo para resolver el desafío.
                            </p>
                            <p>
                                <strong>Dificultades:</strong> Hay tres niveles de dificultad
                                para este juego. Podrás elegir entre fácil, medio o difícil al
                                comenzar, lo que afectará la cantidad de regalos y la cantidad
                                de Grinches escondidos.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`modal-backdrop ${show ? "show" : ""}`}
                style={{ display: show ? "block" : "none" }}
            ></div>
        </>
    )
}

export default Intrucciones;
