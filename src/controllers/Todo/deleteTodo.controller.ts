import { Request, Response } from "express";
import { todoService } from "../../services";



export const deleteTodo = async (req: Request, res: Response) => {
    try {
      const { todoId } = req.params;
  
      const result = await todoService.deleteTodo(todoId);
  
      if (!result) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      return res.status(200).json({ message: result.message });
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