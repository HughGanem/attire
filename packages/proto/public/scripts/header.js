import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
  static template = html`
    <template>
        <header>
            <a href="index.html" class="logo-container">
                <svg class="icon logo-icon">
                    <use href="icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <svg class="icon profile-icon">
                <use href="icons/accounts.svg#icon-profile" />
            </svg>
            <label>
                <input type="checkbox" autocomplete="off" />
                Dark mode
            </label>
        </header>
    </template>`;
  
  static styles = css`
    header {
        color: var(--white);
        background-color: var(--color-header);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        padding: 0 32px;
    }

    .logo-container {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
    }

    .logo-container h1 {
        margin: 0 0 0 10px;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 60px;
    }

    .logo-container .logo-icon {
        width: 80px;
        height: 80px;
        fill: white;
    }

    .profile-icon {
        width: 100px;
        height: 100px;
        fill: white;
    }`;

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(reset.styles, HeaderElement.styles);
  }
}