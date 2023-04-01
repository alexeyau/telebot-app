import { useEffect, useState } from "react";

export default function CheckMessage({ token }) {
  // token = "6041598672:AAF6yC3jRKDPAsfSWr8yJVulXl6zCak5jBc";
  const arrReadMessages = [];

  const getMessages = (token) => {
    fetch(`https://api.telegram.org/bot${token}/getUpdates`)
      .then((data) => {
        return data.json();
      })
      .then((readyData) => {
        readyData.result.map((update) => {
          if (!arrReadMessages.includes(update.message.message_id)) {
            arrReadMessages.push(update.message.message_id);
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
