import { authBody } from "../bodyStructure/AuthBody";
import { createBookingBody } from "../bodyStructure/createBookingBody";
import { auth } from "../httpMethods/Auth";
import { createBooking } from "../httpMethods/createBooking";
import { bookingEndpoint, content } from "../utils/globalVariables";
import ("jest-matcher-one-of"); // it's to for one-of method
import { getAllBooking } from "../httpMethods/getAllBooking";
import { userBooking } from "../httpMethods/getInfoAboutUserBooking";
import { updateBookingBody } from "../bodyStructure/updateBookingBody";
// import { updateBooking } from "../httpMethods/updateBooking";
import { contentUpdateBooking } from "../utils/globalVariables";
import axios from "axios";
import { updateBookingPatch } from "../httpMethods/updateBookingPatch";
import { updateBookingBodyPatch } from "../bodyStructure/updateBookingBodyPatch";
import { deleteBooking } from "../httpMethods/deleteBooking";
import { deletedBooking } from "../httpMethods/getDeletedBooking";

export let bookingId;
export let authToken;

describe("user authentication", () =>{
    let authResponse;
    // let authToken;
    beforeAll(async () =>{
        authResponse = await auth(authBody, content)
        console.log(authResponse)
    });
    afterAll(async() =>{
        authToken = authResponse.data.token
        console.log(authToken)
    })
    test("status code is 200", async() => {
        await expect(authResponse.status).toEqual(200)
    })
    test("status text is OK", async () =>{
        await expect(authResponse.statusText).toEqual("OK")
    });
});

describe("Get all bookingIDs", () =>{
    let allBookingResponse
    beforeAll(async () =>{
        allBookingResponse = await getAllBooking()
        console.log(allBookingResponse.data)
    });
    test("status code is 200", async() => {
            await expect(allBookingResponse.status).toEqual(200)
        })
    test("status text is OK", async () =>{
            await expect(allBookingResponse.statusText).toEqual("OK")
        });
    });

describe("example create a booking", () => {
    let bookingResponse;
    beforeAll(async () => {
        bookingResponse = await createBooking(createBookingBody,content);
        console.log("bookingResponse is:", bookingResponse.data)
    })
    afterAll(async () =>{
        bookingId = bookingResponse.data.bookingid;
        console.log("response bookingid is:", bookingId)
    })
    test("status code is 200", async() => {
        await expect(bookingResponse.status).toEqual(200)
    })
    test("status text is OK", async () =>{
        await expect(bookingResponse.statusText).toEqual("OK")
    });
    test("checkin date is equal expected value", async () => {
        await expect(bookingResponse.data.booking.bookingdates.checkin).toEqual("2022-11-29")
    })
    test("price in response is equal generated value", async () => {
        await expect(bookingResponse.data.booking.totalprice).toEqual(createBookingBody.totalprice)
    })
    test("checkout date is equal expected value", async () => {
        await expect(bookingResponse.data.booking.bookingdates.checkout).toEqual("2022-12-05")
    })
})

describe("Get info about user booking", () =>{
    let userBookingResponse
    beforeAll(async () =>{
        userBookingResponse = await userBooking(content)
        console.log(userBookingResponse.data)
    });
    test("status code is 200", async() => {
            await expect(userBookingResponse.status).toEqual(200)
        });
    test("status text is OK", async () =>{
            await expect(userBookingResponse.statusText).toEqual("OK")
        });
    test("User firstname is the same like in request", async () => {
        await expect(userBookingResponse.data.firstname).toEqual(createBookingBody.firstname)
    })
    test("User lastname is the same like in request", async () => {
        await expect(userBookingResponse.data.lastname).toEqual(createBookingBody.lastname)
    })
    test("User price is the same like in request", async () => {
        await expect(userBookingResponse.data.totalprice).toEqual(createBookingBody.totalprice)
    })
})

    export function updateBooking(body, headers) {
        headers["headers"]["Cookie"] = `token=${authToken}`;
      return axios.put(`${bookingEndpoint}/booking/${bookingId}`, body, headers);
    }
    describe("update user booking", () => {
        let updateResponse;
        beforeAll(async () => {
            updateResponse = await updateBooking(updateBookingBody, content);
            console.log("bookingResponse is:", updateResponse.data)
        })
        test("status code is 200", async() => {
            await expect(updateResponse.status).toEqual(200)
        })
        test("status text is OK", async () =>{
            await expect(updateResponse.statusText).toEqual("OK")
        });
        test("price in response is equal generated value", async () => {
            await expect(updateResponse.data.totalprice).toEqual(updateBookingBody.totalprice)
        })
        test("User additionalneeds is the same like in request", async () => {
            await expect(updateResponse.data.additionalneeds).toEqual(updateBookingBody.additionalneeds)
        })
    });

    describe("update user booking via patch", () => {
        let patchResponse;
        beforeAll(async () => {
            patchResponse = await updateBookingPatch(updateBookingBodyPatch, content);
            console.log("bookingResponse is:", patchResponse.data)
        })
        test("status code is 200", async() => {
            await expect(patchResponse.status).toEqual(200)
        })
    });

    describe("Delete user booking", () => {
        let deleteResponse;
        beforeAll(async () => {
            deleteResponse = await deleteBooking( content);
            console.log("bookingResponse is:", deleteResponse.data)
        })
        test("status code is 201", async() => {
            await expect(deleteResponse.status).toEqual(201)
        })
    });

    describe("Get info about deleted booking", () =>{
        let deletedBookingResponse
        beforeAll(async () =>{
            try {
            deletedBookingResponse = await deletedBooking(content)
            console.log(deletedBookingResponse.data);
            }catch (error) {
                deletedBookingResponse = error
                console.log(error)
            }
        });
        test("status code is 404", async() => {
                await expect(deletedBookingResponse.response.status).toEqual(404)
            })
        test("Assert responce status text is Not Found", async () =>{
                await expect(deletedBookingResponse.response.statusText).toEqual("Not Found")
            });
        });
