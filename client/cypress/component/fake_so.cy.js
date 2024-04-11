import React from 'react'
import fakeStackOverflow from '../../src/components/fakestackoverflow'

describe('<fakeStackOverflow />', () => {
  it("renders main title correctly", () => {
    cy.mount(<fakeStackOverflow/>);
    cy.get("h1").contains("All Questions"); // Assuming your Main component renders an <h1> with the title
  });
})