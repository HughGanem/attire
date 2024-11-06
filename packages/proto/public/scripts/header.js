import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {
  static template = html`
    <template>
        <header>
            <a href="/" class="logo-container">
                <svg class="icon logo-icon">
                    <use href="/icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <svg class="icon profile-icon">
                <use href="/icons/accounts.svg#icon-profile" />
            </svg>
            <label>
                <input id="dark-mode-toggle" type="checkbox" autocomplete="off" />
                Dark mode
            </label>
        </header>
    </template>`;
  
  static styles = css`
    header {
        color: var(--header-text);
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
        fill: var(--header-text);
    }

    .profile-icon {
        width: 100px;
        height: 100px;
        fill: var(--header-text);
    }`;

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(reset.styles, HeaderElement.styles);

    const darkModeToggle = this.shadowRoot.querySelector("#dark-mode-toggle");

    darkModeToggle.addEventListener("change", (event) => {
      const darkModeEvent = new CustomEvent("darkmode:toggle", {
        detail: { enabled: event.target.checked },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(darkModeEvent);
      event.stopPropagation();
    });
  }

  static isInitialized = false;

  static initializeOnce() {
    if (HeaderElement.isInitialized) return;
    HeaderElement.isInitialized = true;
    
    document.body.addEventListener("darkmode:toggle", (event) => {
      document.body.classList.toggle("dark-mode", event.detail.enabled);
    });
  }
}