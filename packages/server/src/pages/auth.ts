import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage";

export class LoginPage {
    render() {
      return renderPage({
        scripts: [
          `
          import { define, Auth } from "@calpoly/mustang";
          import { LoginForm } from "/scripts/login-form.js";
          import { HeaderElement } from "/scripts/header.js";
  
          define({
            "mu-auth": Auth.Provider,
            "login-form": LoginForm,
            "header-element": HeaderElement,
          });
          HeaderElement.initializeOnce();
          `
        ],
        styles: [
          css`

            .register {
              margin-top: 20px;
              font-size: 16px;
              color: var(--header-text);
              text-align: center;
            }

            .register a {
              color: var(--color-header-hover);
              text-decoration: none;
            }

            .register a:hover {
              text-decoration: underline;
            }
          `
        ],
        body: html`
          <body>
            <mu-auth provides="dreamin:auth">
              <article>
                <header-element></header-element>
                <main class="page">
                  <login-form api="/auth/login">
                    <h3 slot="title">Sign in and go places!</h3>
                  </login-form>
                  <p class="register">
                    Or did you want to
                    <a href="./register">
                      register as a new user
                    </a>
                    ?
                  </p>
                </main>
              </article>
            </mu-auth>
          </body>
        `});
    }
}