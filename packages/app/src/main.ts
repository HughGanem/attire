import { Auth, Store, History, Switch, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { html, LitElement } from "lit";
import { DreamCartHeaderElement } from "./components/dreamcart-header";
import { ItemViewElement } from "./views/item-view";
import { HomeViewElement } from "./views/home-view";
import { WistlistsViewElement } from "./views/wishlists-view";
import { WishlistViewElement } from "./views/wishlist-view";

const routes: Switch.Route[] = [
  {
    auth: "protected",
    path: "/app/items/:id",
    view: (params: Switch.Params) => html`
      <item-view item-id=${params.id}></tour-view>
    `
  },
  {
    auth: "protected",
    path: "/app/items/:id/edit",
    view: (params: Switch.Params) => html`
      <item-view edit item-id=${params.id}></tour-view>
    `
  },
  {
    auth: "protected",
    path: "/app/wishlists/:id",
    view: (params: Switch.Params) => html`
      <wishlist-view list-id=${params.id}></wishlist-view>
    `
  },
  {
    auth: "protected",
    path: "/app/wishlists/:id/edit",
    view: (params: Switch.Params) => html`
      <wishlist-view edit list-id=${params.id}></wishlist-view>
    `
  },
  {
    auth: "protected",
    path: "/app/wishlists",
    view: () => html`
      <wishlists-view></wishlists-view>
    `
  },
  {
    path: "/",
    redirect: "/app/wishlists"
  }
];

class AppElement extends LitElement {
  render() {
    return html`<mu-switch></mu-switch>`;
  }

  connectedCallback() {
    super.connectedCallback();
    DreamCartHeaderElement.initializeOnce();
  }
}


define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "dreamin:auth");
    }
  },
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "dreamin:history", "dreamin:auth");
    }
  },
  "dreamin-app": AppElement,
  "dreamcart-header": DreamCartHeaderElement,
  "item-view": ItemViewElement,
  "home-view": HomeViewElement,
  "wishlists-view" : WistlistsViewElement,
  "wishlist-view" : WishlistViewElement
});