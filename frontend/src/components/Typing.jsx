import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Typing = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) navigate("/");
  }, [username, navigate]);

  if (!username) return null;

  return <TypingTest username={username} />;
};

const TypingTest = ({ username }) => {
  const [para, setPara] = useState(
    "Hello everyone,\nWelcome to the typing test."
  );
  const [input, setInput] = useState("");
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [typingDuration, setTypingDuration] = useState(0);
  const inpRef = useRef(null);

  useEffect(() => {
    if (inpRef.current) inpRef.current.focus();
  }, []);

  useEffect(() => {
    let timer;
    if (isTyping) {
      timer = setInterval(() => {
        setTypingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTyping]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!isTyping && value.length > 0) setIsTyping(true);
    if (value.length > para.length) return;

    setInput(value);

    let mistakeCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== para[i]) mistakeCount++;
    }
    setMistakes(mistakeCount);

    if (value.length === para.length) {
      setIsTyping(false);
      saveResult(value.length, mistakeCount);
    }
  };

  const saveResult = async (charIndex, mistakeCount) => {
    const timeSpent = typingDuration / 60 || 1 / 60;
    const correctChars = charIndex - mistakeCount;
    const calculatedWPM = (correctChars / 5 / timeSpent).toFixed(2);
    const calculatedCPM = (correctChars / timeSpent).toFixed(2);

    setWPM(calculatedWPM);
    setCPM(calculatedCPM);

    const result = {
      username,
      WPM: calculatedWPM,
      CPM: calculatedCPM,
      mistakes: mistakeCount,
      typingDuration,
    };

    try {
      await axios.post("http://localhost:5000/results", result);
    } catch (err) {
      console.error("Error saving result:", err);
    }
  };

  const handleReset = () => {
    setMistakes(0);
    setInput("");
    setIsTyping(false);
    setWPM(0);
    setCPM(0);
    if (inpRef.current) {
      inpRef.current.value = "";
      inpRef.current.focus();
    }
  };

  const handleFullReset = () => {
    handleReset();
    setTypingDuration(0);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const fileText = event.target.result.replace(/\r\n|\r/g, "\n");
      setPara(fileText);
      handleReset();
    };
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl flex flex-col gap-8">
        <div className="flex justify-between items-center mb-2">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded transition"
            onClick={() => {
              localStorage.removeItem("username");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded transition"
            onClick={() => {
              window.location.href = "/leaderboard";
            }}
          >
            Leaderboard
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Typing Test
        </h2>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-1 justify-center text-lg font-mono select-none text-center">
            {para.split("\n").map(
              (line, lineIdx) => (
                console.log(lineIdx, line),
                (
                  <div key={lineIdx} className="flex justify-center flex-wrap">
                    {line.split("").map((char, charIdx) => {
                      console.log(char, charIdx);
                      if (char === " ") {
                        return <span key={charIdx} className="w-4"></span>;
                      }
                      const globalIndex =
                        para
                          .split("\n")
                          .slice(0, lineIdx)
                          .reduce((acc, curr) => acc + curr.length + 1, 0) +
                        charIdx;

                      let colorClass = "";
                      if (input.length > globalIndex) {
                        colorClass =
                          input[globalIndex] === char
                            ? "text-green-600 border-b-2 border-green-400"
                            : "text-red-600 border-b-2 border-red-400";
                      } else if (input.length === globalIndex) {
                        colorClass = "text-blue-600 border-b-2 border-blue-400";
                      } else {
                        colorClass = "text-gray-500";
                      }

                      return (
                        <span
                          key={globalIndex}
                          className={`char transition-all ${colorClass}`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                )
              )
            )}
          </div>

          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-lg"
            ref={inpRef}
            value={input}
            onChange={handleChange}
            placeholder="Start typing here..."
            maxLength={para.length}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 rounded p-4">
          <p>
            <span className="font-semibold text-purple-600">Mistakes:</span>{" "}
            <span className="font-bold">{mistakes}</span>
          </p>
          <p>
            <span className="font-semibold text-purple-600">WPM:</span>{" "}
            <span className="font-bold">{WPM}</span>
          </p>
          <p>
            <span className="font-semibold text-purple-600">CPM:</span>{" "}
            <span className="font-bold">{CPM}</span>
          </p>
          <p>
            <span className="font-semibold text-purple-600">Duration:</span>{" "}
            <span className="font-bold">{typingDuration}</span> sec
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
            onClick={handleReset}
          >
            Try Again
          </button>

          <input
            type="file"
            className="file-input block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100
              transition"
            onChange={handleFileChange}
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
            onClick={handleFullReset}
          >
            Full Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Typing;
