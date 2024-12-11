import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class HomeViewElement extends View<Model, Msg> {
  static uses = define({});

  constructor() {
    super("dreamin:model");
  }

  render() {
    return html`
      <div class="container">
        <p>Hi Hugh</p>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Arial', sans-serif;
      font-size: 24px;
    }
  `;
}