import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import pokemon from '../images/pokemon.png'
import pokeball from '../images/pokeball.png'
import '../styles/pokedex.css';

const Pokedex = () => {

    const userName = useSelector(state => state.userName);
    const navigate = useNavigate();

    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ pokemonName, setPokemonName ] = useState("");
    const [ displayedPokemons, setDisplayedPokemons ] = useState(20);

    const numberOfPages = Math.ceil(pokemons.length / displayedPokemons);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentList, setCurrentList ] = useState(0);

    const pagesNumber = [];
    for( let i = 1; i <= numberOfPages; i++) {
        pagesNumber.push(i);
    }

    const nextPage = () => {
        if( currentPage <= numberOfPages )
            setCurrentList(currentList + displayedPokemons);
            setCurrentPage( currentPage + 1);
    }

    const previousPage = () => {
        if( currentList > 1 ) 
            setCurrentList( currentList - displayedPokemons);
            setCurrentPage( currentPage - 1);
    }

    const pokemonsPageResults = () => {
        return pokemons?.slice(currentList, currentList + displayedPokemons);
    }

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1125')
            .then(res => setPokemons(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type')
            .then(res => setTypes(res.data.results))
    }, []);

    const submit = e => {
        e.preventDefault();

        navigate(`/pokemons/${pokemonName}`);
    }

    const handleType = e => {
        if(e.target.value === 'getAllPokemon') {
            axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1125')
                .then(res => setPokemons(res.data.results))
        } else {
            axios.get(e.target.value)
                .then(res => {
                    setPokemons(res.data.pokemon)
            })
        }  
    }

    const handleDisplay = e => {
        setDisplayedPokemons(parseInt(e.target.value));
        setCurrentList(0);
        setCurrentPage(1);
    }

    return (
        <div>
            <div className="pokedex-top">
                <img src={pokemon} alt="pedro" className='pokedex-image'/>
                <p className='intro-message'>Welcome <strong>{userName}</strong>, let's get the stats of your favorite Pokemon</p>
                <div className="search-container">
                    <div className="selects-container">
                        <div className='content-select'>
                            <select onChange={handleType}>
                                <option>Search by type</option>
                                <option value='getAllPokemon'>All Pokemon</option>
                                {
                                    types.map(type => (
                                        <option key={type.name} value={type.url}>{type.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className='content-select'>
                            <select onChange={handleDisplay}>
                                <option>Results per page</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                                <option value={12}>12</option>
                                <option value={16}>16</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                    </div>

                    <form onSubmit={submit} className='input-container'>
                        <label htmlFor="search">Search</label>
                        <input 
                            type="text"
                            id='search' 
                            onChange={e => setPokemonName(e.target.value)}
                            value={pokemonName}
                        />
                        <button><img src={pokeball} alt="sara" className='pokeball-image'/></button>
                    </form>
                </div>
            </div>
            <h3 className='showing'>Showing {displayedPokemons} results per page</h3>
            <ul className='pokemon-list'>
                {
                    pokemonsPageResults().map(pokemon => (
                        <PokemonCard 
                            pokemonURL={pokemon.pokemon?.url ? pokemon.pokemon.url : pokemon.url}
                            key={pokemon.pokemon?.url ? pokemon.pokemon.url : pokemon.url}
                        />
                    ))
                }
            </ul>
            <div className="pages-buttons">
                    <div className='button-container'>
                        {   
                        currentPage > 1 && 
                        <button className='page-button' onClick={previousPage}>Previous</button> 
                        }

                        <h2>Page {currentPage} {numberOfPages}</h2>
                    
                        { 
                        currentPage < numberOfPages && 
                        <button className='page-button' onClick={nextPage}>Next</button> 
                        }          
                    </div>
                <h2 className='pages-title'>Search by page number</h2>
                <div className="pagination-container">
                    {
                        pagesNumber.map(page => (
                            <button 
                                className='button-list'
                                onClick={() => {
                                    setCurrentList((page - 1) * displayedPokemons);
                                    setCurrentPage(page);
                                }}
                                key={page}
                            >{page}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Pokedex;