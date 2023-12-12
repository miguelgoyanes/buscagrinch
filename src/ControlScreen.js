
const CustomComponent = ({ onPlay, title, subtitle, btnText, difficulty, onDifficultyChange, handleIntrucciones }) => {
    return (
        <div className="bg-blur text-center text-light p-4 border border-3 rounded-4 m-auto"  style={{ width: 500, minHeight: 300 }}>
            <h4 className="fs-3 text-light mx-auto my-3">{title}</h4>
            <p className='fs-5 my-4'>{subtitle}</p>
            <div className='row mt-5'>
                <div className='col-3 offset-1'>
                    <button type="button" className="btn btn-light fs-2 p-0 w-100" onClick={handleIntrucciones}>
                        <i className="bi bi-question"></i>
                    </button>
                </div>
                <div className="col-6 offset-1">
                    <select 
                        className="form-control fs-5 text-center h-100" 
                        id="opciones" 
                        name="opciones"
                        aria-label="Default select example"
                        onChange={onDifficultyChange}
                    >
                        <option value="facil">Facil</option>
                        <option value="medio">Medio</option>
                        <option value="dificil">Dificil</option>
                    </select>
                </div>
            </div>
            <div className='row mt-5'>
                    <button type="button" className="btn btn-danger fs-5 w-100 h-100" onClick={onPlay}>
                        {btnText}
                    </button>
            </div>
        </div>
    )
}

export default CustomComponent;
