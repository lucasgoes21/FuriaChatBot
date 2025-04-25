import { useEffect, useState } from "react"; // ✅ Agora importa o useEffect
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const messages = [];

  return (
    <div className="App w-screen h-screen flex flex-col items-start justify-center bg-cover gap-3 p-5 px-10 bg-[url('assets/bg.png')] overflow-hidden">
      <div id="header" className="w-full flex justify-center ">
        <table className="table-fixed w-full">
          <tbody>
            <tr>
              <td className="w-1/3 text-left">
                <div
                  id="logo"
                  className="w-[64px] h-[53px] bg-contain bg-center bg-no-repeat bg-[url('assets/Logo.png')]"
                ></div>
              </td>
              <td className="w-1/3 text-center align-middle bg-contain bg-center bg-no-repeat bg-[url('assets/LogoString.png')]"></td>
              <td className="w-1/3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        id="chat"
        className=" w-full flex-1 flex flex-col gap-8 p-[36px] pt-[29px] bg-[#3D3D3E]/40 rounded-[24px] overflow-hidden"
      >
        {messages.length === 0 ? (
          <div
            id="chatTextIni"
            className="w-full flex-1 flex flex-col gap-2.5 p-2.5 items-center justify-center overflow-auto"
          >
            <div
              id="logochat"
              className="w-[442px] h-[366px] flex items-center justify-center bg-contain bg-center bg-no-repeat bg-[url('assets/LogoChat.png')]"
            ></div>
            <div
              id="chatTextlogo"
              className="w-auto h-auto flex items-center justify-center"
            >
              <h1
                style={{
                  fontFamily: "Anton, sans-serif",
                  textShadow:
                    "2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white",
                }}
                className="font-['Inknut_Antiqua'] font-normal text-[48px] leading-none tracking-normal text-center text-black"
              >
                Furia Chat Bot
              </h1>
            </div>
            <div
              id="chatsugestion"
              className="w-full h-auto flex flex-wrap items-center justify-center gap-2.5 p-3"
            >
              <div
                id="sugestion1"
                className="w-auto h-auto flex items-center justify-center gap-2.5 p-1.5 bg-[#808080] rounded-[12px] text-white"
              >
                <h1>sujestao 1</h1>
              </div>
              <div
                id="sugestion2"
                className="w-auto h-auto flex items-center justify-center gap-2.5 p-1.5 bg-[#808080] rounded-[12px] text-white"
              >
                <h1>sujestao 2</h1>
              </div>
              <div
                id="sugestion3"
                className="w-auto h-auto flex items-center justify-center gap-2.5 p-1.5 bg-[#808080] rounded-[12px] text-white"
              >
                <h1>sujestao 3</h1>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="chatTextAlt"
            className="w-full h-full flex flex-col gap-5 items-center justify-end overflow-auto"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full h-auto ${
                  msg.type === "bot" ? "justify-start" : "justify-end"
                } items-center`}
              >
                <div
                  className={`${
                    msg.type === "bot" ? "bg-[#121212]" : "bg-[#303030]"
                  } p-2.5 rounded-lg`}
                  style={{ maxWidth: "50%" }}
                >
                  <h1 className="text-white text-base break-words">
                    {msg.message}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          id="chatInput"
          className="w-full h-[60px] flex items-center justify-between gap-[10px] p-[10px] bg-[#303030] rounded-[16px]"
        >
          <input
            id="inputTextinner"
            type="text"
            placeholder="Fala comigo, Furioso!"
            className="w-full h-full flex items-center justify-between gap-[10px] p-[10px] bg-[#121212] rounded-[12px] text-white placeholder-gray-400 outline-none"
          />
          <button
            id="submitButton"
            className="w-[40px] h-[40px] flex items-center justify-center bg-[#808080] rounded-full text-white hover:bg-[#6c6c6c] transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
