import { Schema, model } from "mongoose";
import { User } from "../models/user";

const UserSchema = new Schema<User>(
  {
    userid: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    wishlists: [{ type: Schema.Types.ObjectId, ref: "Wishlists", default: [] }],
  },
  { collection: "dc_users" }
);

const UserModel = model<User>("User", UserSchema);

function index(): Promise<User[]> {
    return UserModel.find();
}
  
function get(userid: String): Promise<User> {
    return UserModel.find({ userid })
        .then((list) => list[0])
        .catch((err) => {
            throw `${userid} Not Found`;
        });
}
  
export default { index, get };