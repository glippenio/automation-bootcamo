import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";
import { bookingId } from "../test/collectionExample.test";

export function deletedBooking( headers ){
    return axios.get(`${bookingEndpoint}/booking/${bookingId}`, headers)
}