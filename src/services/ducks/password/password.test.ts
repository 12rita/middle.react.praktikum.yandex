import {
  reducer,
  initialState,
  passwordReset,
  passwordSet,
} from "./password.ts";
import { expect, test, describe } from "vitest";

describe("Order slice", () => {
  test("State initializes correctly", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).to.deep.equal(initialState);
  });

  test("passwordReset pending action works correctly", () => {
    const action = {
      type: passwordReset.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("passwordReset rejected action works correctly", () => {
    const action = {
      type: passwordReset.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({ loading: false, error: "Error" });
  });

  test("passwordReset fulfilled action works correctly", () => {
    const testObj = {
      result: false,
    };

    const action = {
      type: passwordReset.fulfilled.type,
      payload: {
        onSuccess: () => {
          testObj.result = true;
        },
      },
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
    });
    expect(testObj.result).toBeTruthy();
  });

  test("passwordSet pending action works correctly", () => {
    const action = {
      type: passwordSet.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("passwordSet rejected action works correctly", () => {
    const action = {
      type: passwordSet.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({ loading: false, error: "Error" });
  });

  test("passwordSet fulfilled action works correctly", () => {
    const testObj = {
      result: false,
    };

    const action = {
      type: passwordReset.fulfilled.type,
      payload: {
        onSuccess: () => {
          testObj.result = true;
        },
      },
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
    });
    expect(testObj.result).toBeTruthy();
  });
});
