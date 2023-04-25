import { Component, h, State, Event, EventEmitter, Prop } from '@stencil/core';
import { removeNaNFromString } from '../../utils/utils';

@Component({
  tag: 'cvv-input',
  styleUrl: 'cvv-input.css',
  shadow: true,
})
export class CreditCardInput {
  @Prop() error: boolean;
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

  private getClass = () => {
    return this.error ?  "cvv-input error" : "cvv-input";
  }

  render() {
    return <input value={this.value} onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput} class={this.getClass()} placeholder='CVV' />;
  }
}