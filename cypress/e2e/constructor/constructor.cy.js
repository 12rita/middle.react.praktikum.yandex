describe("service is available", function () {
  beforeEach(function () {
    cy.window()
      .its("console")
      .then((console) => {
        cy.spy(console, "log").as("log");
      });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });

    cy.visit("/");

    window.localStorage.setItem("refreshToken", "test-refreshToken");
    cy.setCookie("accessToken", "test-accessToken");

    cy.get("[data-qa=card-1]").as("bun");
    cy.get("[data-qa=card-2]").as("main");
    cy.get("[data-qa=card-3]").as("sauce");
    cy.get("[data-qa=drop-container]").as("drop-container");
  });

  it("should drag and drop", function () {
    cy.get("@bun").trigger("dragstart");
    cy.get("@drop-container").trigger("drop");
  });

  it("should open details", function () {
    cy.get("@main").click();
    cy.contains("Детали ингредиента");
  });

  it("should make an order", function () {
    cy.get("@bun").trigger("dragstart");
    cy.get("@drop-container").trigger("drop");
    cy.get("@sauce").trigger("dragstart");
    cy.get("@drop-container").trigger("drop");
    cy.get("[data-qa=button-makeOrder]").click();
    cy.contains("Идентификатор заказа");
  });
});
