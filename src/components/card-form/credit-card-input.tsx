import { Component, h, State, Event, EventEmitter } from '@stencil/core';

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

  private removeNaNFromCardNumber = (cardNumberValue: string | undefined) => {
    return cardNumberValue ? cardNumberValue.replace(/\D/g,'') : '';
  };

  private handleOnChange = (event: KeyboardEvent) => {
    console.log(event);
    if(!["0","1","2","3","4","5","6","7","8","9", "Backspace" ].includes(event.key) || (this.value.length > 18 && event.key !== "Backspace")) {
      event.preventDefault();
    }
  }

  private handleOnInput = (event: InputEvent) => {
    let newValue = this.removeNaNFromCardNumber((event.target as HTMLInputElement).value);
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
    console.log("separatedCardNumber", separatedCardNumber)
    this.value = separatedCardNumber;
    this.changed.emit(separatedCardNumber);
  }

  render() {
    return (<div class="credit-card-input-wrapper">
        <input value={this.value} onKeyDown={this.handleOnChange} onInput={this.handleOnInput} class="credit-card-input" placeholder='Card number'  />
      </div>);
  }
}