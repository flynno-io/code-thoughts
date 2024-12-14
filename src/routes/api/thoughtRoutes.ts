import { Router } from "express"

const router = Router()

router.route('/')
  .get(getThoughts) // Get all thoughts
  .put(createThought) // Create a new thought
