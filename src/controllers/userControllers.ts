// src/controllers/userControllers.ts

import { Request, Response } from "express"
import { User } from "../models/index.js"

// Retrieve all users -> GET /users
export const getUsers = async (_: Request, res: Response) => {
	try {
		const users = await User.find().select("-__v")
    const totalUsers = users.length
		res.json({ totalUsers, users: [...users] }) // Return the total number of users and the users
	} catch (error) {
		res.status(500).json(error)
	}
}

// Create a new user -> PUT /users/:userId
export const createUser = async (req: Request, res: Response) => {
	try {
		const user = await User.create(req.body)
		res.status(201).json(user)
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		})
	}
}

// Get a single user -> GET /users/:userId
export const getSingleUser = async (req: Request, res: Response) => {
	const { userId } = req.params
	try {
		const user = await User.findById(userId) 
      .populate('thoughts')
      .populate('friends')
      .select("-__v")
		if (user) {
			res.json(user)
		} else {
			res.status(400).json({
				message: "User not found.",
			})
		}
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		})
	}
}

// Update a single user -> PUT /users/:userId
export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		).select("-__v")

		if (!user) {
			res.status(404).json({ message: "No user with this Id" })
		}

		res.json(user)
	} catch (error: any) {
		res.status(400).json({ message: error.message })
	}
}

// Remove a single user -> DELETE /users/:userId
export const removeUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndDelete({ _id: req.params.userId }).select("-__v")
		if (!user) {
			res.status(400).json({ message: "No user with that ID" })
		} else {
			res.json({ message: "User and thoughts deleted!" })
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message })
	}
}

// Add a friend -> GET /users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndUpdate(
			{
				_id: req.params.userId,
			},
			{
				$addToSet: {
					friends: req.params.friendId,
				},
			},
			{
				runValidators: true,
				new: true,
			}
		).select("-__v")
		if (!user) {
			res.status(404).json({ message: "No user with this Id" })
		}
		res.json(user)
	} catch (error: any) {
		res.status(400).json({ message: error.message })
	}
}

// Remove a friend -> DELETE /users/:userId/friends/:friendId
export const removeFriend = async (req: Request, res: Response) => {
	try {
		const user = await User.findOneAndUpdate(
			{
				_id: req.params.userId,
			},
			{
				$pull: {
					friends: req.params.friendId,
				},
			},
			{
				runValidators: true,
				new: true,
			}
		).select("-__v")
		if (!user) {
			res.status(404).json({ message: "No user with this Id" })
		}
		res.json(user)
	} catch (error: any) {
		res.status(400).json({ message: error.message })
	}
}
