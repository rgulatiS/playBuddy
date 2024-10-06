const windowLocalHost = window.location.host;
const localHost= "localhost:3000";

const backendLocalHost= "localhost:1234";

export const GlobalVariable = Object.freeze({
    BASE_URL: getBackendBaseUrl()
})


function getBackendBaseUrl(){
    if(windowLocalHost.includes(localHost)){
        return "https://"+backendLocalHost;
    }
}