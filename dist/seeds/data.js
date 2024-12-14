// src/seeds/data.ts
import { Types } from 'mongoose';
// Used to generate full names for users
export const usernames = [
    "JohnDoe",
    "JaneSmith",
    "MikeBrown",
    "EmilyDavis",
    "ChrisWilson",
    "JessicaGarcia",
    "DavidMartinez",
    "SarahAnderson",
    "JamesTaylor",
    "LauraThomas",
    "DanielHernandez",
    "AmyMoore",
    "MatthewJackson",
    "OliviaMartin",
    "AndrewLee",
    "EmmaPerez",
    "JoshuaWhite",
    "AshleyClark",
    "RyanLewis",
    "GraceWalker",
];
// Used to generate random thoughts
export const thoughts = [
    "I love coding!",
    "I'm learning so much!",
    "I'm really enjoying this course!",
    "I'm excited to start my new career!",
    "I'm going to be a great developer!",
    "I'm going to build amazing things!",
    "I'm going to change the world!",
    "I'm going to make a difference!",
    "I'm going to be successful!",
    "I'm going to be happy!",
    "I'm going to keep learning!",
    "I'm going to master JavaScript!",
    "I'm going to master TypeScript!",
    "I'm going to master React!",
    "I'm going to master Node.js!",
    "I'm going to master Express!",
    "I'm going to master MongoDB!",
    "I'm going to master SQL!",
    "I'm going to master GraphQL!",
    "I'm going to master REST APIs!",
    "I'm going to master Git!",
    "I'm going to master Docker!",
    "I'm going to master Kubernetes!",
    "I'm going to master AWS!",
    "I'm going to master Azure!",
    "I'm going to master DevOps!",
    "I'm going to master Agile!",
    "I'm going to master Scrum!",
    "I'm going to master testing!",
    "I'm going to master debugging!"
];
// Used to generate random reactions
export const reactions = [
    "Great job!",
    "Well done!",
    "Keep it up!",
    "Fantastic!",
    "Amazing work!",
    "You're awesome!",
    "Impressive!",
    "Outstanding!",
    "Excellent!",
    "Superb!",
    "Bravo!",
    "You're doing great!",
    "Keep going!",
    "You're on fire!",
    "Way to go!",
    "You're killing it!",
    "You're crushing it!",
    "You're a star!",
    "You're unstoppable!",
    "You're a genius!"
];
export const emailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "protonmail.com",
    "zoho.com",
    "mail.com",
    "yandex.com",
    "gmx.com",
    "fastmail.com",
];
export function randomlySelectFromArray(int, arr) {
    const selected = [];
    for (let i = 0; i < int; i++) {
        selected.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return selected;
}
// Generate a random email domain
export function generateRandomEmailDomain() {
    return emailDomains[Math.floor(Math.random() * emailDomains.length)];
}
// Generate a random username
export function generateRandomUsername() {
    return usernames[Math.floor(Math.random() * usernames.length)];
}
// Generate random thoughts * int
export function generateRandomThoughts(int, userId, username) {
    const generatedThoughts = [];
    for (let i = 0; i < int; i++) {
        generatedThoughts.push({
            thoughtText: thoughts[Math.floor(Math.random() * thoughts.length)],
            username: username,
            userId: userId,
            reactions: generateRandomReactions(Math.floor(Math.random() * 3)),
        });
    }
    return generatedThoughts;
}
// Generate random reactions * int
export function generateRandomReactions(int) {
    const generatedReactions = [];
    for (let i = 0; i < int; i++) {
        generatedReactions.push({
            reactionId: new Types.ObjectId(),
            reactionBody: reactions[Math.floor(Math.random() * reactions.length)],
            username: generateRandomUsername(),
        });
    }
    return generatedReactions;
}
