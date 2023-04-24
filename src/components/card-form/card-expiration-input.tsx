import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { removeNaNFromString } from '../../utils/utils';

@Component({
  tag: 'card-expiration-input',
  styleUrl: 'card-expiration-input.css',
  shadow: true,
})
export class CardExpirationInput {
  @State() value: string = "";
  @Event() changed: EventEmitter<string>;

  private handleOnChange = (event: KeyboardEvent) => {
    console.log(event);
    if(!["0","1","2","3","4","5","6","7","8","9", "Backspace" ].includes(event.key) || (this.value.length > 6 && event.key !== "Backspace")) {
      event.preventDefault();
    }
  }

  private handleOnInput = (event: InputEvent) => {
    let newValue = removeNaNFromString((event.target as HTMLInputElement).value);
    const separationPositions = [2];

    let expirationDate = '';
    let position = 0;
    for (const separationPosition of separationPositions) {
      if (newValue.length > position + separationPosition) {
        expirationDate += newValue.substr(position, separationPosition) + ' / ';
        position += separationPosition;
      } else {
        break;
      }
    }
    expirationDate += newValue.substr(position);
    this.value = expirationDate;
    this.changed.emit(expirationDate);
  }

  render() {
    return <input value={this.value} onKeyDown={this.handleOnChange} onInput={this.handleOnInput} class="card-expiration-input" placeholder='MM / YY' />;
  }
}