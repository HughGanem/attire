import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";
import type { Item } from "server/models";

export class WishlistViewElement extends View<Model, Msg> {
    @property({ attribute: "list-id", reflect: true })
    listid?: string;

    @state()
    get wishlist() {
        return this.model.wishlist;
    }

    @state()
    get items() {
    return this.model.itemList;
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
          name === "list-id" && 
          oldValue !== newValue && 
          newValue) {
          console.log("Wishlist Page:", newValue);
          this.dispatchMessage([
            "wishlist/select",
            { 
              listid: newValue 
            }
          ]);
          this.dispatchMessage([
            "wishlistItems/select",
            { 
              listid: newValue 
            }
          ]);
        }
      }


    render() {
        const wishlist = this.wishlist;
        const items = this.items;

        console.log("RENDER", this.listid, this.wishlist);

        const renderItems = (item: Item) => {
            return html`
                <a href="/app/items/${item.itemid}">
                    <div class="item-container">
                        <h2 class="itemName">
                            <span>${item.itemName}</span>
                        </h2>
                        <div class="itemImageUrl">
                            <img src="${item.itemImageUrl || '/default-image.jpg'}" alt="${item.itemName}" />
                        </div>
                        <p class="itemPrice">
                            Price: <span slot="product-price">$${item.itemPrice.toFixed(2)}</span>
                        </p>
                    </div>
                </a>
            `;
        };

        if (wishlist) {
            return html`
                <div class="tool-bar">
                    <div class="title-container">
                        <h1>
                            <span>${wishlist.name}</span>
                        </h1>
                    </div>

                    <div class="budget-container">
                        <h1>Budget:</h1>
                        <span>${(wishlist.budget).toFixed(2)}</span>
                    </div>
                </div>

                <div class="items-container">
                    ${items
                        ? items.map(renderItems)
                        : html`<p>No items in this wishlist</p>`}
                </div>
            `;
        } else {
            return html``;
        }
    }

    static styles = css`
        .items-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 20px auto;
        }

        .items-container a {
            text-decoration: none;
            color: var(--color-text-main);
            margin: 10px;
        }

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

        .itemName {
            font-family: "Nunito Sans", sans-serif;
            font-size: 40px;
            margin: 10px 0;
            text-decoration: none;
        }

        .itemImageUrl img {
            width: 100%;
            height: 100%;
            max-width: 450px;
            max-height: 400px;
            object-fit: cover;
            border-radius: 25px;
            transition: transform 0.2s;
        }

        .itemPrice {
            font-family: "Nunito Sans", sans-serif;
            font-size: 30px;
            margin: 10px 0;
        }

        .item-container:hover {
            box-shadow: 0 0 20px var(--color-header);
            transform: scale(1.05);
        }

        .item-container:hover .itemImageUrl img {
            transform: scale(1.05);
        }

        .title-container h1 {
            font-family: "Nunito Sans", sans-serif;
            font-size: 50px;
            font-weight: bold;
            margin: 10px 0;
        }

        .budget-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Nunito Sans", sans-serif;
            font-size: 30px;
            margin-top: 20px;
        }

        .budget-container h1 {
            margin: 0;
            font-size: 35px;
            font-weight: normal;
        }

        .tool-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    `;
}