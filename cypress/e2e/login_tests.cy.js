describe("Cypress Tests", () => {
  it("Successful sign in", () => {
    cy.visit("/login");
    cy.get(".btn-provider-email").click();

    cy.url().should("include", "/email");
    cy.get("#email").type(Cypress.env("mailslurpEmail"));
    cy.get("#password").type(Cypress.env("mailslurpDefaultPassword"));
    cy.contains("Log In");

    cy.url().should("include", "/organizations");
    cy.get("h2").contains("Test org").click();

    cy.url().should("include", "/projects");
    cy.get('[data-cy="organization-switcher-summary"]').should("be.visible");
  });
});
