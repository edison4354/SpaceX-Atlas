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
* HTML: Markup language for structuring the web pages.
* CSS: Styling language for designing the web pages.
* npm (Node Package Manager): Used for managing project dependencies.
* Webpack: A module bundler for JavaScript applications.
* Babel: A JavaScript compiler.

## Code Snippets

* Implenmention of globe.gl ui component
    ```javascript
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

