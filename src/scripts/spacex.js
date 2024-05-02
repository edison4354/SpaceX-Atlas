// This function fetchs data about SpaceX launchpads asynchronously 
async function spaceX(){
    try {
        // Fetch data from the SpaceX API
        const response = await fetch('https://api.spacexdata.com/v4/launchpads')

        // Check if the response is successful (status code 200)
        if (response.ok) {
            // Parse the response as JSON
            const data = await response.json();
            // Return the parsed data
            return data
        } else {
            // If response is not successful, throw an error
            throw response;
        }
    } catch (errorResponse) {
        // Catch any errors that occur during the fetch or parsing process
        console.error(errorResponse);
    }
}

export default spaceX;