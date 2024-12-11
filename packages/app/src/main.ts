import { Auth, Store, History, Switch, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { html, LitElement } from "lit";
import { DreamCartHeaderElement } from "./components/dreamcart-header";
import { ItemViewElement } from "./views/item-view";
import { HomeViewElement } from "./views/home-view";

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
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
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
  "home-view": HomeViewElement
});