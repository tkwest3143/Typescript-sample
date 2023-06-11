"use client";
import { useState } from "react";

type Message = {
  userId: number;
  text: string;
};
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (input !== "") {
      messages.push({ userId: 0, text: input });
      setMessages([...messages]);
      fetch(`/api/gpt`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      }).then(async (data) => {
        const result = await data.json();
        messages.push({
          userId: 1,
          text: result.result || "sorry not response gpt",
        });
        setMessages([...messages]);
      });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-row justify-center items-center bg-green-500 p-4">
        <h1 className="text-white text-2xl">Next.js Chat App</h1>
      </div>
      <div className="flex flex-col flex-grow overflow-y-scroll bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-row ${
              message.userId === 0 ? "justify-end" : "justify-start"
            } items-end p-4`}
          >
            <p
              className={`max-w-xs ${
                message.userId === 0 ? "bg-green-100" : "bg-gray-300"
              } rounded-lg p-2 mb-2`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="flex flex-row items-center p-4 bg-gray-200"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-grow rounded-full p-2 mr-4 bg-white"
        />
        <button
          type="submit"
          className="bg-green-500 text-white rounded-full p-2"
        >
          Send
        </button>
      </form>
    </div>
  );
}
