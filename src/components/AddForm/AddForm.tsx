import React, {SyntheticEvent, useState} from "react";
import {Btn} from "../common/Btn";
import {geocode} from "../../utils/geocoding";

import './AddForm.css';

export const AddForm = () => {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: '',
    });

    const updateForm = (key: string, value: string | number) => {
        setForm(form => ({
            ...form,
            [key]: value,
        }));
    };

    const saveAd = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {lat, lon} = await geocode(form.address);

            const res = await fetch('http://localhost:3001/ad', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                  ...form,
                  lat,
                  lon,
                }),
            });

            const data = await res.json();
            setId(data.id);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia...</h2>
    }

    if(id){
        return <h2>Twoje ogłoszenie {form.name} zostało poprawnie dodane do serwisu pod ID: {id}.</h2>
    }

    return (
        <form action="" className='add-form' onSubmit={saveAd}>
            <h1>Dodawanie ogłoszenia</h1>
            <p>
                <label>
                    Nazwa: <br/>
                    <input
                        type="text"
                        name='name'
                        required
                        maxLength={99}
                        value={form.name}
                        onChange={e => updateForm(e.target.name, e.target.value)}
                    />
                </label>
                <label>
                    Opis: <br/>
                    <textarea
                        name='description'
                        maxLength={999}
                        value={form.description}
                        onChange={e => updateForm(e.target.name, e.target.value)}
                    />
                </label>
                <label>
                    Cena*: <br/>
                    <input
                        type="number"
                        name='price'
                        maxLength={9999999}
                        value={form.price}
                        onChange={e => updateForm(e.target.name, Number(e.target.value))}
                    />
                    <small>* Pozostaw pole puste aby nie wyświetlać ceny</small>
                </label>
                <label>
                    Adres URL: <br/>
                    <input
                        type="url"
                        name='url'
                        required
                        maxLength={99}
                        value={form.url}
                        onChange={e => updateForm(e.target.name, e.target.value)}
                    />
                </label>
                <label>
                    Adres fizyczny na mapie: <br/>
                    <input
                        type="text"
                        name='address'
                        required
                        placeholder='Miasto, Ulica numer'
                        value={form.address}
                        onChange={e => updateForm(e.target.name, e.target.value)}
                    />
                </label>
                <Btn text='Zapisz' />
            </p>
        </form>
    )
};
