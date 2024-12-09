import { AppDataSouce } from "../db";
import { TodoEntity, UserEntity } from "../entities";


// Create Todo Service
export const createTodo = async (data) => {
  const { title, description, status, dueDate, userId } = data;

  
  const userRepository = AppDataSouce.getRepository(UserEntity);
  const user = await userRepository.findOne({
    where: { uuid: userId },
  });

 
  if (!user) {
    throw new Error('User not found'); 
  }

 
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  // Create a new Todo
  const todo = todoRepository.create({
    title,
    description,
    status,
    dueDate,
    user, // Associate todo with the user entity
  });

  // Save the Todo
  await todoRepository.save(todo);

  return todo; 
};


// Get all Todos for a specific user
export const getTodosForUser = async (userId) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  
  const todos = await todoRepository.find({
    where: { user: { uuid: userId } },  
    relations: ["user"], 
  });

  return todos; // Return the list of Todos
};

// Get a single Todo by its ID
export const getTodoById = async (todoId) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  
  const todo = await todoRepository.findOne({
    where: { uuid: todoId },
    relations: ["user"], 
  });

  if (!todo) return null; 

  return todo; // Return the Todo
};

// Update a Todo
export const updateTodo = async (todoId, data) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  // Find the Todo by its ID
  const todo = await todoRepository.findOne({
    where: { uuid: todoId },
  });

  if (!todo) return null; 

  
  Object.assign(todo, data);

  
  await todoRepository.save(todo);

  return todo; // Return the updated Todo
};

// Delete a Todo
export const deleteTodo = async (todoId) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

 
  const todo = await todoRepository.findOne({
    where: { uuid: todoId },
  });

  if (!todo) return null; 

  
  await todoRepository.remove(todo);

  return { message: "Todo deleted successfully" }; // Return success message
};
