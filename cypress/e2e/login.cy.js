describe("Login Form test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Form başarılı şekilde submit ediliyor", () => {
    cy.get('input[name="email"]').type("erdem.guntay@wit.com.tr");
    cy.get('input[name="password"]').type("9fxIHXGxesEhW1_");
    cy.get('input[name="terms"]').check();
    cy.get("button").should("not.be.disabled").click();
    cy.url().should("include", "/main");
  });

  it("Email yanlış girildiğinde hata mesajı geliyor mu?", () => {
    cy.get('input[name="email"]').type("abc@abc");

    cy.get(".invalid-feedback").should("have.length", 1);
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.get("button").should("be.disabled");
  });
});
