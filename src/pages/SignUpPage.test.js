import SignUpPage from "./SignUpPage";
import {render, screen} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";

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
        it("enables the button when password repeat fields have same value", () => {
            render(<SignUpPage/>);
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Repeat Password");
            userEvent.type(passwordInput, "P4ssword");
            userEvent.type(passwordRepeatInput, "P4ssword");
            expect(button).toBeEnabled();
        });
    });
})