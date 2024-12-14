import { Schema, Types, model, type Document } from "mongoose"

// Reaction interface
interface IReaction extends Document {
	reactionId: Schema.Types.ObjectId
	reactionBody: string
	username: string
	createdAt: Date | string
}

// Thought interface
interface IThought extends Document {
	thoughtText: string
	createdAt: Date | String
	username: string
	reactions: IReaction[]
}

// Reaction schema to be used as a subdocument in the Thought Schema
const reactionSchema = new Schema<IReaction>(
	{
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
			get: (timestamp: Date): string =>
				new Intl.DateTimeFormat("en-US", {
					dateStyle: "medium",
					timeStyle: "short",
				}).format(timestamp),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		toObject: {
			getters: true,
		},
		_id: false,
	}
)

// Thought schema
const thoughtSchema = new Schema<IThought>(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp: Date): string =>
				new Intl.DateTimeFormat("en-US", {
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
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
      transform: (_, ret) => {
        delete ret.id; // Remove virtual 'id' field
        return ret;
      },
		},
		toObject: {
			virtuals: true,
			getters: true,
		},
	}
)

// Virtual to get the total count of reactions on a thought
thoughtSchema.virtual("reactionCount").get(function (this: IThought): number {
	return this.reactions.length
})

const Thought = model<IThought>("Thought", thoughtSchema)

export default Thought
