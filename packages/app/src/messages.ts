import { Item, Wishlist } from "server/models";

export type Msg =
  | ["item/select", { itemid: string }]
  | ["item/save",
    {
      itemid: string;
      item: Item;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["wishlistList/select"]
  | ["wishlist/select", { listid: string}]
  | ["wishlist/save",
    {
      listid: string;
      wishlist: Wishlist;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ]
  | ["wishlist/create", {
    wishlist: Wishlist;
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;
  }]
  | ["wishlistItems/select", { listid: string}];