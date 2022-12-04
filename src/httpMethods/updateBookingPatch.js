import {bookingEndpoint} from "../utils/globalVariables";
import axios from "axios";
import { bookingId } from "../test/collectionExample.test";

export function updateBookingPatch(body, headers ){
    return axios.patch(`${bookingEndpoint}/booking/${bookingId}`, body, headers)
}