import {unmountComponentAtNode} from "react-dom";
import {render, screen} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import Loading from "../loading/loading.component";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Loading component test", () => {
  act(() => {
    render(<Loading/>, container);
  });
  const element = screen.getByTestId('loading');
  expect(element).toBeInTheDocument();
});
