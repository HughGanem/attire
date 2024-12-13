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
    case "item/create":
      createAndUpdateItem(message[1], user)
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
    case "wishlist/save":
      saveWishlist(message[1], user)
        .then((wishlist) =>
          apply((model) => ({ ...model, wishlist }))
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
    case "wishlist/create":
      createWishlist(message[1], user)
        .then((wishlist) =>
          apply((model) => ({ ...model, wishlist }))
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
  return selectWishlist(msg, user)
    .then((wishlist) => {
      if (wishlist && wishlist.itemids) {
        return Promise.all(
          wishlist.itemids.map((itemid) => 
            selectItem({ itemid: itemid }, user)
          )
        );
      }
      return [];
    })
    .then((items) => {
      console.log("Items:", items);
      return items as Item[];
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

function saveWishlist(
  msg: {
    listid: string;
    wishlist: Wishlist;
  },
  user: Auth.User
) {
  return fetch(`/api/wishlists/${msg.listid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.wishlist)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      else
        throw new Error(
          `Failed to save wishlist for ${msg.listid}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Wishlist;
      return undefined;
    });
}

function createWishlist(
  msg: {
    wishlist: Wishlist;
  },
  user: Auth.User
) {
  return fetch(`/api/wishlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.wishlist)
  })
    .then((response: Response) => {
      if (response.status === 201) return response.json();
      else
        throw new Error(
          `Failed to create wishlist for ${msg.wishlist.name}`
        );
    })
    .then((json: unknown) => {
      if (json) return json as Wishlist;
      return undefined;
    });
}

function createAndUpdateItem(msg: { listid: string; item: Item }, user: Auth.User) {
  return fetch(`/api/items/`, {
    method: "POST",
    headers: {
      ...Auth.headers(user),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(msg.item),
  })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((createdItem: Item) => {
      const newItemId = createdItem.itemid;

      const url = `/api/wishlists/${msg.listid}`;
      return fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...Auth.headers(user),
        },
      })
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch wishlist at ${url}`);
          }
          return response.json();
        })
        .then((data: Wishlist) => {
          const updatedItemIds = [...data.itemids, newItemId];
          console.log("ITEMIDS", updatedItemIds)
          return fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...Auth.headers(user),
            },
            body: JSON.stringify({ itemids: updatedItemIds }),
          }).then((response: Response) => {
            if (!response.ok) {
              throw new Error(`Failed to update wishlist at ${url}`);
            }
            return createdItem;
          });
        });
    })
    .catch((error: Error) => {
      console.error(`Failed to create and update item:`, error);
      throw error;
    });
}