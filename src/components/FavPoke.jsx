import React from 'react'

function FavPoke({fav}) {
  return (
    <div>
        {fav?.map((data, idx) => (
            
            <div key={idx}>
            <h2>{data.name}</h2>
            <img src={data.sprites?.other?.home?.front_default} alt={data.name} />
            </div>
           
        ))}
    </div>
  )
}

export default FavPoke