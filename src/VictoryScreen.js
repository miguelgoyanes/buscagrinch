import React from 'react';

const VictoryScreen = ({ show, onPlay, title, subtitle, btnText }) => {
    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header text-bg-danger">
                        <h5 className="modal-title mx-auto">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <p className='fs-5'>{subtitle}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger mx-auto" onClick={onPlay}>
                            {btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VictoryScreen;
