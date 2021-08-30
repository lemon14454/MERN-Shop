import { model, Model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: Boolean;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserInterface>("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

const User: Model<UserInterface> = model("User", UserSchema);

export default User;
