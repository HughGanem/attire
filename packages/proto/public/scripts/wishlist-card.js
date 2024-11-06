import { css, html, shadow } from "@calpoly/mustang";

export class WishlistCardElement extends HTMLElement {
  static template = html`
    <template>
      <div class="wishlist">
        <h2 class="wishlist-title">
          <slot name="wishlist-title">Default Title</slot>
        </h2>
        <div class="wishlist-image">
          <slot name="wishlist-image">***Image Slot***</slot>
        </div>
      </div>
    </template>`;
  
  static styles = css`

    .wishlist {
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      height: 500px;
      width: 500px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      padding: 20px;
      margin: 10px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .wishlist-title {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 40px;
      margin: 10px 0;
      text-decoration: none;
    }

    .wishlist-image slot::slotted(img) {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 25px;
      transition: transform 0.2s;
    }

    .wishlist:hover {
      box-shadow: 0 0 20px var(--color-header);
      transform: scale(1.05);
    }

    .wishlist:hover .wishlist-image slot::slotted(img) {
      transform: scale(1.05);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(WishlistCardElement.template)
      .styles(WishlistCardElement.styles);
  }
}