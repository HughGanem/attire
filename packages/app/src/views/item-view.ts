import { View, define, Form, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";
import { HomeButtonElement } from "../components/home-button.ts";
import { Item } from "server/models";

export class ItemViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
    "home-button": HomeButtonElement
  });

  @property({ attribute: "item-id" })
  itemid = "";

  @property({ type: Boolean })
  edit = false;

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
      if (this.edit) {
        return html`
          <home-button></home-button>
          <div class="link-container">
            <a href="/app/items/${this.itemid}" class="view-link">
              View
            </a>
          </div>
          <div class="form-container">
            <mu-form 
              .init=${this.item}
              @mu-form:submit=${this._handleSubmit}>
              <label>
                <span>Name</span>
                <input name="itemName" />
              </label>
              <label>
                <span>Image</span>
                <input name="itemImageUrl" />
              </label>
              <label>
                <span>Price</span>
                <input name="itemPrice" />
              </label>
              <label>
                <span>Size</span>
                <input name="itemSize" />
              </label>
              <label>
                <span>Brand</span>
                <input name="itemBrand" />
              </label>
              <label>
                <span>Store</span>
                <input name="itemStore" />
              </label>
              <label>
                <span>Style</span>
                <input name="itemStyle" />
              </label>
              <label>
                <span>Type of piece</span>
                <input name="itemType" />
              </label>
            </mu-form>
          </div>
        `
      } else {
        return html`
          <home-button></home-button>
          <div class="link-container">
            <a href="/app/items/${this.itemid}/edit" class="view-link">
              Edit
            </a>
          </div>
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
          </div>`;
      }
    } else {
      return html``;
    }
  }

  static styles = css`
    .link-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 125px;
      margin: 40px auto;
      background-color: var(--color-background-page-alt);
      border-radius: 25px;
    }

    .view-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 60px;
      font-weight: bold;
      text-decoration: none; 
      transition: background-color 0.3s ease, transform 0.2s ease;
      text-align: center;
    }

    .link-container:hover,
    .link-container:focus {
      background-color: #005fa3; /* Darker shade for hover */
      transform: translateY(-2px); /* Subtle lift */
      outline: none;
    }

    .link-container:active {
      background-color: #00457a; /* Even darker shade */
      transform: translateY(1px); /* Slight depress effect */
    }

    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    mu-form {
      display: flex;
      flex-direction: column;
      gap: 1rem; /* Add spacing between labels */
      width: 100%;
      max-width: 400px; /* Optional max-width for form */
      background: white; /* Optional background for form */
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      font-size: 1rem;
      color: #333;
    }

    input {
      margin-top: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    input:focus {
      outline: none;
      border-color: #0078d4; /* Optional focus color */
      box-shadow: 0 0 4px rgba(0, 120, 212, 0.3);
    }
      
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

  _handleSubmit(event: Form.SubmitEvent<Item>) {
    this.dispatchMessage([
      "item/save",
      {
        itemid: this.itemid,
        item: event.detail,
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: `/app/items/${this.itemid}`
          }),
        onFailure: (error: Error) =>
          console.log("ERROR:", error)
      }
    ]);
  }
}

