import { useEffect, useState } from "react";

export default function CheckMessage({ token }) {
  token = "6041598672:AAF6yC3jRKDPAsfSWr8yJVulXl6zCak5jBc";
  const arrReadMessages = [];

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const sendMessage = (userId, getRandomArbitrary) => {
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: userId,
        text: getRandomNum(0, 10),
      }),
    });
  };

  const getMessages = (token) => {
    fetch(`https://api.telegram.org/bot${token}/getUpdates`)
      .then((data) => {
        return data.json();
      })
      .then((readyData) => {
        readyData.result.map((update) => {
          if (!arrReadMessages.includes(update.message.message_id)) {
            arrReadMessages.push(update.message.message_id);
            sendMessage(update.message.from.id);
          }
        });
      });
  };

  setInterval(() => {
    getMessages(token);
  }, 7000);

  // window.onstorage = () => {};

  return (
    <div>
      <div></div>
    </div>
  );
}
