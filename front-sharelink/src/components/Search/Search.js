import { useState } from "react";
import FilterSearch from "../../FilterSearch/FilterSearch";
import { useGetSearch } from "../api";
import "./Search.css"

const Search = ({ setResult, fetchKey }) => {

    const [searchInput, setSearchInput] = useState('')
    const searchResult = useGetSearch(searchInput)

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult(searchResult,fetchKey)
        setSearchInput('')
    }

    return (
        <>
        <FilterSearch />
        <form onSubmit={handleSubmit} className='formSearch'>
            <label htmlFor="title">
                <input
                    id="title"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    placeholder='Introduce tú búsqueda'
                />

            </label>
            <button className="buttonSearch">🔍</button>

        </form>
        </>


    )
}

export default Search;