import { Component, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'card-holder-input',
  styleUrl: 'card-holder-input.css',
  shadow: true,
})
export class CreditCardInput {
  @State() value: string = "";
  @Event() changed: EventEmitter<string>;

  private handleOnKeyDown = (event: KeyboardEvent) => {
    if(["0","1","2","3","4","5","6","7","8","9"].includes(event.key)) {
      event.preventDefault();
    }
  }

  private handleOnInput = (event: InputEvent) => {
    let newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.changed.emit(newValue);
  }

  render() {
    return <input value={this.value} onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput} class="card-holder-input" placeholder='Cardholder Name' />;
  }
}