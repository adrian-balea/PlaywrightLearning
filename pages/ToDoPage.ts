import { APIRequestContext, Page } from "@playwright/test";
import ToDoApi from '../apis/ToDoApi';
import User from "../models/User";


export default class TodoPage {

   private get welcomeMessage(){
        return '[data-testid=welcome]';
    }

    private get deleteButton(){
        return '[data-testid=delete]';
    }

    private get noTodosMessage(){
        return 'No Available Todos';
    }
    
    private get todoItem(){
        return '[data-testid=todo-item]';
    }
    async load(page: Page){
        await page.goto('/todo');
    }

    getWelcomeMessageElement(page: Page){
        return page.locator(this.welcomeMessage)
    }

    async deleteTodo(page:Page){
        return page.click(this.deleteButton);
    }
    
    async getNoTodosMessage(page:Page){
        return page.getByText(this.noTodosMessage);
    }

    async getToDoItem(page:Page){
        return page.locator(this.todoItem);
    }

    async addToDoUsingAPI(request:APIRequestContext, user: User){
        await new ToDoApi().addToDo(request, user);
    }
}