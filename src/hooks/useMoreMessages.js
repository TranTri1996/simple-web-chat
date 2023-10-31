import { useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
const fakeUserNames = ["John", "Smith", "David", "Paul"];

const fakeMessages = [
  "Hello",
  "Hi",
  "How are you?",
  "I am fine",
  "What are you doing?",
  "Nothing much",
  "How about you?",
  "Where are you from?",
  "I am from India",
  "What about you?",
  "I am from USA",
  "Nice to meet you",
  "Same here",
  "Bye",
  "See you later",
  "Goodbye",
  "Goodnight",
  "Good morning",
  "Good afternoon",
  "Good evening",
  "Good day",
  "Have a nice day",
  "Have a good day",
  "Have a good night",
  "Have a good weekend",
];

const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * fakeUserNames.length);
  return fakeUserNames[randomIndex];
};

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * fakeMessages.length);
  return fakeMessages[randomIndex];
};

const useMoreMessages = (numFechMore) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newMessages = [];
      for (let i = 0; i < numFechMore; i++) {
        const userName = getRandomUser();
        const message = getRandomMessage();
        newMessages.push({
          id: `message-id-${uuidv4()}`,
          userName,
          message,
        });
      }

      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
      setLoading(false);
    }, 2000);
  }, [numFechMore]);

  return useMemo(
    () => ({
      fetchMessages,
      messages,
      loading,
    }),
    [fetchMessages, messages, loading]
  );
};

export default useMoreMessages;
