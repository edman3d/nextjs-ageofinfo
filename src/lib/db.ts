import mongoose, { Connection } from "mongoose";
import env from "@/utils/validateEnv";

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function connectToMongoDB() {
    console.log('NODE_ENV :>> ', env.NODE_ENV);
    console.log('env.MONGODB_URI :>> ', env.MONGODB_URI);
    // If a cached connection exists, return it
    if (cachedConnection) {
        console.log("Using cached db connection");
        return cachedConnection;
    }
    try {
        // If no cached connection exists, establish a new connection to MongoDB
        const cnx = await mongoose.connect(env.MONGODB_URI);
        // Cache the connection for future use
        cachedConnection = cnx.connection;
        // Log message indicating a new MongoDB connection is established
        console.log("New mongodb connection established");
        // Return the newly established connection
        return cachedConnection;
    } catch (error) {
        // If an error occurs during connection, log the error and throw it
        console.log(error);
        throw error;
    }
}