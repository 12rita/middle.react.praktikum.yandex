import { reducer, initialState, postOrderNumber } from "./order.ts";
import { expect, test, describe } from "vitest";

describe("Order slice", () => {
  test("State initializes correctly", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).to.deep.equal(initialState);
  });

  test("postOrderNumber pending action works correctly", () => {
    const action = {
      type: postOrderNumber.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("postOrderNumber rejected action works correctly", () => {
    const action = {
      type: postOrderNumber.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({ loading: false, error: "Error" });
  });

  test("postOrderNumber fulfilled action works correctly", () => {
    const payload = { name: "Гамбос", order: { number: "123" } };
    const action = {
      type: postOrderNumber.fulfilled.type,
      payload,
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
      order: payload.order,
      name: payload.name,
    });
  });
});
