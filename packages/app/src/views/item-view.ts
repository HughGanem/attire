import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

export class ItemViewElement extends View<Model, Msg> {
  @property({ attribute: "item-id", reflect: true })
  itemid?: string;

  @state()
  get item() {
    return this.model.item;
  }

  constructor() {
    super("dreamin:model");
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    console.log("ATTRIBUTE CHANGED", name, oldValue, newValue);
    if (
      name === "item-id" && 
      oldValue !== newValue && 
      newValue) {
      console.log("Item Page:", newValue);
      this.dispatchMessage([
        "item/select",
        { 
          itemid: newValue 
        }
      ]);
    }
  }

  render() {
    const item = this.item;

    console.log("RENDER", this.itemid, this.item);

    if (item) {
      return html`
      <div class="information-container">
        <span class="information-title">
          <strong><span>${item.itemName}</span></strong>
        </span>

        <div class="information-image">
          <img src="${item.itemImageUrl}" alt="${item.itemName}" />
        </div>

        <div class="detail-container">
          <p class="detail"><strong>Price: </strong>$<span>${(item.itemPrice || 0).toFixed(2)}</span></p>
          <p class="detail"><strong>Size: </strong><span>${item.itemSize}</span></p>
          <p class="detail"><strong>Brand: </strong><span>${item.itemBrand}</span></p>
          <p class="detail"><strong>Store: </strong><span>${item.itemStore}</span></p>
          <p class="detail"><strong>Style: </strong><span>${item.itemStyle}</span></p>
          <p class="detail"><strong>Type of Clothing: </strong><span>${item.itemType}</span></p>
        </div>
      </div>
    `;
    } else {
      return html``;
    }
  }

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

    .information-image img {
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
}