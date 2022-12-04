import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";
import { bookingId } from "../test/collectionExample.test";

export function deleteBooking( headers ){
    return axios.delete(`${bookingEndpoint}/booking/${bookingId}`, headers)
}