/// <reference types="cypress" />

describe("Print Statement", () => {
  it("Printing Deposit and Withdraw Statements", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("LOG IN").click();
    cy.contains("Transfer").click();
    cy.contains("Deposit money").click();
    cy.get("input").type("100");
    cy.get("[data-testid=deposit-button]").click();
    cy.contains("Withdraw money").click();
    cy.get("input").type("50");
    cy.get("[data-testid=withdraw-button]").click();
    cy.contains("Statement").click();
    cy.contains("+$100.00").should("exist");
    cy.contains("-$50.00").should("exist");
  });
});
