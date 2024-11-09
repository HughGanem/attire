import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HomeButtonElement extends HTMLElement {
  static template = html`
    <template>
      <div class="home-button-container">
        <a href="/home.html">
          <svg class="icon">
            <use href="/icons/accounts.svg#icon-home" />
          </svg>
        </a>
      </div>
    </template>`;

  static styles = css`
    .home-button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      width: 100px;
      height: 100px;
      margin: 40px auto;
    }

    .icon {
      fill: var(--color-text-main);
      width: 80px;
      height: 80px;
      margin: auto;
      transition: transform 0.2s ease;
    }

    .home-button-container:hover .icon {
      transform: scale(1.2);
    }`;

  constructor() {
    super();
    shadow(this)
      .template(HomeButtonElement.template)
      .styles(reset.styles, HomeButtonElement.styles);
  }
}