import { faker } from "@faker-js/faker";

describe("user sign up test with mailslurp plugin", function () {
  beforeEach(function () {
    return cy
      .mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        // save inbox id and email address to this (make sure you use function and not arrow syntax)
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
      });
  });

  it("Successful signup", function () {
    Cypress.config("defaultCommandTimeout", 10000);
    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomOrgName = faker.company.name();

    cy.visit("/login");
    cy.get('[href="/signup"]').click();
    cy.get(".btn-provider-email").click();

    // sign up page
    cy.url().should("include", "/signup/email");
    cy.get("#email").type(this.emailAddress);
    cy.get('input[type="password"]').type(
      Cypress.env("mailslurpDefaultPassword")
    );
    cy.get('button[type="submit"]').click();

    // verify account page
    cy.url().should("include", "/verify");
    cy.get("h3").contains("Verify account");

    // get link from email and navigate to registration screen
    cy.mailslurp().then((mailslurp) =>
      mailslurp
        .waitForLatestEmail(this.inboxId, 30000, true)
        .then(async (email) => {
          console.log(email);
          const linkResult = await mailslurp.emailController.getEmailLinks({
            emailId: email.id,
          });
          const userURL = linkResult.links[3];
          cy.visit(userURL);
        })
    );

    // Welcome to Cypress Cloud screen
    cy.url().should("include", "/welcome");
    cy.contains("Welcome to the Cypress Cloud!").should("be.visible");

    cy.get(".onboarding-panel").within(() => {
      cy.get('input[placeholder="First"]').type(randomFirstName);
      cy.get('input[placeholder="Last"]').type(randomLastName);
      cy.get('[data-cy="cy-checkbox"]')
        .eq(1)
        .should("be.visible")
        .check({ force: true });
    });
    cy.get('button[type="submit"]').should("be.enabled").click();

    // Create organization screen
    cy.url().should("include", "/organizations/new");
    cy.contains("Let’s create an organization").should("be.visible");
    cy.get('[data-cy="create-org-form--org-name"]')
      .children()
      .find("input")
      .type(randomOrgName);
    cy.get('button[type="submit"]').should("be.enabled").click();

    // survey screen
    cy.url().should("include", "/survey");
    cy.contains("Where are you in your Cypress journey?").should("be.visible");
    cy.get('[data-cy="user-journey-survey--skip-button"]')
      .contains("Skip for now")
      .click();

    // invite your team screen
    cy.url().should("include", "/invite");
    cy.contains("Invite your team").should("be.visible");
    cy.contains("Skip for now").click();

    // cypress dashboard
    cy.url().should("include", "/projects");
    cy.get('[data-cy="organization-switcher-summary"]').should("be.visible");
  });
});
