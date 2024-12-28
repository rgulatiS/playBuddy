//https://api.opencagedata.com/geocode/v1/json?q=52.3877830%2C9.7334394&key=3bc92947070e4692847598785278bc85


import axios, {AxiosResponse} from "axios";


export function getLocationFromGeoCode(coordinate: string): Promise<AxiosResponse<any>> {

    return axios.get("https://api.opencagedata.com/geocode/v1/json?q=" + coordinate + "&key=3bc92947070e4692847598785278bc85");
}