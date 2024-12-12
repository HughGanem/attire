import { Item } from "server/models";

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
  | ["wishlistItems/select", { listid: string}];