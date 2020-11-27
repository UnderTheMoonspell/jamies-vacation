import { render, screen } from "@testing-library/react";
import React from "react";
import { CustomLoader } from "./CustomLoader";

it("Renders CustomInput", () => {
  render(<CustomLoader />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
