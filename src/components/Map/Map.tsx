import React, {useContext, useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import '../../utils/fix-map-icon';
import {SearchContext} from "../../contexts/search.context";
import {SimpleAdEntity} from 'types';
import {SingleAd} from './SingleAd';

import 'leaflet/dist/leaflet.css';
import './Map.css';

export const Map = () => {
    const {search} = useContext(SearchContext);
    const [ads, setAds] = useState<SimpleAdEntity[]>([]);

   useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/ad/search/${search}`);
            const data = await res.json();

            setAds(data);
        })();
    }, [search]);

    return (
        <div className='map'>
            <MapContainer center={[51.192692, 17.2847964]} zoom={13}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution="&copy; <a href='https://www.opensteetmap.org/copyright'>OpenStreetMap</a> & contributors"
                />
                {
                    ads.map(ad => (
                        <Marker key={ad.id} position={[ad.lat, ad.lon]}>
                            <Popup>
                                <SingleAd id={ad.id}/>
                            </Popup>
                        </Marker>
                    ))
                }
{/*                <Marker position={[51.192692, 17.2847964]}>
                    <Popup>
                        <h2>Borowa</h2>
                        <p>Moja siedziba</p>
                    </Popup>
                </Marker>*/}
            </MapContainer>
        </div>
    )
}
