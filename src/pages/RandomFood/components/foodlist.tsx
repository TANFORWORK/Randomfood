import { useState } from "react";

const RandomFoodPicker = () => {
  const [result, setResult] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const foodEmojis = [
    "🍕",
    "🍔",
    "🍜",
    "🍣",
    "🌮",
    "🍝",
    "🍛",
    "🥘",
    "🍲",
    "🥗",
  ];

  const annoyingMessages = [
    "อีกแล้วเหรอ? 🙄",
    "เลือกไม่ได้เหรอวะ? 😤",
    "ปวดหัวแล้วนะ... 🤯",
    "จะกดกี่ครั้งวะ! 😠",
    "หิวจริงหรือเปล่าเนี่ย? 🤨",
    "เบื่อแล้วนะเฮ้ย! 😑",
    "ไปกินข้าวเปล่าซะ! 🍚",
    "เลือกเองสิ ขี้เกียจ! 😒",
  ];

  const lazyButtonTexts = [
    "เลือกให้หน่อยสิ 🥺",
    "กดซิ... ขี้เกียจเหรอ? 😏",
    "มาสิ มาสิ กดเร็ว! 🤪",
    "จะกดหรือเปล่าวะ? 😤",
    "กดดิ กดดิ! อย่าขี้เกียจ 🙃",
    "หิวแล้วใช่มั้ย? กดซะ! 😈",
    "เร็วๆ หน่อย เดี๋ยวหิว! 🤤",
  ];

  const addChoice = () => {
    const trimmed = input.trim();
    if (trimmed && !choices.includes(trimmed)) {
      setChoices([...choices, trimmed]);
      setInput("");
      setResult(null);
    } else if (choices.includes(trimmed)) {
      alert("มีแล้วโว้ย! ตาบอดเหรอ? 🙄");
    }
  };

  const removeChoice = (choiceToRemove: string) => {
    setChoices(choices.filter((c) => c !== choiceToRemove));
    if (result === choiceToRemove) {
      setResult(null);
    }
  };

  const pickRandom = () => {
    setClickCount((prev) => prev + 1);

    if (choices.length === 0) {
      const messages = [
        "ใส่ร้านก่อนสิ จะให้เลือกอากาศหรอ? 🙄",
        "โง่เหรอ? ใส่ร้านก่อนสิ! 😤",
        "ร้านไหนวะ? ไม่เห็นมีเลย! 🤨",
        "เอ๊ะ! ร้านหายไปไหนหมด? 👻",
      ];
      setResult(messages[Math.floor(Math.random() * messages.length)]);
      setShowAlert(true);
      return;
    }

    if (clickCount > 3) {
      setResult(
        annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)]
      );
      setShowAlert(true);
      return;
    }

    setIsSpinning(true);

    let counter = 0;
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * choices.length);
      setResult(choices[randomIndex]);
      counter++;

      if (counter >= 20) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setShowAlert(true);
      }
    }, 100);
  };

  const getRandomEmoji = () => {
    return foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
  };

  const getCurrentButtonText = () => {
    if (isSpinning) return "กำลังคิด... รอหน่อยสิ! 🤔";
    return lazyButtonTexts[clickCount % lazyButtonTexts.length];
  };

  const getResultMessage = () => {
    if (clickCount > 5) {
      return "เอาล่ะๆ ไปกินซะ! เบื่อแล้ว! 😤💢";
    } else if (clickCount > 3) {
      return "นี่แหละ! จะให้เลือกกี่ครั้งวะ? 🙄";
    } else {
      return "เอาล่ะ ไปกินนี่แหละ! 😋";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minHeight: "100dvh",
        padding:
          "env(safe-area-inset-top, 1rem) 1rem env(safe-area-inset-bottom, 1rem) 1rem",
        backgroundColor: "#fafafa",
        fontFamily: "'Inter', 'Kanit', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#2c2c2c",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          animation: "fadeInDown 0.8s ease-out",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            marginBottom: "0.5rem",
            color: "#1a1a1a",
            fontWeight: "600",
            letterSpacing: "-0.02em",
            animation:
              clickCount > 5
                ? "shake 0.5s ease-in-out infinite"
                : "bounce 2s infinite",
            lineHeight: "1.2",
          }}
        >
          🍽️ {clickCount > 5 ? "กินไรก็ได้แล้วว!" : "กินไรดีน้า เฮ้ย"}
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "0.9rem",
            fontWeight: "400",
            animation: "fadeIn 1s ease-out 0.3s both",
            lineHeight: "1.4",
          }}
        >
          {clickCount > 3
            ? "เร็วๆ หน่อยสิ หิวแล้ว! 😠"
            : "ใส่ร้านมาซิ แล้วจะให้เราเลือกให้ 😏"}
        </p>
      </div>

      {/* Input Section */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "350px",
          marginBottom: "1.5rem",
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "1px solid #e5e5e5",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          animation: "slideInUp 0.6s ease-out 0.2s both",
          transition: "all 0.3s ease",
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
        }}
        onTouchEnd={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
        }}
      >
        <input
          type="text"
          value={input}
          placeholder={
            choices.length === 0
              ? "ชื่อร้าน... เร็วๆ หน่อย! 🤨"
              : "อีกร้านมั้ย? เพิ่มซิ 😏"
          }
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addChoice()}
          style={{
            flex: 1,
            padding: "1rem",
            fontSize: "16px",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#2c2c2c",
            WebkitAppearance: "none",
          }}
        />
        <button
          onClick={addChoice}
          style={{
            padding: "1rem",
            fontSize: "0.9rem",
            backgroundColor: "#2c2c2c",
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: input.trim() ? "scale(1.05)" : "scale(1)",
            minWidth: "70px",
            WebkitTapHighlightColor: "transparent",
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = "#1a1a1a";
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.textContent = "เพิ่มแล้ว!";
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = "#2c2c2c";
            e.currentTarget.style.transform = input.trim()
              ? "scale(1.05)"
              : "scale(1)";
            e.currentTarget.textContent = "เพิ่มซิ";
          }}
        >
          เพิ่มซิ
        </button>
      </div>

      {/* Choices List */}
      {choices.length > 0 && (
        <div
          style={{
            width: "100%",
            maxWidth: "350px",
            marginBottom: "1.5rem",
            animation: "slideInUp 0.5s ease-out",
          }}
        >
          <h3
            style={{
              color: "#2c2c2c",
              textAlign: "left",
              marginBottom: "1rem",
              fontSize: "1rem",
              fontWeight: "500",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            รายการร้าน ({choices.length}) -{" "}
            {choices.length > 5 ? "เยอะมากแล้ว! 😵" : "เยอะจัง 🙃"}
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxHeight: "250px",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {choices.map((choice, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.8rem 1rem",
                  marginBottom: 8,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  border: "1px solid #f0f0f0",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: `slideInLeft 0.5s ease-out ${i * 0.1}s both`,
                  transform: "translateX(0)",
                  WebkitTapHighlightColor: "transparent",
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.borderColor = "#d0d0d0";
                  e.currentTarget.style.backgroundColor = "#fcfcfc";
                  e.currentTarget.style.transform =
                    "translateX(4px) scale(1.01)";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.borderColor = "#f0f0f0";
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "translateX(0) scale(1)";
                }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "400",
                    color: "#2c2c2c",
                    transition: "all 0.3s ease",
                    flex: 1,
                    marginRight: "0.5rem",
                    wordBreak: "break-word",
                  }}
                >
                  {getRandomEmoji()} {choice}
                </span>
                <button
                  onClick={() => {
                    if (Math.random() > 0.7) {
                      alert("แน่ใจมั้ยว่าจะลบ? 🤔");
                      setTimeout(() => removeChoice(choice), 500);
                    } else {
                      removeChoice(choice);
                    }
                  }}
                  style={{
                    backgroundColor: "transparent",
                    color: "#999",
                    border: "1px solid #e5e5e5",
                    borderRadius: 6,
                    padding: "0.4rem 0.6rem",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: "0.8rem",
                    minWidth: "60px",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onTouchStart={(e) => {
                    const randomTexts = [
                      "ลบซะ!",
                      "โดนแล้ว!",
                      "บายบาย!",
                      "หายไป!",
                    ];
                    e.currentTarget.style.backgroundColor = "#ff6b6b";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
                    e.currentTarget.textContent =
                      randomTexts[
                        Math.floor(Math.random() * randomTexts.length)
                      ];
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      if (e.currentTarget) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#999";
                        e.currentTarget.style.transform =
                          "scale(1) rotate(0deg)";
                        e.currentTarget.textContent = "ลบ";
                      }
                    }, 100);
                  }}
                >
                  ลบ
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pick Random Button */}
      <button
        onClick={pickRandom}
        disabled={isSpinning}
        style={{
          width: "100%",
          maxWidth: "350px",
          padding: "1rem",
          fontSize: "1rem",
          fontWeight: "500",
          backgroundColor: isSpinning
            ? "#f5f5f5"
            : clickCount > 5
            ? "#ff6b6b"
            : "#2c2c2c",
          color: isSpinning ? "#999" : "#fff",
          border: "none",
          borderRadius: 8,
          cursor: isSpinning ? "not-allowed" : "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: isSpinning
            ? "wiggle 0.5s ease-in-out infinite"
            : clickCount > 5
            ? "shake 0.3s ease-in-out infinite"
            : "slideInUp 0.6s ease-out 0.4s both",
          transform: isSpinning ? "scale(0.98)" : "scale(1)",
          WebkitTapHighlightColor: "transparent",
          marginBottom: "2rem",
        }}
        onTouchStart={(e) => {
          if (!isSpinning) {
            e.currentTarget.style.backgroundColor =
              clickCount > 5 ? "#ff5252" : "#1a1a1a";
            e.currentTarget.style.transform = "scale(1.02) translateY(-1px)";

            const touchTexts = [
              "กดแล้วนะ! 😏",
              "เดี๋ยวนะ... 🤔",
              "รอหน่อย! 😤",
              "อดใจซิ! 🙄",
              "เร็วไปมั้ย? 😒",
            ];
            e.currentTarget.textContent =
              touchTexts[Math.floor(Math.random() * touchTexts.length)];
          }
        }}
        onTouchEnd={(e) => {
          if (!isSpinning) {
            e.currentTarget.style.backgroundColor =
              clickCount > 5 ? "#ff6b6b" : "#2c2c2c";
            e.currentTarget.style.transform = "scale(1) translateY(0)";
            e.currentTarget.textContent = getCurrentButtonText();
          }
        }}
      >
        {getCurrentButtonText()}
      </button>

      {/* Annoying floating messages */}
      {clickCount > 2 && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            right: "1rem",
            backgroundColor: "#ff6b6b",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: 20,
            fontSize: "0.8rem",
            animation: "floatAnnoy 3s ease-in-out infinite",
            zIndex: 100,
          }}
        >
          หิวจริงหรือเปล่าเนี่ย? 🤨
        </div>
      )}

      {clickCount > 4 && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "1rem",
            backgroundColor: "#6c5ce7",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: 20,
            fontSize: "0.8rem",
            animation: "floatAnnoy2 2.5s ease-in-out infinite",
            zIndex: 100,
          }}
        >
          เลือกเองสิ! 😤
        </div>
      )}

      {/* Result Modal */}
      {showAlert && (
        <div
          onClick={() => setShowAlert(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            height: "100dvh",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.3s ease-out",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "2rem 1.5rem",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              textAlign: "center",
              width: "100%",
              maxWidth: "300px",
              border: "1px solid #f0f0f0",
              animation:
                clickCount > 5
                  ? "popInAngry 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                  : "popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                animation:
                  clickCount > 5
                    ? "angryBounce 0.5s ease-in-out infinite"
                    : "bounce 1s ease-in-out infinite",
              }}
            >
              {clickCount > 5 ? "😤" : choices.length === 0 ? "🤷‍♂️" : "🎯"}
            </div>
            <h2
              style={{
                color: "#1a1a1a",
                marginBottom: "1.5rem",
                fontSize: "1.2rem",
                fontWeight: "600",
                animation: "fadeIn 0.5s ease-out 0.2s both",
                lineHeight: "1.3",
              }}
            >
              {getResultMessage()}
            </h2>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "2rem",
                fontSize: "1.2rem",
                color: "#2c2c2c",
                padding: "1rem",
                backgroundColor: clickCount > 5 ? "#ffebee" : "#f8f8f8",
                borderRadius: 8,
                border: `1px solid ${clickCount > 5 ? "#ffcdd2" : "#f0f0f0"}`,
                animation:
                  clickCount > 5
                    ? "angryPulse 1s ease-in-out infinite"
                    : "pulse 2s ease-in-out infinite",
                wordBreak: "break-word",
                lineHeight: "1.4",
              }}
            >
              {result}
            </div>
            <button
              style={{
                padding: "0.8rem 1.5rem",
                backgroundColor: clickCount > 5 ? "#ff6b6b" : "#2c2c2c",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: "fadeIn 0.5s ease-out 0.4s both",
                WebkitTapHighlightColor: "transparent",
                width: "100%",
              }}
              onClick={() => {
                setShowAlert(false);
                if (clickCount > 6) {
                  setTimeout(() => {
                    alert("ไปกินซะแล้ว! อย่ามากวนอีก! 😠");
                  }, 500);
                }
              }}
              onTouchStart={(e) => {
                const closeTexts = [
                  "รู้แล้ว ไปแล้ว! 🏃‍♂️",
                  "ปิดซะที! 😒",
                  "พอแล้ว! 😤",
                  "เบื่อแล้ว! 🙄",
                  "ไปๆ! 👋",
                ];
                e.currentTarget.style.backgroundColor =
                  clickCount > 5 ? "#ff5252" : "#1a1a1a";
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.textContent =
                  closeTexts[clickCount % closeTexts.length];
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.backgroundColor =
                  clickCount > 5 ? "#ff6b6b" : "#2c2c2c";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.textContent =
                  clickCount > 5 ? "พอแล้ว! 😤" : "ปิดซะที 😒";
              }}
            >
              {clickCount > 5 ? "พอแล้ว! 😤" : "ปิดซะที 😒"}
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @supports (-webkit-touch-callout: none) {
          input {
            font-size: 16px !important;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        @keyframes wiggle {
          0% { transform: rotate(0deg) scale(0.98); }
          25% { transform: rotate(0.5deg) scale(0.98); }
          50% { transform: rotate(0deg) scale(0.98); }
          75% { transform: rotate(-0.5deg) scale(0.98); }
          100% { transform: rotate(0deg) scale(0.98); }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes popInAngry {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) translateY(-5px) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(44, 44, 44, 0.1);
          }
          50% {
            transform: scale(1.01);
            box-shadow: 0 0 0 4px rgba(44, 44, 44, 0.05);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(44, 44, 44, 0);
          }
        }

        @keyframes angryPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.2);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 6px rgba(255, 107, 107, 0.1);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
          }
        }

        @keyframes angryBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-2deg); }
          75% { transform: translateY(-2px) rotate(2deg); }
        }

        @keyframes floatAnnoy {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes floatAnnoy2 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        ul::-webkit-scrollbar { width: 4px; }
        ul::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 2px; }
        ul::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 2px; }
        ul::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }

        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        input, span {
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
        }
        * {
          -webkit-overflow-scrolling: touch;
        }

        @supports (height: 100dvh) {
          .container {
            min-height: 100dvh;
          }
        }

        @media screen and (max-width: 375px) {
          h1 {
            font-size: 1.6rem !important;
          }
          
          p {
            font-size: 0.85rem !important;
          }
          
          button {
            font-size: 0.9rem !important;
          }
          
          .modal-title {
            font-size: 1.1rem !important;
          }
          
          .modal-result {
            font-size: 1.1rem !important;
          }
        }

        @supports (padding: max(0px)) {
          .container {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
          }
        }

        @media (hover: none) and (pointer: coarse) {
          button:hover {
            transform: none !important;
          }
          
          li:hover {
            transform: none !important;
          }
          
          .input-container:hover {
            transform: none !important;
          }
        }

        /* Extra annoying animations */
        @keyframes crazyShake {
          0% { transform: translateX(0) rotate(0deg); }
          10% { transform: translateX(-3px) rotate(-1deg); }
          20% { transform: translateX(3px) rotate(1deg); }
          30% { transform: translateX(-3px) rotate(-1deg); }
          40% { transform: translateX(3px) rotate(1deg); }
          50% { transform: translateX(-2px) rotate(-0.5deg); }
          60% { transform: translateX(2px) rotate(0.5deg); }
          70% { transform: translateX(-2px) rotate(-0.5deg); }
          80% { transform: translateX(2px) rotate(0.5deg); }
          90% { transform: translateX(-1px) rotate(0deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }

        @keyframes annoyingGlow {
          0% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 107, 107, 0.8), 0 0 30px rgba(255, 107, 107, 0.6); }
          100% { box-shadow: 0 0 5px rgba(255, 107, 107, 0.5); }
        }

        @keyframes spinCrazy {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(0.9); }
          75% { transform: rotate(270deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }

        /* Apply crazy animations when user clicks too much */
        .crazy-mode {
          animation: crazyShake 0.5s ease-in-out infinite !important;
        }

        .glow-mode {
          animation: annoyingGlow 1s ease-in-out infinite !important;
        }

        .spin-mode {
          animation: spinCrazy 2s linear infinite !important;
        }
      `}</style>

      {/* Extra annoying elements when user clicks too much */}
      {clickCount > 6 && (
        <>
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#ff9800",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: 20,
              fontSize: "0.9rem",
              animation: "crazyShake 0.3s ease-in-out infinite",
              zIndex: 101,
              textAlign: "center",
            }}
          >
            หยุดกดได้แล้ว! 😵‍💫
          </div>

          <div
            style={{
              position: "fixed",
              bottom: "20%",
              right: "50%",
              transform: "translateX(50%)",
              backgroundColor: "#e91e63",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: 20,
              fontSize: "0.8rem",
              animation: "spinCrazy 1s linear infinite",
              zIndex: 101,
            }}
          >
            🤯
          </div>
        </>
      )}

      {/* Ultimate annoyance level */}
      {clickCount > 8 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                fontSize: "1.5rem",
                animation: `floatAnnoy ${
                  1 + Math.random()
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {["😤", "🙄", "😠", "🤯", "😵‍💫"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomFoodPicker;
