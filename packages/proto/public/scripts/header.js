import { css, html, shadow, Events, Observer } from "@calpoly/mustang";
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
            <div class="header-right">
                <label>
                    <input id="dark-mode-toggle" type="checkbox" autocomplete="off" />
                    Dark mode
                </label>
                <a id="userid">
                    Hello, <span></span>
                </a>
                <a href="/login">
                  <button id="signout">Sign Out</button>
                </a>
            </div>
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
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px; /* Space between elements */
      margin-left: auto; /* Push container to the right */
    }

    .header-right label {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 16px;
        color: var(--header-text);
        cursor: pointer;
    }`;

  constructor() {
    super();
    shadow(this)
      .template(HeaderElement.template)
      .styles(reset.styles, HeaderElement.styles);

    this._userid = this.shadowRoot.querySelector("#userid span");
    this._signout = this.shadowRoot.querySelector("#signout");
    const darkModeToggle = this.shadowRoot.querySelector("#dark-mode-toggle");

    HeaderElement.initializeOnce();

    // Signout button listener
    this._signout.addEventListener("click", (event) => {
      if (Events && Events.relay) {
        Events.relay(event, "auth:message", ["auth/signout"]);
      } else {
        console.error("Events.relay is not defined");
      }
    });

    // Dark mode toggle listener
    darkModeToggle.addEventListener("change", (event) => {
      const darkModeEvent = new CustomEvent("darkmode:toggle", {
        detail: { enabled: event.target.checked },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(darkModeEvent);
    });
  }

  _authObserver = new Observer(this, "dreamin:auth");

  get userid() {
    return this._userid.textContent;
  }

  set userid(id) {
    if (id === "anonymous") {
      this._userid.textContent = "";
      this._signout.disabled = true;
    } else {
      this._userid.textContent = id;
      this._signout.disabled = false;
    }
  }

  get authorization() {
    return this._user?.authenticated
      ? { Authorization: `Bearer ${this._user.token}` }
      : null;
  }

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._user = user; // Define `_user` when observer provides data
      if (user && user.username !== this.userid) {
        this.userid = user.username;
      }
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
