import { Schema, model } from "mongoose";
import { Wishlist, Item } from "../models/index";
import ItemModel from "./item-svc";

const WishlistSchema = new Schema<Wishlist>(
  {
    listid: { type: String, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    itemids: [{ type: String }],
  },
  { collection: "dc_wishlists" }
);

WishlistSchema.pre("save", function (next) {
  if (!this.listid && this.name) {
    this.listid = this.name
      .replace(/\s(.)/g, (_, char) => char.toUpperCase())
      .replace(/\s+/g, "");
  }
  next();
});

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