import { reducer, initialState, fetchIngredients } from "./ingredients.ts";
import { expect, test, describe } from "vitest";

describe("Ingredients slice", () => {
  test("State initializes correctly", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).to.deep.equal(initialState);
  });

  test("fetchIngredients pending action works correctly", () => {
    const action = {
      type: fetchIngredients.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("fetchIngredients rejected action works correctly", () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({ loading: false, error: "Error" });
  });

  test("fetchIngredients fulfilled action works correctly", () => {
    const payload = [
      { _id: "1", type: "bun", name: "Булка" },
      { _id: "2", type: "main", name: "Мясо" },
      { _id: "3", type: "sauce", name: "Соус" },
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload,
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
      rawIngredients: payload,
      ingredients: {
        bun: [payload[0]],
        main: [payload[1]],
        sauce: [payload[2]],
      },
    });
  });
});
