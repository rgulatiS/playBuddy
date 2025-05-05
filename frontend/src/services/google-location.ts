//https://api.opencagedata.com/geocode/v1/json?q=52.3877830%2C9.7334394&key=3bc92947070e4692847598785278bc85


import axios, {AxiosResponse} from "axios";


export function getGoogleLocationFromGeoCode(coordinate: string): Promise<AxiosResponse<any>> {

    return axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coordinate + "&key=AIzaSyB9q4uF6xjrDG-n2jvClxrtOV_jSXUAPUY");
}