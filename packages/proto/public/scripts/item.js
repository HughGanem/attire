import { css, html, shadow } from "@calpoly/mustang";

export class ItemElement extends HTMLElement {
  static template = html`
    <template>
        <div class="information-container">
            <span class="information-title">
                <strong>
                    <slot name="item-name">Default Name</slot>
                </strong>
            </span>
            
            <div class="information-image">
                <slot name="item-image">***Featured Slot***</slot>
            </div>

            <div class="detail-container">
                <p class="detail">
                    <strong>Price: </strong>
                    <slot name="item-price">$##.##</slot>
                </p>
                
                <p class="detail">
                    <strong>Size: </strong>
                    <slot name="item-size">Default Size</slot>
                </p>
                
                <p class="detail">
                    <strong>Brand: </strong>
                    <slot name="item-brand">Default Brand</slot>
                </p>
                
                <p class="detail">
                    <strong>Store: </strong>
                    <slot name="item-store">Default Store</slot>
                </p>
                
                <p class="detail">
                    <strong>Style: </strong>
                    <slot name="item-style">Default Style of Clothing</slot>
                </p>
                
                <p class="detail">
                    <strong>Type of Clothing: </strong>
                    <slot name="item-type">Default Clothing Type</slot>
                </p>
            </div>
        </div>
    </template>`;

  static styles = css`
    .information-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px auto;
        max-width: 500px;
        padding: 20px;
        background-color: var(--color-background-page-alt);
        border-radius: 25px;
    }
  
    .information-title {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 40px;
        margin: 10px 0;
        text-align: center;
    }
  
    .information-image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        margin-bottom: 20px;
    }
  
    .information-image slot::slotted(img) {
        max-width: 80%;
        height: auto;
        border-radius: 25px;
    }
  
    .detail-container {
        width: 100%;
        text-align: left;
        padding: 0 20px;
    }
  
    .detail {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 30px;
        margin: 5px 0;
    }
  `;  

  constructor() {
    super();
    shadow(this)
      .template(ItemElement.template)
      .styles(ItemElement.styles);
  }
}