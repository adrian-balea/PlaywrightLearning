import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import config from "../playwright.config"

export default class SignupPage {
    async load(page: Page){
        await page.goto("/signup");
    }

    private get firstNameInput() {
        return "first-name";
    }
    private get lastNameInput() {
        return "last-name";
    }
    private get emailInput() {
        return "email";
    }
    private get passwordInput() {
        return "email";
    }
    private get confirmPasswordInput() {
        return "confirm-password";
    }
    private get submittButton() {
        return "confirm-password";
    }


    async signup(page: Page, user: User){
        await page.getByTestId(this.firstNameInput).fill(user.getFirstName());
        await page.getByTestId(this.lastNameInput).fill(user.getLastName());
        await page.getByTestId(this.emailInput).fill(user.getEmail());
        await page.getByTestId(this.passwordInput).fill(user.getPassword());
        await page.getByTestId(this.confirmPasswordInput).fill(user.getPassword());
        await page.getByTestId(this.submittButton).click();
    }

    async signupUsingAPI(request: APIRequestContext, user: User, context: BrowserContext){
        const response = await new UserApi().signup(request,user);
        const responseBody = await response.json();
        const access_token = responseBody.access_token;
        const firstName = responseBody.firstName;
        const userID = responseBody.userID;

        await context.addCookies([
            {
                name: 'access_token',
                value: access_token,
                url: config.use?.baseURL
            },
            {
                name: 'firstName',
                value: firstName,
                url: config.use?.baseURL
            },
            {
                name: 'userID',
                value: userID,
                url: config.use?.baseURL
            },
        ]);
    }
}