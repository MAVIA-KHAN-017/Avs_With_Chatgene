import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import "./mainChat.css";
import { FaArrowRight, FaBars } from "react-icons/fa";

const MainChat = ({
  promptList,
  toggle,
  toggleHandle,
  conversationList,
  typingBtn,
  setTypingBtn,
  inputHandle,
  typing,
  text,
  setText,
  setPromptList,
  setConversationList,
}) => {

  return (
    <main className="chat">
      <div className="chat-messages">
        {conversationList.length === 0 ? (
          <div className="defult-message-chat-bot">
            <div className="marquee-container">
            <div id="marquee" class="marquee">
            Welcome back! Feel free to ask me anything. How can
            I help? 
            </div>
            </div>
 
          </div>
        ) : (
          conversationList.map((component, index) => {
            return (
              <>
                <div key={index}>{component}</div>
              </>
            );
          })
        )}
      </div>
      <form
        onSubmit={(e) => inputHandle(e)}
        className={toggle ? "input-full" : "input-container"}
      >
        <input
          disabled={typing}
          onChange={(e) => {
            const text1 = e.target.value;
            setText(text1);
            setTypingBtn(text1.trim() === "");
          }}
          value={text}
          placeholder="Ask any question here!"
          type="text"
          className="chat-input"
        />
        <button
          disabled={typingBtn}
          type="submit"
          className={typingBtn ? "submitbtnDisbaled" : "submitbtn"}
          onClick={(e) => inputHandle(e)}
        >
          <FaArrowRight />
        </button>
      </form>
    </main>
  );
};

export default MainChat;
