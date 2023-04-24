export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function removeNaNFromString(cardNumberValue: string | undefined): string {
  return cardNumberValue ? cardNumberValue.replace(/\D/g,'') : '';
};