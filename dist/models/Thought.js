import { Schema, Types, model } from "mongoose";
// Reaction schema to be used as a subdocument in the Thought Schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(timestamp),
    },
}, {
    toJSON: {
        getters: true,
    },
    toObject: {
        getters: true,
    },
    _id: false,
});
// Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: [reactionSchema],
        default: [],
    },
}, {
    toJSON: {
        virtuals: true,
        versionKey: false, // Exclude the `__v` field
        getters: true,
        transform: (_, ret) => {
            return {
                id: ret.id,
                username: ret.username,
                thoughtText: ret.thoughtText,
                reactionCount: ret.reactionCount,
                reactions: ret.reactions,
                createdAt: ret.createdAt,
            };
        },
    },
    toObject: {
        virtuals: true,
        versionKey: false, // Exclude the `__v` field
        getters: true,
    },
});
// Virtual to get the total count of reactions on a thought
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);
export default Thought;
