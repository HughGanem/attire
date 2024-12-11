import { Auth, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { DreamCartHeaderElement } from "./components/dreamcart-header";
import { ItemViewElement } from "./views/item-view";

class AppElement extends LitElement {
  static uses = define({
    "item-view": ItemViewElement
  });

  protected render() {
    return html`
      <item-view></item-view>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    DreamCartHeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "dreamin-app": AppElement,
  "dreamcart-header": DreamCartHeaderElement
});