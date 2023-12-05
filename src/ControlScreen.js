
const CustomComponent = ({ onPlay, title, subtitle, btnText, difficulty, onDifficultyChange }) => {

    return (
        <div className="bg-blur text-center text-light p-4 border border-3 rounded-4 m-auto"  style={{ width: 500, minHeight: 300 }}>
            <h4 className="fs-3 text-light mx-auto">{title}</h4>
            <p className='fs-5 my-3'>{subtitle}</p>
            <div className='row mt-5'>
                <div className="col-4">
                    <select 
                        className="form-control fs-5 text-center" 
                        id="opciones" 
                        name="opciones"
                        // value={difficulty}
                        onChange={onDifficultyChange}
                    >
                        <option value="facil">Facil</option>
                        <option value="normal">Medio</option>
                        <option value="dificil">Dificil</option>
                    </select>
                </div>
                <div className='col-8'>
                    <button type="button" className="btn btn-danger fs-5 w-100" onClick={onPlay}>
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomComponent;
