// import { Item, Wishlist } from "server/models";

export type Msg =
  | ["item/select", { itemid: string }]
  | ["wishlistList/select"]
  | ["wishlist/select", { listid: string}]
  | ["wishlistItems/select", { listid: string}];