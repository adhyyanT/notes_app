import mongoose, { InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default mongoose.model<User>('users', userSchema);
