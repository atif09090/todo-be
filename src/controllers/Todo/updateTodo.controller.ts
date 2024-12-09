import { Request, Response } from "express";
import { todoService } from "../../services";

export const updateTodo = async (req: Request, res: Response) => {
    try {
      const { todoId } = req.params;
      const data = req.body; 
  
      const updatedTodo = await todoService.updateTodo(todoId, data);
  
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      return res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res
                .status(500)
                .json({ message: "An unexpected error occurred" });
        }
    }
  };