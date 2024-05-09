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
        launches: launchPad.launches,
        launch_attempts: launchPad.launch_attempts,
        launch_successes: launchPad.launch_successes,
        launch_fails: launchPad.launch_attempts - launchPad.launch_successes
    }));

    const lData = launchData.map(launch => ({
        launchpadID: launch.launchpad,
        name: launch.name,
        id: launch.id,
        flight_number: launch.flight_number,
        date: launch.date_utc,
        rocket: launch.rocket,
        links: launch.links,
        details: launch.details,
        success: launch.success
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
        <ul id="launch-stats-container">
            <li class="launch-stats">
                <p class="launch-nums">${data.launch_attempts}</p>
                <label>No. of Rocket Launch</label>
            </li>
            <li class="launch-stats">
                <p class="launch-nums">${data.launch_successes}</p>
                <label>Success</label>
            </li>
            <li class="launch-stats">
                <p class="launch-nums">${data.launch_fails}</p>
                <label>Failure</label>
            </li>
        </ul>
        <ul>${launchNames.map((launch) => `
            <li class="launch-list" data-launch-id="${launch.id}">
                <img class="rocket" src="src/images/rocket.png">
                ${launch.name}
            </li>`).join('')}
        </ul>
        `;

        dataDiv.innerHTML = html;
    }


    // Event Delegation Technique
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('launch-list')) {
          const launchId = event.target.dataset.launchId;
          displayLaunchData(launchId);
        }
    });
      

    function displayLaunchData(launchId) {
        const launchDataDiv = document.getElementById("launchData")
        launchDataDiv.style.display = "flex";
        const launchInfo = lData.filter((launch) => launch.id === launchId)[0]
        const images = launchInfo.links.flickr.original

        console.log(images)
        const html = `
            <h2>${launchInfo.name}</h2>
            <p>${launchInfo.details}</p>
            <p>Launch Date: ${launchInfo.date.slice(0, 10)}</p>
            <p>Success: ${launchInfo.success}</p>
            <p>Flight Number: ${launchInfo.flight_number}</p>
            <p>Rocket: ${launchInfo.rocket}</p>
            <a href="${launchInfo.links.webcast}"><img src="src/images/youtube.png"></a>
            <iframe src="${launchInfo.links.webcast}"></iframe>
            <p>Wikipedia: ${launchInfo.links.wikipedia}</p>
        `

        launchDataDiv.innerHTML = html
    }
})
