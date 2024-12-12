import { LitElement, css, html } from "lit";

export class HomeButtonElement extends LitElement {
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
    }
  `;

  render() {
    return html`
      <div class="home-button-container">
        <a href="/app/wishlists">
          <svg class="icon">
            <use href="/icons/accounts.svg#icon-home"></use>
          </svg>
        </a>
      </div>
    `;
  }
}
