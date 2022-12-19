import SignUpPage from "./SignUpPage";
import {render, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest, restContext } from "msw";
import axios from "axios";
import { act } from "react-dom/test-utils";

describe("Signup page", () => {
    describe('Layout', () => {
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" })
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument;
        });
        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("E-mail");
            expect(input).toBeInTheDocument;
        });
        it("has password input", () => {
            render(<SignUpPage/>);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument;
        });
        it("has password type for password input", () => {
            render(<SignUpPage/>);
            const input = screen.getByLabelText("Repeat Password");
            expect(input.type).toBe("password")
        });
        it("has password repeat input", () => {
            render(<SignUpPage/>);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument;
        });
        it("has password type for password repeat input", () => {
            render(<SignUpPage/>);
            const input = screen.getByLabelText("Repeat Password");
            expect(input.type).toBe("password");
        });
        it("has Signup button", () => {
            render(<SignUpPage/>);
            const button = screen.queryByRole("button", { name: "Sign Up"});
            expect(button).toBeInTheDocument;
        });
        it("disables the button initially", () => {
            render(<SignUpPage/>);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });
    describe("Interactions", () => {
        let button;
        const setup = () => {
            render(<SignUpPage/>);
            const usernameInput = screen.getByPlaceholderText('User Name');
            const emailInput = screen.getByPlaceholderText('Email');
            const passwordInput = screen.getByPlaceholderText('Password');
            const passwordRepeatInput = screen.getByPlaceholderText('Repeat Password');
            act(() => {
                userEvent.type(usernameInput, 'user1');
                userEvent.type(emailInput, 'user1@gmail.com');
                userEvent.type(passwordInput, 'P4ssword');
                userEvent.type(passwordRepeatInput, 'P4ssword');
            })
            button = screen.queryByRole("button", { name: "Sign Up" });
        };

        let requestBody;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    requestBody = req.body
                    return res(ctx.status(200));
                })
            );

        beforeAll(() => {
            server.listen();
        });
        afterAll(() => {
            server.close();
        })


        it("enables the button when password repeat fields have same value", () => {
            setup();
            expect(button).toBeEnabled();
        });
        it("sends username, email and password to backend after clicking the button", async () => {
            setup();

            act(() => {
                userEvent.click(button);
            })

            //await screen.findByText("Please check your email to activate your account");

            expect(requestBody).toEqual({
                userName: 'user1',
                email: 'user1@gmail.com',
                password: 'P4ssword'
            });
        });
        it ("Disables button after it has been clicked", async () => {
            setup();

            act(() => {
                userEvent.click(button);
            });
            button = screen.getByTestId("button");

            expect(button).toBeDisabled();
        });
        it("Displays a loading indicator while api call is in progress", () => {
            setup();
            act(() => {
                userEvent.click(button);
            })
            const spinner = screen.getByRole('loader');
            expect(spinner).toBeInTheDocument();
        });
        it("Does not display the loading spinner when there is no api request", () => {
            setup();
            const spinner = screen.queryByRole('loader');
            expect(spinner).not.toBeInTheDocument();
        });
        it("Displays account activation notification after successful sign up request", async () => {
            setup();
            const message = "Please check your email to activate your account";
            expect(screen.queryByText(message)).not.toBeInTheDocument()
            act(() => {
                userEvent.click(button);
            })
            const text = await screen.findByText(message);
            expect(text).toBeInTheDocument();
        });
        it("Hides sign up form after successful sign up request", async () => {
            setup();
            const form = screen.getByTestId("form-sign-up");
            userEvent.click(button);
            await waitFor(() => {
                expect(form).not.toBeInTheDocument();
            });
        });
        it("Displays validation message for username", async () => {
            server.use(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    return res(
                        ctx.status(400),
                        ctx.json({
                            validationErrors: { userName: "Username cannot be null" }
                        })
                    )
                })
            )
            setup();
            
            act(() => {
                userEvent.click(button);
            })
            
            const validationError = await screen.findByText("Username cannot be null");
            expect(validationError).toBeInTheDocument();
        });
    });
});