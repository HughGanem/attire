import { Events } from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;
  
    Events.relay(ev, "dark-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class DreamCartHeaderElement extends LitElement {
  render() {
    return html`
      <header>
            <a href="/" class="logo-container">
                <svg class="icon">
                  <use href="/icons/accounts.svg#icon-logo"></use>
                </svg>
                <h1 class="logo">DreamCart</h1>
            </a>
            <div class="header-right">
                <label
                    @change=${toggleDarkMode}>
                    <input type="checkbox" autocomplete="off" />
                    Dark mode
                </label>
                <a href="#" 
                  @click=${signOutUser} 
                  class="sign-out-link">
                  Sign out
                </a>

            </div>
        </header>
    `;
  }

  static styles = css`
    .sign-out-link {
      display: inline-block; /* Allows padding without breaking layout */
      color: var(--color-text-main); /* Fallback if variable not defined */
      background-color: var(--header-text);
      text-decoration: none; /* Removes underline */
      padding: 8px 16px; /* Adds clickable area */
      border: 1px solid var(--color-text-main); /* Matches link color */
      border-radius: 4px; /* Rounded edges */
      font-size: 1rem; /* Adjusts text size */
      transition: all 0.3s ease; /* Smooth hover effects */
    }

    .sign-out-link:hover {
      background-color: var(--color-text-main, #007BFF);
      color: var(--background-color, #FFF); /* Matches background */
      text-decoration: underline; /* Optionally add underline back */
    }

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

    .logo-container .icon {
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