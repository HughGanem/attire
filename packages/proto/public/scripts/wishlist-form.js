import { css, html, define, shadow, Observer, Form } from "@calpoly/mustang";

export class WishlistFormElement extends HTMLElement {
    static uses = define({
        "mu-form": Form.Element
      });
    get src() {
        return this.getAttribute("src");
    }
    static template = html`
        <template>
            <mu-form class="new">
                <h2 class="form-title">Create a New Wishlist</h2>
                <div class="form-group">
                    <label>
                        <span>Name</span>
                        <input name="name" />
                    </label>
                    <label>
                        <span>Image Url</span>
                        <input name="imageUrl" />
                    </label>
                    <label>
                        <span>Budget</span>
                        <input name="budget" />
                    </label>
                </div>
            </mu-form>
        </template>
        `;

        static styles = css`
        .new {
            display: flex;
            flex-direction: column;
            max-width: 500px;
            margin: auto;
            padding: 20px;
            background-color: var(--color-background-page-alt);
            border-radius: 10px;
        }

        .form-title {
            font-size: 24px;
            text-align: left;
            margin-bottom: 20px;
        }

        .new label {
            align-items: right;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 10px;
        }

        .new label span {
            font-size: 22px;
            margin-right: 10px;
        }

        .new label input {
            padding: 8px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 200px;
        }

        .new input:focus {
            border-color: #007bff;
            outline: none;
        }
    `;    

    constructor() {
        super();
        shadow(this)
            .template(WishlistFormElement.template)
            .styles(WishlistFormElement.styles);
        
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
        console.log(url);
        console.log(json);
        fetch(url, {
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
                this.form.init = updatedData;
                window.location.reload()
        })
            .catch((error) => {
                console.error(`Failed to create wishlist at ${url}:`, error);
        })
    }
}