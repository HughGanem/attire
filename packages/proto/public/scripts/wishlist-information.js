import { css, html, define, shadow, Observer, Form } from "@calpoly/mustang";

export class WishlistInformationElement extends HTMLElement {
    static uses = define({
        "mu-form": Form.Element
      });
    get src() {
        return this.getAttribute("src");
    }
    static template = html`
        <template>
            <section class="view">
                <button id="edit">Edit</button>
                <div class="tool-bar">
                    <div class="title-container">
                        <h1>
                            <slot name="wishlist-title">Default Name</slot>
                        </h1>
                    </div>

                    <div class="budget-container">
                        <h1>Budget:</h1>
                        <span>$<slot name="wishlist-budget">##.##</slot></span>
                    </div>
                </div>
            </section>
            <mu-form class="edit">
                <button id="view">View</button>
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
        </template>`;

    static styles = css`
        :host {
            display: contents;
        }
        
        :host([mode="edit"]),
        :host([mode="new"]) {
            --display-view-none: none;
        }
        
        :host([mode="view"]) {
            --display-editor-none: none;
        }
        section.view {
            display: var(--display-view-none, grid);
        }
        mu-form.edit {
            display: var(--display-editor-none, grid);
        }
        
        .tool-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        #edit{
            display: inline-block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: var(--color-background-page-alt);
            color: #333;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 18px;
            font-weight: bold;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        #view {
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
        
        .title-container h1 {
            font-family: 'Nunito Sans', sans-serif;
            font-size: 50px; /* Larger title */
            font-weight: bold;
            margin: 10px 0;
        }

        .budget-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Nunito Sans', sans-serif;
            font-size: 30px;
            margin-top: 20px;
        }

        .budget-container h1 {
            margin: 0;
            font-size: 35px; /* Emphasize budget header */
            font-weight: normal;
        }

        #edit:hover, #view:hover {
            background-color: #e0e0e0;
            transform: scale(1.05);
        }

        .edit {
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

        .edit label {
            display: flex;
            flex-direction: column;
            font-size: 18px;
            color: #333;
        }

        .edit label span {
            margin-bottom: 5px;
            font-weight: bold;
        }

        .edit input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 10px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .edit input:focus {
            border-color: #007bff;
            box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
            outline: none;
        }

        .edit input[type="file"] {
            padding: 5px;
        }

        .edit input:hover {
            border-color: #555;
        }
    `;  

    constructor() {
        super();
        shadow(this)
            .template(WishlistInformationElement.template)
            .styles(WishlistInformationElement.styles);
        this.mode = "view";
        
        this.addEventListener("mu-form:submit", (event) =>
            this.submit(this.src, event.detail)
        );

        this.editButton.addEventListener(
            "click",
            () => (this.mode = "edit")
        );

        this.viewButton.addEventListener(
            "click",
            () => (this.mode = "view")
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
        return this.shadowRoot.querySelector("mu-form.edit");
    }

    get viewButton() {
        return this.shadowRoot.getElementById("view");
    }

    get editButton() {
        return this.shadowRoot.getElementById("edit");
    }

    get mode() {
        return this.getAttribute("mode");
    }
      
    set mode(m) {
        this.setAttribute("mode", m);
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            this._user = user;
            if (this.src) this.hydrate(this.src); 
        });
    }
    
    hydrate(url) {
        fetch(url, { headers: this.authorization })
            .then((res) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json) => {
                this.renderSlots(json);
                this.form.init = json;
            })
            .catch((error) =>
                console.log(`Failed to render data from ${url}:`, error)
            );
    }

    submit(url, json) {
        fetch(url, {
            method: "PUT",
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
                this.renderSlots(updatedData);
                this.form.init = updatedData;
            })
            .catch((error) => {
                console.error(`Failed to update data at ${url}:`, error);
            })
            .finally(() => {
                this.mode = "view";
            });
    }
    

    renderSlots(data) {
        const itemSlots = {
            "wishlist-title": html`<span slot="wishlist-title">${data.name}</span>`,
            "wishlist-budget": html`<span slot="wishlist-budget">${data.budget.toFixed(2)}</span>`
        };

        this.replaceChildren();

        Object.keys(itemSlots).forEach((slotName) => {
            const slotContent = itemSlots[slotName];

            this.appendChild(slotContent);
        });
    }
}