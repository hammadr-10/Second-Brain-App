import mongoose from 'mongoose';

const connectDB = async () => {
  const connectionUrl = process.env.MONGODB_CONNECTION_URL;
  if (!connectionUrl) {
    throw new Error("MONGODB_CONNECTION_URL is not defined in the environment variables.");
  }
  try {
    await mongoose.connect(connectionUrl);
    console.log("DB connected successfully!");
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
