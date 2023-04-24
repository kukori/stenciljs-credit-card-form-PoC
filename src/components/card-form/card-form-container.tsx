import { Component, h } from '@stencil/core';

@Component({
  tag: 'card-form-container',
  styleUrl: 'card-form-container.css',
  shadow: true,
})
export class CardFormContainer {
  render() {
    return <div class="card-form-container"><slot/></div>;
  }
}
