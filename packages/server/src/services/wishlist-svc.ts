import { Schema, model, Document } from "mongoose";
import { Wishlist } from "../models/wishlist"; // Assuming this interface matches the schema

interface WishlistDocument extends Wishlist, Document {}

const WishlistSchema = new Schema<WishlistDocument>(
  {
    listId: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Items", default: [] }],
  },
  { collection: "dc_wishlists" }
);

const WishlistModel = model<WishlistDocument>("Wishlist", WishlistSchema);

async function index(): Promise<Wishlist[]> {
  return WishlistModel.find().lean();
}

async function get(listId: string): Promise<Wishlist | null> {
  try {
    const list = await WishlistModel.findOne({ listId }).lean();
    if (!list) throw new Error(`${listId} Not Found`);
    return list;
  } catch (err) {
    console.error(err);
    throw new Error(`Error fetching wishlist with ID ${listId}: ${err}`);
  }
}

export default { index, get };