import express from "express";
import db from "./config/connection.js";
import routes from "./routes/index.js";
// Start the Mongoose database
await db();
// Set the port for the application & create an instance of express
const PORT = process.env.PORT || 3001;
const app = express();
// Add the necessary middleware to express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Start the application and listen on $PORT
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
