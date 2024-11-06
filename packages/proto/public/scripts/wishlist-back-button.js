import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class WishlistBackButtonElement extends HTMLElement {
  static template = html`
    <template>
      <div class="button-container">
        <svg class="icon">
          <use href="icons/accounts.svg#icon-list" />
        </svg>
        <svg class="icon">
          <use href="icons/accounts.svg#icon-back-arrow" />
        </svg>
      </div>
    </template>`;

  static styles = css`
    .button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      width: 200px;
      height: 100px;
      margin: 10px auto;
    }

    .icon {
      fill: var(--color-text-main);
      width: 80px; 
      height: 80px;
      margin: 0 0;
      transition: transform 0.2s ease;
    }

    .button-container:hover .icon {
      transform: scale(1.2);
    }`;

  constructor() {
    super();
    shadow(this)
      .template(WishlistBackButtonElement.template)
      .styles(reset.styles, WishlistBackButtonElement.styles);
  }
}