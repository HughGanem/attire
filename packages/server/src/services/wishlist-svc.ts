import { Schema, model } from "mongoose";
import { Wishlist } from "../models/wishlist";

const WishlistSchema = new Schema<Wishlist>(
  {
    listid: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        brand: { type: String, required: true },
        store: { type: String, required: true },
        style: { type: String, required: true },
        type: { type: String, required: true },
        imageUrl: { type: String, required: true }
      }
    ]
  },
  { collection: "dc_wishlists" }
);

const WishlistModel = model<Wishlist>("Wishlist", WishlistSchema);

async function index(): Promise<Wishlist[]> {
  return WishlistModel.find().lean();
}

async function get(listid: string): Promise<Wishlist | null> {
  try {
    const list = await WishlistModel.findOne({ listid }).lean();
    if (!list) throw new Error(`${listid} Not Found`);
    return list;
  } catch (err) {
    console.error(err);
    throw new Error(`Error fetching wishlist with ID ${listid}: ${err}`);
  }
}

function create(json: Wishlist): Promise<Wishlist> {
  const t = new WishlistModel(json);
  return t.save();
}

function update(
  listid: String,
  wishlist: Wishlist
): Promise<Wishlist> {
  return WishlistModel.findOneAndUpdate({ listid }, wishlist, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${listid} not updated`;
    else return updated as Wishlist;
  });
}

function remove(listid: String): Promise<void> {
  return WishlistModel.findOneAndDelete({ listid }).then(
    (deleted) => {
      if (!deleted) throw `${listid} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };