import { Schema, model } from "mongoose";
import { Item } from "../models/item";

const ItemSchema = new Schema<Item>(
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

const ItemModel = model<Item>("User", ItemSchema);

function index(): Promise<Item[]> {
    return ItemModel.find();
}
  
function get(itemid: String): Promise<Item> {
    return ItemModel.find({ itemid })
        .then((list) => list[0])
        .catch((err) => {
            throw `${itemid} Not Found`;
        });
}
  
export default { index, get };