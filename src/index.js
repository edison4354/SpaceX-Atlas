import Globe from 'globe.gl';
import spaceX from './scripts/spacex';
import launch from './scripts/launch';

// Wait for the DOMContentLoaded event before executing the async function
document.addEventListener("DOMContentLoaded", async function() {
    const modalClose = document.getElementById("modal-close");
    const modal = document.getElementById("modal-container");
    const div = document.getElementById("launchpadData");
    const title = document.getElementById("target-title");

    modalClose.addEventListener('click', function() {
        console.log("closing");
        modal.style.display = "none";
        div.style.display = "flex";
        div.classList.add("show-div")
        title.style.display = "flex"
        title.classList.add("show-title")
    })

    // Fetch data from the spaceX function asynchronously
    const data = await spaceX();
    const launchData = await launch();
    
    const gData = data.map(launchPad => ({
        name: launchPad.name,
        lat: launchPad.latitude,
        lng: launchPad.longitude,
        size: 30,
        full_name: launchPad.full_name,
        region: launchPad.region,
        image: launchPad.images.large[0],
        id: launchPad.id,
        launches: launchPad.launches
    }));

    const lData = launchData.map(launch => ({
        launchpadID: launch.launchpad,
        name: launch.name,
        link: launch.links.article
    }));

    // Initialize the Globe visualization on the 'globeViz' element
    const globe = Globe();

    // Configure the Globe visualization with image URLs and data points
    globe(document.getElementById('globe-canvas'))
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .htmlElementsData(gData)
        .htmlElement(d => {
            const el = document.createElement('div');
            const img = document.createElement('img');
            img.src = 'src/images/icons8-launchpad.svg';
            img.style.width = `${d.size}px`;
            img.style.height = `${d.size}px`;
            el.appendChild(img);

            el.style.width = `${d.size}px`;
        
            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
            el.title = `${d.name}`
            el.onclick = () => displayLaunchpadData(d);
            return el;
        })

    function displayLaunchpadData(data) {
        const dataDiv = document.getElementById('launchpadData');
        const launchNames = lData.filter((launch) => launch.launchpadID === data.id)


        const html = `
        <h2>${data.name}</h2>
        <p class="fp">${data.full_name}</p>
        <p class="sp">${data.region}</p>
        <ul>${launchNames.map((launch) => `<li><img class="rocket" src="src/images/rocket.png">${launch.name}</li>`).join('')}</ul>
        <img src="https://i.imgur.com/7uXe1Kv.png">
        `;

        dataDiv.innerHTML = html;
    }
})

