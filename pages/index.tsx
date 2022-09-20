import type { NextPage } from 'next';
import '../styles/index.scss';

import useMap from '../hook/useMap';

const IndexPage: NextPage = () => {
    useMap();

    return <div id="map"></div>;
};



export default IndexPage;