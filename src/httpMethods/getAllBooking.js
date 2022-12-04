import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";

export function getAllBooking(){
    return axios.get(`${bookingEndpoint}/booking`)
}