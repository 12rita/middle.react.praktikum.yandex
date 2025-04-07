import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://norma.nomoreparties.space/",
  },

  component: {
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
