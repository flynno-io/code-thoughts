import { Router } from "express"
import { getUsers, createUser, getSingleUser, updateUser, removeUser } from "../../controllers/userControllers.js"

const router = Router()

// api/users
router.route('/')
 .get(getUsers) // Get all users
 .put(createUser) // Create a new user

// api/users/:userId
router.route('/:userId')
 .get(getSingleUser) // Get a single user
 .put(updateUser) // Update a single user
 .delete(removeUser) // Remove a single user

export { router as userRouter }
