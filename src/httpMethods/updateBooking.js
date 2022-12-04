import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";
import { bookingId } from "../test/collectionExample.test";

export function updateBooking(body, headers ){
    return axios.put(`${bookingEndpoint}/booking/${bookingId}`, body, headers)
}
