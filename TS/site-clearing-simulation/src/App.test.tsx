import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import { MapProvider } from "./context/MapProvider";

test("Renders File Input button", () => {
  const { getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const fileInputElement = getByText("File Input");
  expect(fileInputElement).toBeInTheDocument();
});

test("Renders Command List table", () => {
  const { getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const commandsTableElement = getByText("Issued Commands");
  expect(commandsTableElement).toBeInTheDocument();
});

test("Renders Site Report table", () => {
  const { getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const commandsTableElement = getByText("Communication Overhead");
  expect(commandsTableElement).toBeInTheDocument();
});

test("Command input is not visible", () => {
  const { queryByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  expect(queryByText("Current Direction:")).toBeNull();
});

test("Virtual control is not visible", () => {
  const { queryByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  expect(queryByText("QUIT")).toBeNull();
});

test("Upload invalid text file (uneven number of columns)", async () => {
  const { getByTestId, getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const file = new File(
    ["ootooooooo\noooooooToo\nrrrooooToo\nrrrroooooo\nrrrrrtooo"],
    "input.txt",
    { type: "text/plain" }
  );
  const fileInput = getByTestId("text-file-input");
  fireEvent.change(fileInput, { target: { files: [file] } });
  await wait(() => getByText("Invalid Input Data"));
  expect(getByText("Reset")).toBeInTheDocument();
  fireEvent(
    getByText("Reset"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(getByText("File Input")).toBeInTheDocument();
});

test("Upload invalid text file (invalid character)", async () => {
  const { getByTestId, getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const file = new File(
    ["ootooooooo\noooooooToo\nrrrooooToo\nrrrroooooo\nrrrrrtoooA"],
    "input.txt",
    { type: "text/plain" }
  );
  const fileInput = getByTestId("text-file-input");
  fireEvent.change(fileInput, { target: { files: [file] } });
  await wait(() => getByText("Invalid Input Data"));
  expect(getByText("Invalid Input Data")).toBeInTheDocument();
  expect(getByText("Reset")).toBeInTheDocument();
  fireEvent(
    getByText("Reset"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(getByText("File Input")).toBeInTheDocument();
});

test("Upload valid text file", async () => {
  const { getByTestId, getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const file = new File(
    ["ootooooooo\noooooooToo\nrrrooooToo\nrrrroooooo\nrrrrrtoooo"],
    "input.txt",
    { type: "text/plain" }
  );
  const fileInput = getByTestId("text-file-input");
  fireEvent.change(fileInput, { target: { files: [file] } });
  await wait(() => getByText("Current Direction:"));
  expect(getByText("Current Direction:")).toBeInTheDocument();
  expect(getByTestId("virtual-control")).toBeInTheDocument();
});

test("Navigate site using virtual control", async () => {
  const { getByTestId, getByText } = render(
    <MapProvider>
      <App />
    </MapProvider>
  );
  const file = new File(
    ["ootooooooo\noooooooToo\nrrrooooToo\nrrrroooooo\nrrrrrtoooo"],
    "input.txt",
    { type: "text/plain" }
  );
  const fileInput = getByTestId("text-file-input");
  fireEvent.change(fileInput, { target: { files: [file] } });
  await wait(() => getByText("Current Direction:"));
  fireEvent.change(getByTestId("steps-input"), { target: { value: 4 } });
  fireEvent(
    getByTestId("adv-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(getByText("Advance 4")).toBeInTheDocument();
  fireEvent(
    getByTestId("right-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(getByText("Turn Right")).toBeInTheDocument();
  fireEvent.change(getByTestId("steps-input"), { target: { value: 2 } });
  fireEvent(
    getByTestId("adv-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(getByText("Advance 2")).toBeInTheDocument();
  fireEvent(
    getByTestId("adv-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  fireEvent(
    getByTestId("left-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(getByText("Turn Left")).toBeInTheDocument();
  fireEvent(
    getByTestId("adv-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  fireEvent.change(getByTestId("steps-input"), { target: { value: 4 } });
  fireEvent(
    getByTestId("adv-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  fireEvent(
    getByTestId("left-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  fireEvent(
    getByTestId("quit-btn"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  const total = getByTestId("total-cost");
  expect(total.textContent).toEqual("131");
});
