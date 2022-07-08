import React from 'react';

const PokemonStats = ({ pokemon }) => {
    return (
        <div className='pokemon-stats-container'>
            <h2>Pokemon Stats</h2>

            <div className="progress" id='progress_0'>
                <h6>Attack </h6>
                <div className="progress-bar">
                    <div className="processing"></div>
                </div>
                <p className='percent'>{pokemon.stats?.[1].base_stat}</p>
            </div>

            <div className="progress" id='progress_1'>
                <h6>Deffense </h6>
                <div className="progress-bar">
                    <div className="processing"></div>
                </div>
                <p className='percent'>{pokemon.stats?.[2].base_stat}</p>
            </div>

            <div className="progress" id='progress_2'>
                <h6>Speed </h6>
                <div className="progress-bar">
                    <div className="processing"></div>
                </div>
                <p className='percent'>{pokemon.stats?.[5].base_stat}</p>
            </div>

            <div className="progress" id='progress_3'>
                <h6>HP </h6>
                <div className="progress-bar">
                    <div className="processing"></div>
                </div>
                <p className='percent'>{pokemon.stats?.[0].base_stat}</p>
            </div>

            <div className="progress" id='progress_4'>
                <h6>Sp. att. </h6>
                <div className="progress-bar">
                    <div className="processing"></div>
                </div>
                <p className='percent'>{pokemon.stats?.[3].base_stat}</p>
            </div>

            <div className="progress" id='progress_5'>
                <h6>Sp. def. </h6>
                <div className="progress-bar">
                    <div className="processing"></div>
                </div>
                <p className='percent'>{pokemon.stats?.[4].base_stat}</p>
            </div>
        </div>
    );
};

export default PokemonStats;