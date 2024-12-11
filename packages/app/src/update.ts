import { Auth, Update } from "@calpoly/mustang";
import { Item } from "server/models";
import { Msg } from "./messages";
import { Model } from "./model";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "item/select":
      console.log("Hit the update");
      selectItem(message[1], user).then((item) =>
        apply((model) => ({ ...model, item }))
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