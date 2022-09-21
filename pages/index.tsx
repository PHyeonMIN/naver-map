import type {NextPage} from 'next';
import {direction5, geocoding, reverseGeocoding} from "./api/mapApi";
import NaverMap from "./NaverMap";

const IndexPage: NextPage = () => {

    return (
        <>
            <NaverMap />
            <button onClick={(event)=> {
                event.preventDefault();
                geocoding();
            }}>geocoding</button>

            <button onClick={(event)=> {
                event.preventDefault();
                reverseGeocoding();
            }}>reverseGeocoding</button>

            <button onClick={(event)=> {
                event.preventDefault();
                direction5();
            }}>direction5</button>
        </>
    );
};

export default IndexPage;