import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class BudgetElement extends HTMLElement {
  static template = html`
    <template>
      <div class="budget-container">
        <h1>Budget:</h1>
        <p>
          $<slot name="wishlist-budget">###.##</slot>
        </p>
      </div>
    </template>`;

  static styles = css`
  .budget-container {
    display: flex;
    background-color: var(--color-background-page-alt);
    border-radius: 25px;
    max-width: 800px;
    max-height: 400px;
    flex-direction: column;
    margin: 30px auto 30px auto;
    text-align: center;
  }

  .budget-container h1 {
      text-align: center;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 100px;
      color: var(--color-text-main);
      margin-top: 0;
      margin-bottom: 0;
  }

  .budget-container p {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 100px;
      color: var(--color-text-main);
      margin-top: 0;
      text-align: center;
  }`;

  constructor() {
    super();
    shadow(this)
      .template(BudgetElement.template)
      .styles(reset.styles, BudgetElement.styles);
  }
}