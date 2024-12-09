import {  Response } from "express";
import { todoService } from "../../services";



export const createNewTodo = async (req, res: Response) => {
    try {
        const userId = req.user.uuid; 
        const { title, description, status, dueDate } = req.body;

        const newTodo = await todoService.createTodo({
            title,
            description,
            status,
            dueDate,
            userId
        });

        if (!newTodo) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(201).json({ message: "Todo created successfully", todo: newTodo });
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