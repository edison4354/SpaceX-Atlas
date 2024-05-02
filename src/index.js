import Globe from 'globe.gl';
import spaceX from './scripts/spacex';

// Wait for the DOMContentLoaded event before executing the async function
document.addEventListener("DOMContentLoaded", async function() {
    // Fetch data from the spaceX function asynchronously
    const data = await spaceX();

    // Initialize the Globe visualization on the 'globeViz' element
    const globe = Globe();
    
    // Configure the Globe visualization with image URLs and data points
    globe(document.getElementById('globeViz'))
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .pointsData(data.map(launchPad => ({ // Map SpaceX launchpad data to globe data points
            name: launchPad.name,
            lat: launchPad.latitude,
            lng: launchPad.longitude,
        })))
})
