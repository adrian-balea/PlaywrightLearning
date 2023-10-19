import {test, expect} from '@playwright/test'
import User from '../models/User'
import SignupPage from '../pages/SignupPage';
import ToDoPage from '../pages/ToDoPage';
import NewTodoPage from '../pages/NewTodoPage';
import ToDoApi from '../apis/ToDoApi';

test('should be able to add a new todo', async ({page, request, context})=>{
    const toDo1_name ='To do number 1'
    const user = new User();
    const signupPage = new SignupPage();
    await signupPage.signupUsingAPI(request,user, context)
    const newToDoPage = new NewTodoPage();
    await newToDoPage.load(page);
    await newToDoPage.addTodo(page, toDo1_name);
    const todoPage = new ToDoPage();
    const todoItem = await todoPage.getToDoItem(page);
    expect (await todoItem.innerText()).toEqual(toDo1_name);

})


test ('Should be able to delete a to do', async ({page, request, context})=>{    
    const user = new User();
    const signupPage = new SignupPage();
    await signupPage.signupUsingAPI(request,user, context);
    const todoPage = new ToDoPage();
    await todoPage.load(page);
    // await todoPage.addToDoUsingAPI(request, user);
    await page.goto("/todo/new");
    const newTodo = page.getByTestId('new-todo'); 
    const toDo1_name ='To do number 1'
    newTodo.fill(toDo1_name);
    await page.getByTestId('submit-newTask').click();
    await page.goto("/todo");
    todoPage.deleteTodo(page);
    const noToDosMessage = await todoPage.getNoTodosMessage(page);
    await expect (noToDosMessage).toBeVisible();
})


