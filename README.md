# SpaceX Atlas

[SpaceX Atlas](https://edison4354.github.io/SpaceX-Atlas/) is an interactive 3D globe that allows users to explore SpaceX launchpad locations around the world. The project aims to provide a comprehensive and immersive experience for users to learn about space exploration, launchpads, and rocket launches.

![Landing Page](images/Homepage.png)

## Functionality & MVPs

### In **SpaceX Atlas** users will be able to:

* **Interactive 3D Globe:** This feature allows users to explore a 3D globe.
* **Launchpad Markers:** Users can click on markers where launchpads are located.
* **Launchpad Details:** This feature displays detailed information and statistics on selected launchpad.
* **Launch History:** Users can view all launches from a selected launchpad.

![Demo](images/Demo.gif)

## Wireframes
![Screenshot 2024-05-09 at 11 55 39 AM](https://github.com/edison4354/launchpad-tracker/assets/47466335/2f25f0a9-b2fa-4edf-b180-4f8376bca388)

## Technologies, Libraries, APIs
This project is implemented with the folowing technologies:

* [SpaceX API](https://github.com/r-spacex/SpaceX-API): Open Source REST API for SpaceX launch, rocket, core, capsule, starlink, launchpad, and landing pad data.
* [Globe.gl](https://globe.gl/): UI component for Globe Data Visualization using ThreeJS/WebGL.
* JavaScript: The primary language used for the front-end.
* HTML: Markup language for structuring the web page.
* CSS: Styling language for designing the web page.
* npm (Node Package Manager): Used for managing project dependencies.
* Webpack: A module bundler for JavaScript.
* Babel: A JavaScript compiler.

## Code Snippets

*  Asynchronously fetch data about SpaceX launchpads from the SpaceX API. Includes error handling to log any issues that occur during the fetch or parsing process. Maps the fetched data into a format suitable for use in a globe visualization. This processed data (gData) can then be used to visualize the launchpads on the 3D globe, with interactive markers representing each launchpad.

    ```javascript
    async function spaceX() {
        try {
            const response = await fetch('https://api.spacexdata.com/v4/launchpads');

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw response;
            }
        } catch (errorResponse) {
            console.error(errorResponse);
        }
    }

    const data = await spaceX();

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
    ```

* Implement a 3D globe visualization with interactive markers representing launchpads. When a marker is clicked, it changes color, hides instruction modal, adjusts the layout, and displays additional data about the selected launchpad. The globe.gl library is used to render the globe and manage the data points, while standard HTML and JavaScript are used to create and style the interactive elements.
    ```javascript
    const globe = new Globe();

    globe(document.getElementById('globe-canvas'))
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .htmlElementsData(gData)
        .htmlElement(d => {
            const el = document.createElement('div');
            const img = document.createElement('img');
            img.src = 'src/images/launchpad.svg';
            img.style.width = `${d.size}px`;
            img.style.height = `${d.size}px`;
            el.appendChild(img);

            el.style.width = `${d.size}px`;
        
            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
            el.title = `${d.name}`
            el.onclick = () => {
                // Sets all launchpad markers back to white
                const otherEls = document.getElementById('globe-canvas').querySelectorAll('img')
                otherEls.forEach((img) => {
                    img.src = 'src/images/launchpad.svg'; 
                })

                img.src = 'src/images/launchpadRed.svg'; // Set selected launchpad marker to red
                intructions.style.display  = "none";
                div.style.justifyContent = "start";
                displayLaunchpadData(d)
            };
            return el;
        })
    ```

