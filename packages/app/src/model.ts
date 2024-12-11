import { Item, Wishlist } from "server/models";

export interface Model {
  item?: Item;
  wishlist?: Wishlist ;
}

export const init: Model = {};