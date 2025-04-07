import {
  reducer,
  initialState,
  updateProfile,
  profile,
  register,
  login,
  logout,
} from "./user.ts";
import { expect, test, describe } from "vitest";

describe("Order slice", () => {
  test("State initializes correctly", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).to.deep.equal(initialState);
  });

  test("updateProfile pending action works correctly", () => {
    const action = {
      type: updateProfile.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("updateProfile rejected action works correctly", () => {
    const action = {
      type: updateProfile.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({ loading: false, error: "Error" });
  });

  test("updateProfile fulfilled action works correctly", () => {
    const user = {
      name: "Test",
    };

    const action = {
      type: updateProfile.fulfilled.type,
      payload: {
        user,
      },
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({
      loading: false,
      error: "",
      user,
    });
  });

  test("profile pending action works correctly", () => {
    const action = {
      type: profile.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("profile rejected action works correctly", () => {
    const action = {
      type: profile.rejected.type,
      payload: "Error",
    };
    const state = reducer({ ...initialState, isAuthenticated: true }, action);

    expect(state).toMatchObject({
      loading: false,
      error: "Error",
      isAuthenticated: false,
    });
  });

  test("profile fulfilled action works correctly", () => {
    const user = {
      name: "Test",
    };
    const action = {
      type: profile.fulfilled.type,
      payload: {
        user,
      },
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
      user,
      isAuthenticated: true,
    });
  });

  test("register pending action works correctly", () => {
    const action = {
      type: register.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("register rejected action works correctly", () => {
    const action = {
      type: register.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({
      loading: false,
      error: "Error",
      isAuthenticated: false,
    });
  });

  test("register fulfilled action works correctly", () => {
    const user = {
      name: "Test",
    };
    const action = {
      type: profile.fulfilled.type,
      payload: {
        user,
      },
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
      user,
      isAuthenticated: true,
    });
  });

  test("login pending action works correctly", () => {
    const action = {
      type: login.pending.type,
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBeTruthy();
  });

  test("login rejected action works correctly", () => {
    const action = {
      type: login.rejected.type,
      payload: "Error",
    };
    const state = reducer(initialState, action);

    expect(state).toMatchObject({
      loading: false,
      error: "Error",
      isAuthenticated: false,
    });
  });

  test("login fulfilled action works correctly", () => {
    const user = {
      name: "Test",
    };
    const action = {
      type: profile.fulfilled.type,
      payload: {
        user,
      },
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      loading: false,
      error: "",
      user,
      isAuthenticated: true,
    });
  });

  test("logout fulfilled action works correctly", () => {
    const testObj = {
      result: false,
    };

    const action = {
      type: logout.fulfilled.type,
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
      isAuthenticated: false,
      user: {},
    });
    expect(testObj.result).toBeTruthy();
  });
});
