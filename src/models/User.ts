// src/models/User.ts

import { Schema, Types, model, type Document } from "mongoose"
import Thought from "./Thought.js"

// User interface
export interface IUser extends Document {
	username: string
	email: string
	thoughts: Types.ObjectId[]
	friends: Types.ObjectId[]
}

// User schema
const userSchema = new Schema<IUser>({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Please enter a valid e-mail address ({VALUE})"],
	},
	thoughts: {
		type: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
		default: [],
	},
	friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function (this: IUser): number {
	return this.friends.length
})

// BONUS: Add 'pre' middleware to delete a users associated thoughts when the user is deleted
// Function to delete associated thoughts given the user to be deleted
async function deleteAssociatedThoughts(user: IUser) {
	await Thought.deleteMany({ _id: { $in: user.thoughts } })
}

// Add a 'pre' hook to the 'findOneAndDelete' method that deletes associated thoughts when a user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
	const user = await this.model.findOne(this.getQuery())
	if (user) {
		await deleteAssociatedThoughts(user)
	}
	next()
})

// Add a 'pre' hook to the 'deleteOne' method that deletes associated thoughts when a user is deleted
userSchema.pre(
	"deleteOne",
	{ document: true, query: false },
	async function (next) {
		const user = this as IUser // The user document being deleted
		await deleteAssociatedThoughts(user)
		next()
	}
)

// Create the User model
const User = model<IUser>("User", userSchema)

export default User
