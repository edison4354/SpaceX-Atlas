export default function launchpadGlobe(data){
    globe(document.getElementById('globe-canvas'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .htmlElementsData(data)
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
        el.onclick = () => console.info(d);
        
        return el;
    })
}