import { Component, h, State, Event, EventEmitter, Prop } from '@stencil/core';
import { removeNaNFromString } from '../../utils/utils';

@Component({
  tag: 'cvv-input',
  styleUrl: 'cvv-input.css',
  shadow: true,
})
export class CreditCardInput {
  @Prop() error: boolean;
  @Prop() name: string = "cvv";
  @State() value: string = "";
  @Event() changed: EventEmitter<string>;

  private handleOnKeyDown = (event: KeyboardEvent) => {
    if(!["0","1","2","3","4","5","6","7","8","9", "Backspace", "Tab" ].includes(event.key) || (this.value.length > 2 && !["Backspace", "Tab"].includes(event.key))) {
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
    return <input tabIndex={2} name={this.name} value={this.value} onKeyDown={this.handleOnKeyDown} onInput={this.handleOnInput} class={this.getClass()} placeholder='CVV' />;
  }
}