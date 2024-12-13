import { css, html, define, shadow, Observer, Form } from "@calpoly/mustang";

export class ItemFormElement extends HTMLElement {
    static uses = define({
        "mu-form": Form.Element
      });
    get src() {
        return this.getAttribute("src");
    }
    static template = html`
        <template>
            <mu-form class="new">
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
        </template>
        `;
        static styles = css`
        .new {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            max-width: 500px;
            margin: 20px auto;
            padding: 20px;
            background-color: var(--color-background-page-alt);
            border-radius: 25px;
            font-family: 'Nunito Sans', sans-serif;
        }

        .new label {
            display: flex;
            flex-direction: column;
            font-size: 18px;
            color: #333;
        }

        .new label span {
            margin-bottom: 5px;
            font-weight: bold;
        }

        .new input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 10px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .new input:focus {
            border-color: #007bff;
            box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
            outline: none;
        }

        .new input[type="file"] {
            padding: 5px;
        }

        .new input:hover {
            border-color: #555;
        }

        .new button {
            display: inline-block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: var(--color-background-page);
            color: #333;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 18px;
            font-weight: bold;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .new button:hover {
            background-color: #e0e0e0;
            transform: scale(1.05);
        }
    `;    

    constructor() {
        super();
        shadow(this)
            .template(ItemFormElement.template)
            .styles(ItemFormElement.styles);
        
        this.addEventListener("mu-form:submit", (event) =>
            this.submit(this.src, event.detail)
        );
    }

    _authObserver = new Observer(this, "dreamin:auth");

    get authorization() {
        return (
        this._user?.authenticated && {
            Authorization: `Bearer ${this._user.token}`,
        }
        );
    }

    get form() {
        return this.shadowRoot.querySelector("mu-form.new");
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            this._user = user;
        });
    }

    submit(url, json) {
        fetch('/api/items/', {
            method: "POST",
            headers: {
                ...this.authorization,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(json)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Status: ${res.status} - ${res.statusText}`);
            }
            return res.json();
        })
        .then((updatedData) => {
            const newitemid = updatedData.itemid;
            console.log("Item ID:", newitemid); 
    
            this.form.init = updatedData;
    
            fetch(url, {
                method: "GET",
                headers: {
                    ...this.authorization,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                const updatedItemIds = [...data.itemids, newitemid];
                return fetch(url, {
                    method: "PUT",
                    headers: {
                        ...this.authorization,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ itemids: updatedItemIds })
                });
            })
            .then(response => response.json())
            .then(updatedItemIds => {
                console.log('Updated itemids:', updatedItemIds);
                window.location.reload();
            })
            .catch(error => console.error('Error updating itemids:', error));
        })
        .catch((error) => {
            console.error(`Failed to create wishlist at ${url}:`, error);
        });
    }    
}