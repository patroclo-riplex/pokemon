import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AboutPokemon from './AboutPokemon';
import Moves from './Moves';
import PokemonStats from './PokemonStats';
import '../styles/pokemondetail.css';
import { useNavigate } from 'react-router-dom';

const PokemonDetails = () => {

    const { id } = useParams();
    const [ pokemon, setPokemon ] = useState({});
    const navigate = useNavigate();

    const [ component, setComponent ] = useState(<AboutPokemon />);
    const [ showedComponent, setShowedComponent ] = useState('about');

    const [ background, setBackground ] = useState("");
    const [ types, setTypes ] = useState([]);

    useEffect(() => {
        switch (showedComponent) {
          case 'about':
            setComponent(<AboutPokemon pokemon={pokemon}/>);
            break;
          
          case 'stats':
            setComponent(<PokemonStats pokemon={pokemon}/>);
            break;
          
          default:
            setComponent(<Moves pokemon={pokemon}/>);
            break;
        }
      }, [ showedComponent, pokemon ]);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setPokemon(res.data)

                const filteredTypes = []
                for( let i = 0; i < res.data.types.length; i+=2) {
                    res.data.types.map(type => (
                        filteredTypes.push(type.type.name)
                    ))
                }
                setTypes(filteredTypes);

                if(res.data.types[0].type.name === 'normal') setBackground('#b89c7b')
                else if(res.data.types[0].type.name === 'fighting') setBackground('#ec1919')
                else if(res.data.types[0].type.name === 'flying') setBackground('#b378db')
                else if(res.data.types[0].type.name === 'poison') setBackground('#ae0fdf')
                else if(res.data.types[0].type.name === 'ground') setBackground('#d1c666')
                else if(res.data.types[0].type.name === 'rock') setBackground('#b3a425')
                else if(res.data.types[0].type.name === 'bug') setBackground('#98b827')
                else if(res.data.types[0].type.name === 'ghost') setBackground('#8a0fd1')
                else if(res.data.types[0].type.name === 'steel') setBackground('#7e7272')
                else if(res.data.types[0].type.name === 'fire') setBackground('#e9640c')
                else if(res.data.types[0].type.name === 'water') setBackground('#457591')
                else if(res.data.types[0].type.name === 'grass') setBackground('#49e785')
                else if(res.data.types[0].type.name === 'electric') setBackground('#f3de1d')
                else if(res.data.types[0].type.name === 'psychic') setBackground('#ec80da')
                else if(res.data.types[0].type.name === 'ice') setBackground('#79cac3')
                else if(res.data.types[0].type.name === 'dragon') setBackground('#512cda')
                else if(res.data.types[0].type.name === 'dark') setBackground('#524b0f')
                else if(res.data.types[0].type.name === 'fairy') setBackground('#f05ec4')
                else if(res.data.types[0].type.name === 'unknown') setBackground('#3a3037')
                else setBackground('#684a5f')
            })
    }, [ id ]);

    const styles = {
        background
    }

    return (
        <div className="details-container">
            <div>
                <div className="header" style={styles}>
                    <button onClick={() => navigate(-1)} className='left-button'><i className="fa-solid fa-arrow-left arrow"></i></button>
                    <h2>Pokemon Information</h2>
                </div>
                
                <div className="section-container">
                    <div className="ash-container">
                        <div className="ash-image"></div>
                    </div>
                    <main className="main-info" style={styles}>
                        <div>
                            <h2>{pokemon.id >= 100 ? pokemon.id : (pokemon.id >= 10 ? ('0'+pokemon.id) : ('00' + pokemon.id))} 
                                <span> {pokemon.name}</span>
                            </h2>
                        </div>
                        <ul className="types-container">
                            {
                                types.map(type => (
                                    <li key={type} className='type-item'>{type}</li>
                                ))
                            }
                        </ul>
                        
                        <img src={pokemon.sprites?.other.dream_world.front_default} alt="xep" className='pokemon-picture'/>
                        <div className="button-section">
                            <button className='info-button' onClick={() => setShowedComponent('about')}>About</button>
                            <button className='info-button middle-button' onClick={() => setShowedComponent('stats')}>Pokemon Stats</button>
                            <button className='info-button' onClick={() => setShowedComponent('moves')}>Moves</button>
                        </div>
                        {component}
                    </main>
                    <div className="pikachu-container">
                        <div className="pikachu-image"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;