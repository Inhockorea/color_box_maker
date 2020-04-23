import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import BoxList from "./BoxList";
import {deleteLabel} from "./Box"

it("renders without crashing", function () {
  render(<BoxList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", function () {
  const { getByLabelText, queryByText, queryByTestId } = render(<BoxList />);

  // no remove button or a box yet
  expect(queryByText(deleteLabel)).not.toBeInTheDocument();

  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");
  const submitBtn = queryByText("Add a new box!")

  // fill out the form
  fireEvent.change(widthInput, { target: { value: 10 } });
  fireEvent.change(heightInput, { target: { value: 10 } });
  fireEvent.change(colorInput, { target: { value: "red" } });
  fireEvent.click(submitBtn);

  // remove button and a box exists!
  expect(queryByText(deleteLabel)).toBeInTheDocument();
  expect(queryByTestId("redremoveBtn")).toBeInTheDocument();
});

it("can remove a corressponding box", function () {
  const { getByLabelText, queryByText, queryByTestId } = render(<BoxList />);

  // no remove button yet or boxes
  expect(queryByText(deleteLabel)).not.toBeInTheDocument();

  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");
  const submitBtn = queryByText("Add a new box!")

  // Make two boxes
  fireEvent.change(widthInput, { target: { value: 10 } });
  fireEvent.change(heightInput, { target: { value: 10 } });
  fireEvent.change(colorInput, { target: { value: "red" } });
  fireEvent.click(submitBtn);

  fireEvent.change(widthInput, { target: { value: 10 } });
  fireEvent.change(heightInput, { target: { value: 10 } });
  fireEvent.change(colorInput, { target: { value: "black" } });
  fireEvent.click(submitBtn);

  //remove red box
  const removeBtn = queryByTestId("redremoveBtn")
  fireEvent.click(removeBtn);

  //red box disappears and black box stays
  expect(queryByTestId("red")).toBeNull();
  expect(queryByTestId("black")).toBeInTheDocument();
  expect(queryByTestId("blackremoveBtn")).toBeInTheDocument();
});

//LOOK into mock jest then we could mock uiud
//have a comment on explaining intuition behind testid
