import { View, define, Form, History } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";
import type { Wishlist, Item } from "server/models";
import { HomeButtonElement } from "../components/home-button.ts";

export class WishlistViewElement extends View<Model, Msg> {
    static uses = define({
        "home-button": HomeButtonElement
    });

    @property({ attribute: "list-id" })
    listid = "";

    @property({ type: Boolean })
    edit = false;

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
            if (this.edit) {
                return html`
                    <home-button></home-button>
                    <div class="link-container">
                        <a href="/app/wishlists/${this.listid}" class="view-link">
                            View
                        </a>
                    </div>
                    <div class="form-container">
                        <mu-form .init=${this.wishlist} @mu-form:submit=${this._handleSubmit}>
                            <label>
                                <span>Name</span>
                                <input name="name" />
                            </label>
                            <label>
                                <span>Budget</span>
                                <input name="budget" />
                            </label>
                            <label>
                                <span>Image</span>
                                <input name="imageUrl" />
                            </label>
                        </mu-form>
                    </div>

                    <div class="items-container">
                        ${items
                            ? items.map(renderItems)
                            : html`<p>No items in this wishlist</p>`}
                    </div>
                    <div class="form-container">
                        <h2>Create a Wishlist</h2>
                        <mu-form @mu-form:submit=${this._handleSubmit}>
                            <label>
                                <span>Name</span>
                                <input name="itemName" />
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
                                <span>Type</span>
                                <input name="itemType" />
                            </label>
                            <label>
                                <span>Image</span>
                                <input name="itemImageUrl" />
                            </label>
                        </mu-form>
                    </div>
                `;
            } else {
                return html`
                    <home-button></home-button>
                    <div class="link-container">
                        <a href="/app/wishlists/${this.listid}/edit" class="view-link">
                            Edit
                        </a>
                    </div>
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
                    <div class="form-container">
                        <h2>Create an Item</h2>
                        <mu-form @mu-form:submit=${this._handleCreateSubmit}>
                            <label>
                                <span>Name</span>
                                <input name="itemName" />
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
                                <span>Type</span>
                                <input name="itemType" />
                            </label>
                            <label>
                                <span>Image</span>
                                <input name="itemImageUrl" />
                            </label>
                        </mu-form>
                    </div>
                `;
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

        .link-container:hover, .link-container:focus {
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
        .form-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 30px auto; /* Adds spacing around the form */
        }

        .form-container h2 {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 28px;
            color: var(--color-text-main);
            margin-bottom: 1rem; /* Adds spacing between the title and form */
        }

        mu-form {
            display: flex;
            flex-direction: column;
            gap: 1rem; /* Adds spacing between form fields */
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
    `;

    _handleCreateSubmit(event: Form.SubmitEvent<Item>) {
        this.dispatchMessage([
          "item/create",
          {
            listid: this.listid,
            item: event.detail,
            onSuccess: () => {
                this.dispatchMessage(["wishlist/select", { listid: this.listid }]);
                History.dispatch(this, "history/navigate", {
                  href: `/app/wishlists/${this.listid}`
                });
            },
            onFailure: (error: Error) =>
              console.log("ERROR:", error)
          }
        ]);
    }

    _handleSubmit(event: Form.SubmitEvent<Wishlist>) {
        this.dispatchMessage([
          "wishlist/save",
          {
            listid: this.listid,
            wishlist: event.detail,
            onSuccess: () =>
              History.dispatch(this, "history/navigate", {
                href: `/app/wishlists/${this.listid}`
              }),
            onFailure: (error: Error) =>
              console.log("ERROR:", error)
          }
        ]);
    }
}