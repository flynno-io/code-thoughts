import db from "../config/connection.js";
import { User, Thought } from "../models/index.js";
import { usernames, randomlySelectFromArray, generateRandomThoughts, generateRandomEmailDomain, } from "./data.js";
import cleanDB from "./cleanDB.js";
try {
    console.info("Seeding database...");
    // Connect to database and clean it
    await db();
    await cleanDB();
    console.info("Database cleaned.");
    // Create users
    const users = [];
    for (let i = 0; i < 20; i++) {
        const username = usernames[i];
        users.push({
            username,
            email: `${username}@${generateRandomEmailDomain()}`,
        });
    }
    const usersData = await User.insertMany(users);
    console.info("Users created.");
    // Add friends to users
    for (let i = 0; i < usersData.length; i++) {
        const user = usersData[i];
        const friendsList = randomlySelectFromArray(3, usersData);
        const friendListIds = friendsList
            .filter((friend) => friend._id.valueOf() !==
            user._id.valueOf())
            .map((friend) => friend._id);
        user.friends = friendListIds;
        await user.save();
    }
    console.info("Friends added.");
    // Create thoughts + reactions
    const thoughts = [];
    for (let i = 0; i < usersData.length; i++) {
        const user = usersData[i];
        const thoughtsData = generateRandomThoughts(Math.floor(Math.random() * 5), user._id, user.username);
        thoughts.push(...thoughtsData);
    }
    const thoughtsData = await Thought.insertMany(thoughts);
    console.info("Thoughts created.");
    // Add thoughts to users
    for (let i = 0; i < usersData.length; i++) {
        const user = usersData[i];
        const userThoughts = thoughtsData.filter((thought) => thought.username === user.username);
        user.thoughts = userThoughts.map((thought) => thought._id);
        await user.save();
    }
    console.info("Thoughts added.");
    console.table(users);
    console.table(thoughts);
    console.info("Database seeded.");
    process.exit(0);
}
catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
}
