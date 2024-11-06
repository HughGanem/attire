import { css, html, shadow } from "@calpoly/mustang";

export class ItemCardElement extends HTMLElement {
  static template = html`
    <template>
      <div class="item-container">
          <h2 class="item-name">
              <slot name="product-title">Default Product</slot>
          </h2>
          <div class="item-image">
            <slot name="item-image">***Featured Slot***</slot>
          </div>
          <p class="item-price">
            Price: <slot name="product-price">$##.##</slot>
          </p>
      </div>
    </template>`;

  static styles = css`

    .item-container {
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
      height: 600px;
      width: 500px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      padding: 20px;
      margin: 10px auto;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .item-name {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 40px;
      margin: 10px 0;
      text-decoration: none;
    }

    .item-image slot::slotted(img) {
      width: 100%;
      height: 100%;
      max-width: 450px;
      max-height: 400px;
      object-fit: cover;
      border-radius: 25px;
      transition: transform 0.2s;
    }

    .item-price {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 30px;
      margin: 10px 0;
    }

    .item-container:hover {
      box-shadow: 0 0 20px var(--color-header);
      transform: scale(1.05);
    }

    .item-container:hover .item-image slot::slotted(img) {
      transform: scale(1.05);
    }`;

  constructor() {
    super();
    shadow(this)
      .template(ItemCardElement.template)
      .styles(ItemCardElement.styles);
  }
}