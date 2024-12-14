// src/controllers/thoughtControllers.ts

import { Request, Response } from "express"
import { Thought, User } from "../models/index.js"

// Retrieve all thoughts -> GET /thoughts
export const getThoughts = async (_: Request, res: Response) => {
	try {
		const thoughts = await Thought.find().select("-__v")
		res.json(thoughts)
	} catch (error) {
		res.status(500).json(error)
	}
}

// Create a new thought -> PUT /thoughts
export const createThought = async (req: Request, res: Response) => {
	try {
		const thought = await Thought.create(req.body)
    const user = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    )
    if (!user) {
      res.status(404).json({ message: "No user with this Id" })
    } else {
      res.status(201).json(thought)
    }
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		})
	}
}

// Get a single thought -> GET /thoughts/:thoughtId
export const getSingleThought = async (req: Request, res: Response) => {
	const { thoughtId } = req.params
	try {
		const thought = await Thought.findById(thoughtId).select("-__v")
		if (thought) {
			res.json(thought)
		} else {
			res.status(400).json({
				message: "Thought not found.",
			})
		}
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		})
	}
}

// Update a single thought -> PUT /thoughts/:thoughtId
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).select("-__v")
    if (!thought) {
      res.status(404).json({ message: "No thought with this Id" })
    } else {
      res.json(thought)
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  } 
}

// Remove a single thought -> DELETE /thoughts/:thoughtId
export const removeThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId }).select("-__v")
    if (!thought) {
      res.status(404).json({ message: "No thought with this Id" })
    } else {
      res.json(thought)
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

// Add a reaction to a thought -> POST /thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    ).select("-__v")
    if (!thought) {
      res.status(404).json({ message: "No thought with this Id" })
    } else {
      res.json(thought)
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

// Remove a reaction from a thought -> DELETE /thoughts/:thoughtId/reactions
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    ).select("-__v")
    if (!thought) {
      res.status(404).json({ message: "No thought with this Id" })
    } else {
      res.json(thought)
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}