import { renderHook } from "@testing-library/react-hooks";

import useMoreMessages from "./useMoreMessages";

describe("useMoreMessages", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should initialize with an empty messages array", () => {
    const { result } = renderHook(() => useMoreMessages(5));

    const { messages } = result.current;
    expect(messages).toEqual([]);
  });
});
