import Example from "./scripts/example";
import Second from "./scripts/second";
import Globe from 'globe.gl';

Example();
Second();

document.addEventListener("DOMContentLoaded", function() {
    const globe = Globe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    (document.getElementById('globeViz'));

    globe.render();
})