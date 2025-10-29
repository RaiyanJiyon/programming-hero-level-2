import { Router } from 'express';
import type { Request, Response } from 'express';
import { Note, type INote } from '../models/Note.js';

// Find all notes
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const notes: INote[] = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error instanceof Error ? error.message : String(error)
        });
    }
};


export const createUser = async (req: Request, res: Response) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ 
            message: 'Bad Request', 
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
