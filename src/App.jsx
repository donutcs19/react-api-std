import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

//components
import FavPoke from './components/FavPoke'

function App() {
  const [pokemon, setPokemon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([])
  useEffect(() => {
   
    let abortController = new AbortController();
    
    const loadPokemon = async  () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`,{
          signal: abortController.signal
        });

        setPokemon(response.data)
        setError("");

      } catch (error) {
        setError("[Error] -> ", error);
        
      }finally{
        setLoading(false);
      }
    }
    loadPokemon();

    return () => abortController.abort();

  }, [number])

  console.log(pokemon);

  const prevPoke = () => {
 setNumber((number) => number - 1) 
  }

  const nextPoke = () => {
setNumber((number) => number + 1)
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, pokemon])
  }

  return (
    <>
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 '>

<div>
<h1>{pokemon?.name}</h1>
    <h2>Pokemon id : {pokemon?.id}</h2>
    <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800' onClick={addFav}>
    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
    Add to favorite
</span>
      </button>
     <img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon?.name} />

     {pokemon?.abilities && pokemon.abilities.map((row, idx) => (
  <h3 key={idx}>{row.ability.name}</h3>
))}


<button onClick={prevPoke}>Previous</button>
<button onClick={nextPoke}>Next</button>

</div>

    </div>
   
   

<div>
  <FavPoke fav={fav} />
</div>

    </div>
    
     
    

    </>
  )
}

export default App
