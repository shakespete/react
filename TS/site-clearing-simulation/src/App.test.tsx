import React from "react";
import { render } from "@testing-library/react";
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
