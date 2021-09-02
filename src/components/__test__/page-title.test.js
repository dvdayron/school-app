import {unmountComponentAtNode} from "react-dom";
import {render, screen} from '@testing-library/react';
import {act} from "react-dom/test-utils";
import PageTitle from "../page-title/page-title.component";

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

it("PageTitle component test", () => {
  const title = "Page title";
  act(() => {
    render(<PageTitle title={title}/>, container);
  });
  const element = screen.getByTestId('title');
  expect(element).toHaveTextContent(title);
  expect(element).not.toContainHTML('<Link>');
});
