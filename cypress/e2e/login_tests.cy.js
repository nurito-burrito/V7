describe("Cypress Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".btn-provider-email").click();
    cy.url().should("include", "/email");
  });

  it("Successful sign in", () => {
    cy.get("#email").type(Cypress.env("mailslurpEmail"));
    cy.get("#password").type(Cypress.env("mailslurpDefaultPassword"));
    cy.contains("Log In").click();

    cy.url().should("include", "/organizations");
    cy.get("h2").contains("Test org").click();

    cy.url().should("include", "/projects");
    cy.get('[data-cy="organization-switcher-summary"]').should("be.visible");
  });

  it("Sign in page field errors", () => {
    // email field
    cy.get("#email").type("abc");
    cy.contains("Log In").click();
    cy.get("input:invalid").should("have.length", 1);
    cy.get("#email").then(($input) => {
      expect($input[0].validationMessage).to.contain(
        "Please include an '@' in the email address."
      );
    });
    cy.get("#email").type("@test.com");

    // password field
    cy.get("#password").type("123");
    cy.contains("Log In").click();
    cy.get(".error-message")
      .should("be.visible")
      .and("have.text", " Incorrect email address or password");
  });
});
