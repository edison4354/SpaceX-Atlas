async function spaceX(){
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launchpads')
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            throw response;
        }
    } catch (errorResponse) {
        console.error(errorResponse);
    }
}

export default spaceX;