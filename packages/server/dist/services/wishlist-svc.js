"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var wishlist_svc_exports = {};
__export(wishlist_svc_exports, {
  default: () => wishlist_svc_default
});
module.exports = __toCommonJS(wishlist_svc_exports);
var import_mongoose = require("mongoose");
const WishlistSchema = new import_mongoose.Schema(
  {
    listid: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    itemids: [{ type: String }],
    username: { type: String, required: true, trim: true }
  },
  { collection: "dc_wishlists" }
);
WishlistSchema.pre("save", function(next) {
  if (!this.listid) {
    if (this.name) {
      this.listid = this.name.replace(/\s(.)/g, (_, char) => char.toUpperCase()).replace(/\s+/g, "");
    } else {
      return next(new Error("Cannot save wishlist: 'name' is required to generate a 'listid'."));
    }
  }
  next();
});
const WishlistModel = (0, import_mongoose.model)("Wishlist", WishlistSchema);
async function index() {
  return WishlistModel.find().lean();
}
async function get(listid) {
  try {
    const list = await WishlistModel.findOne({ listid }).lean();
    if (!list) throw new Error(`${listid} Not Found`);
    return list;
  } catch (err) {
    console.error(err);
    throw new Error(`Error fetching wishlist with ID ${listid}: ${err}`);
  }
}
function create(json) {
  if (!json.name) {
    return Promise.reject(new Error("Cannot create wishlist: 'name' is required."));
  }
  const wishlist = new WishlistModel(json);
  return wishlist.save();
}
function update(listid, wishlist) {
  return WishlistModel.findOneAndUpdate({ listid }, wishlist, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${listid} not updated`;
    else return updated;
  });
}
function remove(listid) {
  return WishlistModel.findOneAndDelete({ listid }).then(
    (deleted) => {
      if (!deleted) throw `${listid} not deleted`;
    }
  );
}
var wishlist_svc_default = { index, get, create, update, remove };
