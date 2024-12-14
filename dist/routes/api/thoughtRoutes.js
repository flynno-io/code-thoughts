import { Router } from "express";
import { getThoughts, createThought, getSingleThought, updateThought, removeThought, addReaction, removeReaction, } from "../../controllers/thoughtControllers.js";
const router = Router();
// api/thoughts
router
    .route("/")
    .get(getThoughts) // Get all thoughts
    .put(createThought); // Create a new thought
// api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(getSingleThought) // Get a single thought
    .put(updateThought) // Update a single thought
    .delete(removeThought); // Remove a single thought
// api/thoughts/:thoughtId/reactions
router
    .route("/:thoughtId/reactions")
    .post(addReaction) // Add a reaction to a thought
    .delete(removeReaction); // Remove a reaction from a thought
export { router as thoughtRouter };
