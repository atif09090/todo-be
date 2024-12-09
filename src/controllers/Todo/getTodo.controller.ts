import { Response } from "express";
import { todoService } from "../../services";


export const getTodos = async (req, res: Response) => {
    try {
      const userId = req?.user; // Get the user ID from the decoded JWT

      const todos = await todoService.getTodosForUser(userId.uuid);
  
      return res.status(200).json({ todos });
    } catch (error) {
        console.log("error",error)
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res
                .status(500)
                .json({ message: "An unexpected error occurred" });
        }
    }
  };
