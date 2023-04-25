import { Component, h } from '@stencil/core';

@Component({
  tag: 'error-message',
  styleUrl: 'error-message.css',
  shadow: true,
})
export class CreditCardInput {
  render() {
    return <span class='error-message'><slot/></span>;
  }
}