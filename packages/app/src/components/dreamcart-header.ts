import { Events } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;
  
    Events.relay(ev, "dark-mode", { checked });
}

export class DreamCartHeaderElement extends LitElement {
  render() {
    return html`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon logo-icon">
                    <use src="/icons/accounts.svg#icon-logo" />
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${toggleDarkMode}>
                    <input type="checkbox" autocomplete="off" />
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
    `;
  }

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
    }
  `;
  
  static initializeOnce() {
    function toggleDarkMode(
      page: HTMLElement,
      checked: boolean
    ) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}