import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import { removeNaNFromString } from '../../utils/utils';

@Component({
  tag: 'card-expiration-input',
  styleUrl: 'card-expiration-input.css',
  shadow: true,
})
export class CardExpirationInput {
  @Prop() error: boolean;
  @Prop() name: string = "expiration-date";
  @State() value: string = "";
  @Event() changed: EventEmitter<string>;

  private handleOnKeyDown = (event: KeyboardEvent) => {
    if(!["0","1","2","3","4","5","6","7","8","9", "Backspace", "Tab"  ].includes(event.key) || (this.value.length > 6 && !["Backspace", "Tab"].includes(event.key))) {
      event.preventDefault();
    }
  }

  private formatMonths = (cardDateValue: string): string => {
    if (cardDateValue.match(/^[2-9]/)) {
      return '0' + cardDateValue;
    }

    const months = +cardDateValue.slice(0, 2);
    if (months > 12) {
      return `12${cardDateValue.slice(2)}`;
    }

    return cardDateValue;
  };

  private formatDate = (cardDateValue: string): string => {
    if (cardDateValue.length > 2) {
      return cardDateValue.slice(0, 2) + ' / ' + cardDateValue.slice(2);
    }
    return cardDateValue;
  };

  private handleOnInput = (event: InputEvent) => {
    const newValue = this.formatDate(this.formatMonths(removeNaNFromString((event.target as HTMLInputElement).value)));
    this.value = newValue;
    this.changed.emit(newValue);
  }

  private getClass = () => {
    return this.error ?  "card-expiration-input error" : "card-expiration-input";
  }

  render() {
    return <input tabIndex={1} name={this.name} value={this.value} onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput} class={this.getClass()} placeholder='MM / YY' />;
  }
}