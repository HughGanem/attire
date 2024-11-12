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
var item_svc_exports = {};
__export(item_svc_exports, {
  default: () => item_svc_default
});
module.exports = __toCommonJS(item_svc_exports);
var import_mongoose = require("mongoose");
const ItemSchema = new import_mongoose.Schema(
  {
    itemid: { type: String, trim: true, unique: true },
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemSize: { type: String, required: true },
    itemBrand: { type: String, required: true },
    itemStore: { type: String, required: true },
    itemStyle: { type: String, required: true },
    itemType: { type: String, required: true },
    itemImageUrl: { type: String, required: true }
  },
  { collection: "dc_items" }
);
ItemSchema.pre("save", function(next) {
  if (!this.itemid && this.itemName) {
    this.itemid = this.itemName.replace(/\s(.)/g, (_, char) => char.toUpperCase()).replace(/\s+/g, "");
  }
  next();
});
const ItemModel = (0, import_mongoose.model)("Item", ItemSchema);
async function index() {
  return ItemModel.find().lean();
}
async function get(itemid) {
  try {
    const list = await ItemModel.findOne({ itemid }).lean();
    if (!list) throw new Error(`${itemid} Not Found`);
    return list;
  } catch (err) {
    console.error(err);
    throw new Error(`Error fetching wishlist with ID ${itemid}: ${err}`);
  }
}
function create(json) {
  const t = new ItemModel(json);
  return t.save();
}
function update(itemid, item) {
  return ItemModel.findOneAndUpdate({ itemid }, item, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${itemid} not updated`;
    else return updated;
  });
}
function remove(itemid) {
  return ItemModel.findOneAndDelete({ itemid }).then(
    (deleted) => {
      if (!deleted) throw `${itemid} not deleted`;
    }
  );
}
var item_svc_default = { index, get, create, update, remove };
