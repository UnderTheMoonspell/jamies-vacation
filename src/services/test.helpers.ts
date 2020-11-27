import { findByText, fireEvent, getByText } from "@testing-library/react";

export function changeInput(input: HTMLInputElement, value: any) {
  fireEvent.change(input, { target: { value } });
  fireEvent.blur(input);
}

export async function selectOption(container: HTMLElement, optionText: string) {
  fireEvent.click(container);
  const optionsContainer: HTMLElement = container.querySelector('.menu')! as HTMLElement;
  await findByText(optionsContainer, optionText);
  fireEvent.click(getByText(optionsContainer, optionText));
}