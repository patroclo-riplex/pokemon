import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Login />} />

                    <Route element={<ProtectedRoutes />}>
                        <Route path='/pokemons' element={<Pokedex />} />
                        <Route path='/pokemons/:id' element={<PokemonDetails />} />
                    </Route>

                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;