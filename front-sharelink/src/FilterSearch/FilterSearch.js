// import { useState } from 'react';

const FilterSearch = () =>{

    return(
    <form>
        <fieldset>
            <legend>Ordenar por</legend>
                <label>fecha
                    <input 
                    type='checkbox' 
                    name='order'
                    value='fecha'
                    // checked={false}
                    // onChange={()=>setTitle(true)}
                    
                    />
                </label>
                <label>título
                    <input 
                    type='checkbox'
                    name='' 
                    value='title'
                    />
                </label>
                <label>valoración
                    <input 
                    type='checkbox'
                    name='' 
                    value='valoracion'
                    />
                </label>
        </fieldset>
        <fieldset>
            <legend>Ordenar por dirección</legend>
                <label>Ascendente
                    <input 
                    type='radio'
                    name='direction' 
                    value='ASC'
                    />
                </label>
                <label>Descendente
                    <input 
                    type='radio'
                    name='direction' 
                    value='DESC'/>
                </label>

        </fieldset>
        <button>filtrar</button>
       
    </form>
    )
}

export default FilterSearch;