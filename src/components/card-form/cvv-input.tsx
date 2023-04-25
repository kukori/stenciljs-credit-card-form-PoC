import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { removeNaNFromString } from '../../utils/utils';

@Component({
  tag: 'cvv-input',
  styleUrl: 'cvv-input.css',
  shadow: true,
})
export class CreditCardInput {
  @State() value: string = "";
  @Event() changed: EventEmitter<string>;

  private handleOnKeyDown = (event: KeyboardEvent) => {
    if(!["0","1","2","3","4","5","6","7","8","9", "Backspace" ].includes(event.key) || (this.value.length > 2 && event.key !== "Backspace")) {
      event.preventDefault();
    }
  }

  private handleOnInput = (event: InputEvent) => {
    let newValue = removeNaNFromString((event.target as HTMLInputElement).value);
    this.value = newValue;
    this.changed.emit(newValue);
  }

  render() {
    return <input value={this.value} onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput} class="cvv-input" placeholder='CVV' />;
  }
}