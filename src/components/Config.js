import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Config = () => {

    const pokemonPerPage = useSelector(state => state.pokemonPerPage);

    const [numberPokemons, setNumberPokemons] = useState(pokemonPerPage);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const submit = (e) =>{
        e.preventDefault();

        dispatch({ 
            type: "GET_NUMBER_POKEMONS",
            payload: numberPokemons
        })
        setNumberPokemons(0);
        navigate('/pokedex')
    }

    function cancel(){
        navigate('/pokedex')

    }

    //establecer nuevo valor
    //const userName = useSelector(state => state.userName)
    return (
        <div className='bodyConfig'>
            <div className="main_container_config">
                <h1 className='margin_config'>CONFIGURATION</h1>
                <h3 className='margin_config'>Choose the pokemon's quantity you prefer to see on the web </h3>
                <label className='margin_config' htmlFor="numbers">(numbers between 4 - 64) </label>
                    <form action="" onSubmit = {submit}>
                        <input 
                            type="number"
                            min={4}
                            max={64}
                            name="numbers"
                            id='numbers'
                            value={numberPokemons}
                            onChange={ e => setNumberPokemons(e.target.value)}
                        />
                        <button>Submit</button>
                        <button onClick={cancel}>Cancel</button>
                    </form>
            </div>

        </div>
    );
};

export default Config;<h1>CONFIG</h1>