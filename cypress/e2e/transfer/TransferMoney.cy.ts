/// <reference types="cypress" />

describe("Transfer money ", () => {
  it("Depositing money using Transfer Funds button", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("LOG IN").click();
    cy.contains("Transfer Funds").click();
    cy.contains("Deposit money").click();
    cy.get("input").type("100");
    cy.get("[data-testid=deposit-button]").click();
    cy.contains("$100.00 has been deposited to your account").should("exist");
  });
  it("Depositing money using Transfer navbar", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("LOG IN").click();
    cy.contains("Transfer").click();
    cy.contains("Deposit money").click();
    cy.get("input").type("100");
    cy.get("[data-testid=deposit-button]").click();
    cy.contains("$100.00 has been deposited to your account").should("exist");
  });

  it("Withdrawing money with insufficient funds", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("LOG IN").click();
    cy.contains("Transfer").click();
    cy.contains("Withdraw money").click();
    cy.get("input").type("100");
    cy.get("[data-testid=withdraw-button]").click();
    cy.contains("Insufficient funds").should("exist");
  });
  it("Withdrawing money with sufficient funds", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("LOG IN").click();
    cy.contains("Transfer").click();
    cy.contains("Deposit money").click();
    cy.get("input").type("100");
    cy.get("[data-testid=deposit-button]").click();
    cy.contains("Withdraw money").click();
    cy.get("input").type("100");
    cy.get("[data-testid=withdraw-button]").click();
    cy.contains("$100.00 has been withdrawn from your account").should("exist");
  });
});
