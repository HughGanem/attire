import { Auth, Update } from "@calpoly/mustang";
import { Item, Wishlist } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "item/select":
      selectItem(message[1], user).then((item) =>
        apply((model) => ({ ...model, item }))
      );
      break;
    case "item/save":
      saveItem(message[1], user)
        .then((item) =>
          apply((model) => ({ ...model, item }))
        )
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "wishlistList/select":
      selectWishlists(user).then((wishlistList: Wishlist[] | undefined) =>
        apply((model) => ({ ...model, wishlistList }))
      );
      break;
    case "wishlist/select":
      selectWishlist(message[1], user).then((wishlist) =>
        apply((model) => ({ ...model, wishlist }))
      );
      break;
    case "wishlistItems/select":
      selectWishlistItems(message[1], user).then((itemList) =>
        apply((model) => ({ ...model, itemList }))
      );
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function selectItem(msg: { itemid: string }, user: Auth.User) {
  return fetch(`/api/items/${msg.itemid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Item:", json);
        return json as Item;
      }
    });
}

function selectWishlists(user: Auth.User) {
  return fetch(`/api/wishlists`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status !== 200)
        throw `Failed to load wishlists`;
      return response.json();
    })
    .then((json: unknown) => {
      console.log("JSON Returned: ", json);
      if (json) {
        console.log("MAKE WISHLIST: ", json as Wishlist[]);
        return json as Wishlist[];
      }
    });
}

function selectWishlist(msg: { listid: string }, user: Auth.User) {
  return fetch(`/api/wishlists/${msg.listid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Wishlist:", json);
        return json as Wishlist;
      }
    });
}

function selectWishlistItems(msg: { listid: string }, user: Auth.User) {
  return selectWishlist(msg, user)  // Fetch the wishlist
    .then((wishlist) => {
      if (wishlist && wishlist.itemids) {
        // Loop through each itemid in the wishlist and fetch the item
        return Promise.all(
          wishlist.itemids.map((itemid) => 
            selectItem({ itemid: itemid }, user)  // Fetch each item
          )
        );
      }
      return [];
    })
    .then((items) => {
      console.log("Items:", items);
      return items as Item[];  // Return the list of items
    });
}

function saveItem(
  msg: {
    itemid: string;
    item: Item;
  },
  user: Auth.User
) {
  return fetch(`/api/items/${msg.itemid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.item)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save item for ${msg.itemid}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Item;
      return undefined;
    });
}