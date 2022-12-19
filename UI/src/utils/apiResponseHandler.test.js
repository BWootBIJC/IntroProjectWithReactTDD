import {rest} from "msw";
import {setupServer} from "msw/node";
import {apiResponseHandler} from "./apiResponseHandler";

describe.skip("API Response Handler", () => {
    it("Handles successful response and resolves the response to json", async () => {
        //Arrange
        const post = rest.post("/dummy route", (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        message: "Bad Request",
                        validationErrors: "Required field cannot be null"
                    })
                )
            }
        )
        const server = setupServer(post);

        //Act
        let response = await apiResponseHandler;
        console.log(post, "POST")

        //Assert
        return expect(response).rejects.toEqual({
            message: "Bad Request",
            validationErrors: "Required field cannot be null"
        })

    })
})