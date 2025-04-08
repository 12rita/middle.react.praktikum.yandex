import { reducer, actions } from "./burger.ts";
import { expect, test, describe } from "vitest";
import { IExtendedIngredient } from "@/services/ducks/burger/types.ts";

const restProps: Omit<IExtendedIngredient, "_id" | "name"> = {
  key: "",
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: "",
  image_large: "",
  image_mobile: "",
  price: 0,
  proteins: 0,
  type: "sauce",
  __v: 0,
};

describe("Burger slice", () => {
  test("State initializes correctly", () => {
    const state = reducer(undefined, { type: "" });
    expect(state).to.deep.equal([]);
  });

  test("addIngredient action works correctly", () => {
    const action = {
      type: actions.addIngredient.type,
      payload: {
        item: {
          name: "Шмоус",
          _id: "1",
        },
        sectionId: "sauce",
      },
    };
    const state = reducer([], action);

    expect(state.length).toBe(1);
    expect(state[0]).toMatchObject({ name: "Шмоус", _id: "1" });
  });

  test("addIngredient action works correctly, when adding bun", () => {
    const action = {
      type: actions.addIngredient.type,
      payload: {
        item: {
          name: "Булка",
          _id: "1",
        },
        sectionId: "bun",
      },
    };
    const state = reducer([], action);

    expect(state.length).toBe(2);
    expect(state[0]).toMatchObject({ name: "Булка", _id: "1" });
    expect(state[1]).toMatchObject({ name: "Булка", _id: "1" });
  });

  test("deleteIngredient action works correctly on empty state", () => {
    const action = {
      type: actions.deleteIngredient.type,
      payload: 1,
    };
    const state = reducer([], action);

    expect(state).to.deep.equal([]);
  });

  test("deleteIngredient action works correctly", () => {
    const action = {
      type: actions.deleteIngredient.type,
      payload: 0,
    };
    const state = reducer(
      [
        {
          name: "Шмоус",
          _id: "1",
          ...restProps,
        },
      ],
      action,
    );

    expect(state).to.deep.equal([]);
  });

  test("switchIngredients action works correctly", () => {
    const action = {
      type: actions.switchIngredients.type,
      payload: { prevIdx: 0, newIdx: 1 },
    };
    const state = reducer(
      [
        {
          name: "Булка",
          _id: "1",
          ...restProps,
        },
        {
          name: "Шмоус",
          _id: "2",
          ...restProps,
        },
      ],
      action,
    );

    expect(state).to.deep.equal([
      { name: "Шмоус", _id: "2", ...restProps },
      { name: "Булка", _id: "1", ...restProps },
    ]);
  });
});
