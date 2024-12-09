import { Router } from "express";
import { TodoController } from "../controllers";
import { checkAuth } from "../utils";

export const todoRouter = Router();

todoRouter.get(
  "/",
  checkAuth,
  TodoController.getTodos
);

todoRouter.post(
  "/",
  checkAuth,
  TodoController.createNewTodo
)

todoRouter.put(
  "/:id",
  checkAuth,
  TodoController.updateTodo
)

todoRouter.delete(
  "/:id",
  checkAuth,
  TodoController.deleteTodo
)