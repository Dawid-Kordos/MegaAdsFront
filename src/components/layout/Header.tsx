import React, {SyntheticEvent, useContext, useState} from "react";
import {Btn} from "../common/Btn";
import {Link} from "react-router-dom";
import {SearchContext} from "../../contexts/search.context";

import './Header.css';

export const Header = () => {
    const {search, setSearch} = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(search);

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    }

    return (
        <header>
            <h1>
                <Link to='/' className="link"><strong>Mega </strong> Ogłoszenie</Link>
            </h1>
            <Btn to='/add' text={'Dodaj ogłoszenie'}/>
            <form className="search" onSubmit={setSearchFromLocalState}>
                <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}/>
                <Btn text={'Szukaj'}/>
            </form>
        </header>
    );
};
