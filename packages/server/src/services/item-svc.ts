import { Schema, model } from "mongoose";
import { Item } from "../models/item";

const ItemSchema = new Schema<Item>({
  itemid: { type: String, trim: true, unique: true },
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  itemSize: { type: String, required: true },
  itemBrand: { type: String, required: true },
  itemStore: { type: String, required: true },
  itemStyle: { type: String, required: true },
  itemType: { type: String, required: true },
  itemImageUrl: { type: String, required: true },
},
{ collection: "dc_items" });

ItemSchema.pre("save", function (next) {
  if (!this.itemid && this.itemName) {
    this.itemid = this.itemName
      .replace(/\s(.)/g, (_, char) => char.toUpperCase())
      .replace(/\s+/g, "");
  }
  next();
});

const ItemModel = model<Item>("Item", ItemSchema);

async function index(): Promise<Item[]> {
  return ItemModel.find().lean();
}

async function get(itemid: string): Promise<Item | null> {
  try {
    const list = await ItemModel.findOne({ itemid }).lean();
    if (!list) throw new Error(`${itemid} Not Found`);
    return list;
  } catch (err) {
    console.error(err);
    throw new Error(`Error fetching wishlist with ID ${itemid}: ${err}`);
  }
}

function create(json: Item): Promise<Item> {
  const t = new ItemModel(json);
  return t.save();
}

function update(
  itemid: String,
  item: Item
): Promise<Item> {
  return ItemModel.findOneAndUpdate({ itemid }, item, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${itemid} not updated`;
    else return updated as Item;
  });
}

function remove(itemid: String): Promise<void> {
  return ItemModel.findOneAndDelete({ itemid }).then(
    (deleted) => {
      if (!deleted) throw `${itemid} not deleted`;
    }
  );
}

export default { index, get, create, update, remove };