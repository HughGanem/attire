import { Schema, model } from "mongoose";
import { Wishlist } from "../models/index";

const WishlistSchema = new Schema<Wishlist>(
  {
    listid: { type: String, trim: true},
    name: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    itemids: [{ type: String }],
    username: { type: String, required: true, trim: true },
  },
  { collection: "dc_wishlists" }
);

WishlistSchema.pre("save", function (next) {
  if (!this.listid) {
    if (this.name) {
      this.listid = this.name
        .replace(/\s(.)/g, (_, char) => char.toUpperCase()) // capitalize words
        .replace(/\s+/g, ""); // remove spaces
    } else {
      return next(new Error("Cannot save wishlist: 'name' is required to generate a 'listid'."));
    }
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
  if (!json.name) {
    return Promise.reject(new Error("Cannot create wishlist: 'name' is required."));
  }
  const wishlist = new WishlistModel(json);
  return wishlist.save();
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