import { Item, Wishlist } from "server/models";

export interface Model {
  item?: Item;
  itemList?: Item[];
  wishlist?: Wishlist;
  wishlistList?: Wishlist[];
}

export const init: Model = {};