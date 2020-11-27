import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import React from "react";
import { CustomSelect } from "./CustomSelect";
import { CustomSelectProps } from "./CustomSelect";

const props = {
  name: "select",
  label: "Select",
  options: [{ value: 1, text: "Portugal" }],
  placeholder: "Select",
} as CustomSelectProps;

const changeCallback = jest.fn();

it("Renders CustomInput", () => {
  render(
    <Formik
      initialValues={{}}
      onSubmit={changeCallback}
    >
      <CustomSelect {...props} onChange={changeCallback} data-testid="select" />
    </Formik>
  );

  expect(screen.getByText("Select")).toBeInTheDocument();
});
