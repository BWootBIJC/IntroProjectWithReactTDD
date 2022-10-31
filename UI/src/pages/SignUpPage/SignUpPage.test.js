import SignUpPage from "./SignUpPage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

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
            const usernameInput = screen.getByLabelText('Username');
            const emailInput = screen.getByLabelText('Email');
            const passwordInput = screen.getByLabelText('Password');
            const passwordRepeatInput = screen.getByLabelText('Password Repeat');
            userEvent.type(usernameInput, 'user1');
            userEvent.type(emailInput, 'user1@gmail.com');
            userEvent.type(passwordInput, 'P4ssword');
            userEvent.type(passwordRepeatInput, 'P4ssword');
            button = screen.queryByRole('button', { name: 'Sign up' });
        }

        it("enables the button when password repeat fields have same value and when all fields are not empty", () => {
            setup();
            expect(button).toBeEnabled();
        });
        it("sends username, email and password to backend after clicking the button", async () => {
            let requestBody;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    requestBody = req.body
                    return res(ctx.status(200));
                })
            );
            server.listen();
            setup();
            userEvent.click(button);

            await new Promise(resolve => setTimeout(resolve, 500));
        
            //For Datably, this should instead test, "Is the right service method called?"
            expect(requestBody).toEqual({
                userName: 'user1',
                email: 'user1@gmail.com',
                password: 'P4ssword'
            });
        });
        it ("Disables button when there is an ongoing api call", async () => {
            let counter = 0;
            let requestBody;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    requestBody = req.body;
                    counter += 1;
                    return res(ctx.status(200));
                })
            );
            server.listen();
            setup();
            userEvent.click(button);
            userEvent.click(button);

            await new Promise(resolve => setTimeout(resolve, 500));
        
            expect(counter).toBe(1);
        })
    });
})