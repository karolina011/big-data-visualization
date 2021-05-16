import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl, Popup} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Grid} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';


const MapComponent = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoia2Fya2ExMDEwIiwiYSI6ImNraW5vcjZkZTE0cGIydG13YnQwZzBibHgifQ.PDgNmGlrMPkelkgUAcknfQ',
    scrollZoom: true
});


const Maps = () => {

    const marker = {
        height: 10,
        width: 10
    }

    const test = (e : React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        //@ts-ignore
        // e.target.nextSibling.style.display = 'block';
        // let popup = e.target.nextSibling;
        //
        console.log(e)
        //@ts-ignore
        if (!e.target.nextSibling)
        {
            return;
        }
        //@ts-ignore
        e.target.nextSibling.style.display = e.type == 'mouseenter' ? 'flex' : 'none';
        // popup.hidden = e.type !== 'mouseenter';

    };

    return (
        <>
            <p>Maps</p>
            <Grid container justify='center'>
                <Grid item>
                    <MapComponent
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                            height: '55vh',
                            width: '50vw'
                        }}
                        zoom={[0.5]}
                    >
                        {/*<Marker*/}
                        {/*    // onMouseEnter={test.bind(Element)}*/}
                        {/*    coordinates={[-21.2416815, 51.5285582]}*/}
                        {/*    anchor="bottom">*/}
                        {/*    /!*<img style={marker} src="https://pbs.twimg.com/profile_images/823569976342773760/c2RLAG7h_400x400.jpg"/>*!/*/}
                        {/*    <LocationOnIcon onMouseEnter={() => {*/}
                        {/*        console.log('enterrrrr')*/}
                        {/*    }}/>*/}
                        {/*</Marker>*/}
                    </MapComponent>
                </Grid>
            </Grid>
        </>
    )

};

export default Maps;