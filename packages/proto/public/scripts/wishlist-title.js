import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class WishlistTitleElement extends HTMLElement {
  static template = html`
    <template>
      <div class="title-container">
        <h1>
            <slot name="wishlist-name">Default Name</slot>
        </h1>
      </div>
    </template>`;

  static styles = css`
    .title-container {
        display: flex;
        background-color: var(--color-background-page-alt);
        border-radius: 25px;
        max-width: 800px;
        max-height: 400px;
        flex-direction: column;
        margin: 30px auto 30px auto;
        text-align: center;
    }

    .title-container h1 {
        text-align: center;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 100px;
        color: var(--color-text-main);
        margin-top: 0;
        margin-bottom: 0;
    }`;

  constructor() {
    super();
    shadow(this)
      .template(WishlistTitleElement.template)
      .styles(reset.styles, WishlistTitleElement.styles);
  }
}