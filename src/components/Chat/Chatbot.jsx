import React, { useState } from "react";
import Input from "./Input/Input";
import MainChat from "./MainChat/MainChat";
import Response from "./response/Response";
import { ArrowLeftOutlined, RollbackOutlined } from "@ant-design/icons";

import "./style.css";
import { Card } from "antd";
const BASE_URL = process.env.REACT_APP_BOT_BASE_URL
const Chatbot = ({ chatType, setShowCard }) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [conversationList, setConversationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingBtn, setTypingBtn] = useState(true);
  const [typing, setTyping] = useState(false);
  const [responseResult, setResponseResult] = useState("");
  const [promptList, setPromptList] = useState([]);

  const toggleHandle = () => {
    setToggle(!toggle);
  };

  const inputHandle = async (e) => {
    try {
      e.preventDefault();

      setLoading(false);

      const newComponent = <Input text={text} />;
      const reponseComponent = (
        <Response loading={loading} responseResult={responseResult} />
      );

      setConversationList([
        ...conversationList,
        newComponent,
        reponseComponent,
      ]);

      setText("");
      setTypingBtn(true);
      setTyping(true);

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      };

      // If it's a POST request, include the body
      requestOptions.body = JSON.stringify({
        // role: "user",
        prompt: text,
      });

      const response = await fetch(
        `${BASE_URL}/chat/`,
        requestOptions
      );
      if (!response.ok || !response.body) {
        throw response.statusText;
      } else {
        const result = await response.json();

        let type = null;
        let res = null;

        setConversationList((prevList) => {
          const updatedList = [...prevList];
          const lastComponent = updatedList[updatedList.length - 1];

          updatedList[updatedList.length - 1] = React.cloneElement(
            lastComponent,
            { loading: true, responseResult: result, type: type }
          );

          return updatedList;
        });
        // setDisabledFAQ(false);
        setResponseResult("");
        setLoading(false);
        setTyping(false);
        // Here we start prepping for the streaming response
        // const reader = response.body.getReader();
        // const decoder = new TextDecoder();
        // const loopRunner = true;

        // let flag = "";

        // while (loopRunner) {
        //   // Here we start reading the stream, until its done.
        //   const { value, done } = await reader.read();
        //   if (done) {
        //     break;
        //   }
        //   const decodedChunk = decoder.decode(value, { stream: true });
        //   // console.log(decodedChunk, 'chunks');
        //   flag += decodedChunk;
        //   // console.log(flag, 'flag');

        //   // setConversationList((prevList) => {
        //   //   const updatedList = [...prevList];
        //   //   const lastComponent = updatedList[updatedList.length - 1];

        //   //   updatedList[updatedList.length - 1] = React.cloneElement(
        //   //     lastComponent,
        //   //     { loading: true, responseResult: flag, type: "text" }
        //   //   );

        //   //   return updatedList;
        //   // });

        //   setResponseResult("");
        //   setLoading(false);
        //   setTyping(false);
        //   // setAnswer(answer => answer + decodedChunk); // update state with new chunk
        // }
      }
    } catch (error) {
      setLoading(false);
      setTyping(false);

      setConversationList((prevList) => {
        const updatedList = [...prevList];
        const lastComponent = updatedList[updatedList.length - 1];
        // console.log(lastComponent)

        updatedList[updatedList.length - 1] = React.cloneElement(
          lastComponent,
          { loading: true, responseResult: "Request Time out" }
        );

        return updatedList;
      });

      console.log("some error occure", error);
    }
  };

  return (
    <div className="chat-container">
      {/* <div className="main-chat-heading">
        <ArrowLeftOutlined
          title="Back"
          className="chat-card-back-icon"
          onClick={() => setShowCard(false)}
        />
        <RollbackOutlined title="Reset" className="chat-card-reset-icon" />
      </div> */}

      <MainChat
        toggle={toggle}
        toggleHandle={toggleHandle}
        inputHandle={inputHandle}
        conversationList={conversationList}
        text={text}
        setText={setText}
        typingBtn={typingBtn}
        typing={typing}
        setTypingBtn={setTypingBtn}
        setTyping={setTyping}
        setPromptList={setPromptList}
        promptList={promptList}
        setConversationList={setConversationList}
      />
    </div>
  );
};

export default Chatbot;
