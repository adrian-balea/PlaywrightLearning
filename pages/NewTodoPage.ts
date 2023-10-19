import { Page } from "@playwright/test";

const toDo1_name ='To do number 1'

export default  class NewTodoPage {
    private get newTodoButton(){
        return 'new-todo';
    }

    private get submitButton(){
        return 'submit-newTask';
    }

    async load(page: Page){
        await page.goto("/todo/new");
    }

    async addTodo(page: Page, task: string){
        const newTodo = page.getByTestId(this.newTodoButton); 
        newTodo.fill(task);
        await page.getByTestId(this.submitButton).click();
    }
}