import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { removeNaNFromString } from '../../utils/utils';

@Component({
  tag: 'credit-card-input',
  styleUrl: 'credit-card-input.css',
  shadow: true,
})
export class CreditCardInput {
  @State() value: string = "";
  @Event() changed: EventEmitter<string>;

  componentDidUpdate() {
    console.log('UPDATED VALUE',this.value);
  }

  private handleOnKeyDown = (event: KeyboardEvent) => {
    if(!["0","1","2","3","4","5","6","7","8","9", "Backspace" ].includes(event.key) || (this.value.length > 18 && event.key !== "Backspace")) {
      event.preventDefault();
    }
  }

  private handleOnInput = (event: InputEvent) => {
    let newValue = removeNaNFromString((event.target as HTMLInputElement).value);
    const separationPositions = [4, 4, 4, 4];

    let separatedCardNumber = '';
    let position = 0;
    for (const separationPosition of separationPositions) {
      if (newValue.length > position + separationPosition) {
        separatedCardNumber += newValue.substr(position, separationPosition) + ' ';
        position += separationPosition;
      } else {
        break;
      }
    }
    separatedCardNumber += newValue.substr(position);
    this.value = separatedCardNumber;
    this.changed.emit(separatedCardNumber);
  }

  render() {
    return <input value={this.value} onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput} class="credit-card-input" placeholder='Card number' />;
  }
}