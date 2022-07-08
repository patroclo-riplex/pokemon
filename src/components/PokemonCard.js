import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pokemoncard.css';

const PokemonCard = ({ pokemonURL }) => {

    const [ pokemon, setPokemon ] = useState({});
    const [ background, setBackground ] = useState('')
    const [types, setTypes ] = useState([]);

    useEffect(() => {
        axios.get(pokemonURL)
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
    }, [ pokemonURL ]);

    const styles = {
        background
    }
    
    return (
        <li className='column'>
            <Link
                className='pokemon-card' 
                to={`/pokemons/${pokemon.id}`} 
                style={styles} 
            >
                <div className='pokemon-index'>
                    {pokemon.id >= 100 ? pokemon.id : (pokemon.id >= 10 ? ('0'+pokemon.id) : ('00' + pokemon.id))}
                </div>
                <img src={pokemon.sprites?.other["official-artwork"].front_default} alt="for sell" className='pokemon-image'/>
                <h2>{pokemon.name}</h2>
                <div className="types-container">
                    <p className='types-info'>
                        {types.length <= 1 ? 'Type:' : 'Types:'}<span>
                        {
                            types.map((type, i) => {
                                return (i < types.length - 1) ? (type + ', ') : (type)
                            })
                        }
                        </span>
                    </p>
                </div>
            </Link>
        </li>
    );
};

export default PokemonCard;