import { useEffect, useState, useRef } from "react"; // ✅ Agora importa o useEffect
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const [inputValue, setInputValue] = useState(""); // Estado para armazenar o valor do input
  const divRef = useRef(null); // Referência para o div que contém as mensagens

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // sempre que uma mensagem for enviada
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // Evita enviar mensagens vazias
  
    // Adiciona a mensagem do usuário e a resposta do bot
    const newMessages = [
      ...messages,
      { type: "person", message: inputValue },
      { type: "bot", message: "Mensagem recebida!" }, // Mensagem do bot
    ];
  
    setMessages(newMessages); // Atualiza o vetor de mensagens
    setInputValue(""); // Limpa o input
  };

  return (
    <div className="App w-screen h-screen flex flex-col items-start justify-center bg-cover gap-3 p-5 px-10 bg-[url('assets/bg.png')] ">
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
  className="w-full h-9/10 flex flex-col gap-2 p-[36px] bg-[#3D3D3E]/40 rounded-[24px]"
>
  {messages.length === 0 ? (
    <div
      id="chatTextIni"
      className="w-full h-full flex-1 flex flex-col gap-2.5 p-2.5 items-center justify-center"
    >
      <div
        id="logochat"
        className="w-full h-full flex items-center justify-center bg-contain bg-center bg-no-repeat bg-[url('assets/LogoChat.png')]"
      ></div>
      <div
        id="chatTextlogo"
        className="w-full h-2/10 flex items-center justify-center"
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
      </div>
    </div>
  ) : (
    <div
      id="chatTextAlt"
      className="w-full h-full gap-5 items-center justify-end overflow-y-auto scroll-smooth scroll-m-0"
      ref = {divRef}
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
            <h1 className="text-white text-base break-words">{msg.message}</h1>
          </div>
        </div>
      ))}
      
    </div >
  )}

  <div
    id="chatInput"
    className="w-full h-[60px] flex items-center justify-between gap-[10px] p-[10px] bg-[#303030] rounded-[16px]"
  >
    <input
      id="inputTextinner"
      type="text"
      placeholder="Fala comigo, Furioso!"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSendMessage();
      }}
      className="w-full h-full flex items-center justify-between gap-[10px] p-[10px] bg-[#121212] rounded-[12px] text-white placeholder-gray-400 outline-none"
    />
    <button
      id="submitButton"
      onClick={handleSendMessage}
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
