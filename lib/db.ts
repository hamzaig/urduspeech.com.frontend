// MongoDB-based database service
export { mongodbDB as db } from "./mongodb-db";

// Initialize database connection
export async function initializeDB() {
  try {
    const connectDB = (await import("./mongodb")).default;
    await connectDB();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}
