import * as variable from "../utils/globalVariables"
import * as preRequest from "./preRequest"

export const updateBookingBody = {
    firstname : variable.userFirstName,
    lastname : variable.userLastName,
    totalprice :  preRequest.price2,
    depositpaid : false,
    bookingdates :
        {
            checkin : "2022-11-29",
            checkout :"2022-12-10"
        },
    additionalneeds : variable.additionalNeeds
}