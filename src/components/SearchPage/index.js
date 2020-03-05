import React, { useState } from '../../../node_modules/react';
import {
    Redirect
} from 'react-router-dom';

import './styles.css'


const SearchPage = () => {
    const [userName, setUserName] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const sendToResult = event => {
        event.preventDefault()
        setRedirect(true)
    }

    const handleChange = event => {
        setUserName(event.target.value)
    }

    return (
        <div className="App">
            {redirect ? <Redirect to={`/user/${userName}`} /> : null}

            <div className="search-container">  

                <h2 className="form-title">Busque um usuário no github.</h2>

                <form className="form-search" onSubmit={sendToResult}>
                    <div>@<input onChange={handleChange}/> </div>
                    <button type="submit">Buscar</button>
                </form>
            </div>
        </div>
    )
}

export default SearchPage