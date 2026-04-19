import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log('Database Connected');
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
  } catch (error) {
    console.log("DB ERROR:", error);
  }
};

export default connectDB;