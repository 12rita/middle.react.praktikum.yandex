import { reducer, initialState } from "./feed.ts";
import { expect, test, describe } from "vitest";
import { onClose, onConnecting, onError, onMessage, onOpen } from "./types";
import { WebsocketStatus } from "../ws/index.ts";

describe("Feed slice", () => {
  test("State initializes correctly", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).to.deep.equal(initialState);
  });

  test("onConnecting action works correctly", () => {
    const action = {
      type: onConnecting.type,
    };
    const state = reducer(initialState, action);

    expect(state.status).to.equal(WebsocketStatus.CONNECTING);
  });

  test("onOpen action works correctly", () => {
    const action = {
      type: onOpen.type,
    };
    const state = reducer(initialState, action);

    expect(state.status).to.equal(WebsocketStatus.ONLINE);
  });

  test("onClose action works correctly", () => {
    const action = {
      type: onClose.type,
    };
    const state = reducer(
      {
        ...initialState,
        status: WebsocketStatus.ONLINE,
        ordersFeed: {
          orders: [
            {
              _id: "1",
              createdAt: "",
              ingredients: [],
              name: "",
              number: 0,
              status: "",
              updatedAt: "",
            },
          ],
          total: 1,
          totalToday: 1,
        },
      },
      action,
    );

    expect(state).to.deep.equal(initialState);
  });

  test("onError action works correctly", () => {
    const action = {
      type: onError.type,
      payload: "Error",
    };
    const state = reducer(
      {
        ...initialState,
        status: WebsocketStatus.ONLINE,
        ordersFeed: {
          orders: [
            {
              _id: "1",
              createdAt: "",
              ingredients: [],
              name: "",
              number: 0,
              status: "",
              updatedAt: "",
            },
          ],
          total: 1,
          totalToday: 1,
        },
      },
      action,
    );

    expect(state).to.deep.equal({
      status: WebsocketStatus.ERROR,
      error: "Error",
      ordersFeed: initialState.ordersFeed,
    });
  });

  test("onMessage action works correctly", () => {
    const payload = {
      success: true,
      orders: [{ _id: "1" }],
      total: 1,
      totalToday: 1,
    };

    const action = {
      type: onMessage.type,
      payload,
    };
    const state = reducer(initialState, action);

    expect(state.ordersFeed).to.deep.equal(payload);
  });

  test("onMessage action works correctly when error appears", () => {
    const payload = {
      success: false,
      message: "Error",
    };

    const action = {
      type: onMessage.type,
      payload,
    };
    const state = reducer(initialState, action);

    expect(state).to.deep.equal({
      status: WebsocketStatus.ERROR,
      error: "Error",
      ordersFeed: initialState.ordersFeed,
    });
  });
});
