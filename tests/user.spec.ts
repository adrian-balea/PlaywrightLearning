import { expect, test } from '@playwright/test'
import User from '../models/User'
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/ToDoPage';

test("should be able to register to our application", async ({ page }) => {
    const user = new User();
    const signupPage = new SignupPage();
    await signupPage.load(page);
    await  signupPage.signup(page,user);  
    const todoPage = new TodoPage()
    const welcomeMessage = todoPage.getWelcomeMessageElement(page);
    expect(welcomeMessage).toBeVisible;
})