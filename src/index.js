import Example from "./scripts/example";
import Second from "./scripts/second";
import Globe from 'globe.gl';
import spaceX from './scripts/spacex';

Example();
Second();


document.addEventListener("DOMContentLoaded", async function() {
    const data = await spaceX();
    const globe = Globe();
        
    globe(document.getElementById('globeViz'))
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .pointsData(data.map(launchPad => ({
            name: launchPad.name,
            lat: launchPad.latitude,
            lng: launchPad.longitude,
        })))
})
