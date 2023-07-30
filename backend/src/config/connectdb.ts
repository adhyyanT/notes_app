import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.mongo_uri!);
    console.log(`connected to ${res.connection.db.databaseName}`);
  } catch (error) {
    console.error(error);
  }
};
