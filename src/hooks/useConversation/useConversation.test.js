import { act, renderHook } from "@testing-library/react-hooks";
import useConversation from "./useConversation";

describe("useConversation", () => {
  const mockMessage = {
    id: `message-id`,
    userName: "John",
    message: "Hello, World!",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with an empty conversation", () => {
    const { result } = renderHook(() => useConversation());

    const [conversation] = result.current;
    expect(conversation).toEqual([]);
  });

  it("should update conversation and local storage", () => {
    const { result } = renderHook(() => useConversation());

    const [, updateConversation] = result.current;

    act(() => {
      updateConversation(mockMessage);
    });

    const [conversation] = result.current;

    expect(conversation).toEqual([mockMessage]);
  });

  it("should update conversation when storage event is triggered", () => {
    const { result } = renderHook(() => useConversation());

    const [, updateConversation] = result.current;

    act(() => {
      updateConversation(mockMessage);
    });

    const [conversation] = result.current;

    expect(conversation).toEqual([mockMessage]);

    const storageEvent = new Event("storage");
    window.dispatchEvent(storageEvent);

    const [updatedConversation] = result.current;
    expect(updatedConversation).toEqual([mockMessage]);
  });
});
