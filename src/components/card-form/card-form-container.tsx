import { Component, h } from '@stencil/core';

@Component({
  tag: 'card-form-container',
  styleUrl: 'card-form-container.css',
  shadow: true,
})
export class CardFormContainer {
  render() {
    return (
      <div class="card-form-container">
        <credit-card-input />
        <div class="expiration-cvv-container">
          <card-expiration-input slot="expiration" />
          <cvv-input slot="cvv" />
        </div>
        <card-holder-input />
      </div>);
  }
}
