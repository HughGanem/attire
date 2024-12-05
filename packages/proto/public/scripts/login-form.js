import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class LoginForm extends HTMLElement {
  static template = html`
      <template>
        <div class="login-container">
          <slot name="title">
            <h3>Sign in with Username and Password</h3>
          </slot>
          <form>
            <label>
              <span>
                <slot name="username">Username</slot>
              </span>
              <input name="username" autocomplete="off" />
            </label>
            <label>
              <span>
                <slot name="password">Password</slot>
              </span>
              <input type="password" name="password" />
            </label>
            <slot name="submit">
              <button type="submit">Sign In</button>
            </slot>
          </form>
        </div>
      </template>
    `;

    static styles = css`
      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        max-width: 300px; /* Reduced the width of the container */
        padding: 20px;
        background-color: var(--color-background-page-alt);
        border-radius: 25px;
        box-shadow: 0 0 10px var(--color-header);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        text-align: center; /* Centers all text within the container */
      }

      form {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      label {
        margin-bottom: 15px;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 18px;
        color: black; /* Sets the label text to black */
        display: flex;
        flex-direction: column;
        text-align: center; /* Centers the text */
      }

      input {
        padding: 10px;
        font-size: 16px;
        border: 1px solid var(--color-header);
        border-radius: 5px;
        transition: border-color 0.2s ease;
        width: 80%; /* Makes the input boxes narrower */
        margin: 0 auto; /* Centers the input boxes */
      }

      input:focus {
        border-color: var(--color-header-hover);
        outline: none;
      }

      button {
        padding: 10px 20px;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 18px;
        color: #fff;
        background-color: var(--color-header);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        width: 80%; /* Matches the input width */
        margin: 10px auto; /* Centers the button */
      }

      button:hover {
        transform: scale(1.05);
      }

      h3 {
        font-family: 'Nunito Sans', sans-serif;
        font-size: 24px;
        color: var(--header-text);
        margin-bottom: 20px;
        text-align: center; /* Centers the heading */
      }
    `;


    get form() {
        return this.shadowRoot.querySelector("form");
    }

    constructor() {
        super();

        shadow(this)
        .template(LoginForm.template)
        .styles(reset.styles, LoginForm.styles);

        this.form.addEventListener("submit", (event) =>
            submitLoginForm(
            event,
            this.getAttribute("api"),
            this.getAttribute("redirect") || "/"
            )
    );}
}

function submitLoginForm(event, endpoint, redirect) {
    event.preventDefault();
    const form = event.target.closest("form");
    const data = new FormData(form);
    const method = "POST";
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(Object.fromEntries(data));
  
    fetch(endpoint, { method, headers, body })
      .then((res) => {
        if (res.status !== 200)
          throw `Form submission failed: Status ${res.status}`;
        return res.json();
      })
      .then((payload) => {
        const { token } = payload;
  
        form.dispatchEvent(
          new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token, redirect }]
          })
        );
      })
      .catch((err) => console.log("Error submitting form:", err));
}