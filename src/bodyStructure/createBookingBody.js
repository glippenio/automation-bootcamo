import * as variable from "../utils/globalVariables"
import * as preRequest from "./preRequest"

export const createBookingBody = {
    firstname : variable.userFirstName,
    lastname : variable.userLastName,
    totalprice :  preRequest.price,
    depositpaid : false,
    bookingdates :
        {
            checkin : "2022-11-29",
            checkout :"2022-12-05"
        },
    additionalneeds : variable.additionalNeeds
}