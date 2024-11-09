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
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    store: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true }
  },
  { collection: "dc_items" }
);
const ItemModel = (0, import_mongoose.model)("User", ItemSchema);
function index() {
  return ItemModel.find();
}
function get(itemid) {
  return ItemModel.find({ itemid }).then((list) => list[0]).catch((err) => {
    throw `${itemid} Not Found`;
  });
}
var item_svc_default = { index, get };
