import { authToken } from "../test/collectionExample.test";

export const bookingEndpoint = "https://restful-booker.herokuapp.com"
export const userFirstName = "Anton";
export const userLastName = "Filipenka";
export const additionalNeeds = "Dinner";
export const additionalNeeds2 = "Lunch";
export const content = { headers: {"Content-Type": "application/json", "Accept": "application/json"}}
export const username = "admin"
export const password = "password123"

export const contentUpdateBooking = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `token=${authToken}`,
        },
    };
};