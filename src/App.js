import React, { useRef, useState } from "react";
import "./styles.css";
import html2canvas from "html2canvas";
import {
  Heart,
  Leaf,
  Sun,
  Moon,
  Sparkles,
  Star,
  MessageCircle,
} from "lucide-react";

const icons = {
  Heart,
  Leaf,
  Sun,
  Moon,
  Sparkles,
  Star,
  MessageCircle,
};

export default function App() {
  const cardRefs = useRef([]);
  const [side, setSide] = useState("front");

  const [cards, setCards] = useState([
    {
      text: "What has made you feel most loved lately?",
      icon: "Heart",
      bg: "#f7efe6",
      textColor: "#5b4636",
      width: 180,
      height: 260,
      fontSize: 18,
    },
  ]);

  const [form, setForm] = useState({
    text: "",
    icon: "Heart",
    bg: "#f7efe6",
    textColor: "#5b4636",
    width: 180,
    height: 260,
    fontSize: 18,
  });

  function addCard() {
    if (!form.text.trim()) return;
    setCards([...cards, { ...form }]);
    setForm({ ...form, text: "" });
  }

  async function exportPNG(index) {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 4,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `conversation-card-${index + 1}-${side}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="app">
      <h1>Conversation Card Maker</h1>

      <div className="builder">
        <textarea
          placeholder="Type your question or quote..."
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />

        <label>
          Icon
          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          >
            {Object.keys(icons).map((icon) => (
              <option key={icon}>{icon}</option>
            ))}
          </select>
        </label>

        <label>
          Card Color
          <input
            type="color"
            value={form.bg}
            onChange={(e) => setForm({ ...form, bg: e.target.value })}
          />
        </label>

        <label>
          Text Color
          <input
            type="color"
            value={form.textColor}
            onChange={(e) => setForm({ ...form, textColor: e.target.value })}
          />
        </label>

        <label>
          Width: {form.width}px
          <input
            type="range"
            min="120"
            max="350"
            value={form.width}
            onChange={(e) =>
              setForm({ ...form, width: Number(e.target.value) })
            }
          />
        </label>

        <label>
          Height: {form.height}px
          <input
            type="range"
            min="180"
            max="500"
            value={form.height}
            onChange={(e) =>
              setForm({ ...form, height: Number(e.target.value) })
            }
          />
        </label>

        <label>
          Font Size: {form.fontSize}px
          <input
            type="range"
            min="12"
            max="32"
            value={form.fontSize}
            onChange={(e) =>
              setForm({ ...form, fontSize: Number(e.target.value) })
            }
          />
        </label>

        <button onClick={addCard}>Add Card</button>

        <div className="buttons">
          <button onClick={() => setSide("front")}>Front</button>
          <button onClick={() => setSide("back")}>Back</button>
        </div>
      </div>

      <h2>{side === "front" ? "Front Preview" : "Back Preview"}</h2>

      <div className="cards">
        {cards.map((card, index) => {
          const Icon = icons[card.icon];

          return (
            <div className="card-wrap" key={index}>
              {side === "front" ? (
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="card"
                  style={{
                    background: card.bg,
                    color: card.textColor,
                    width: `${card.width}px`,
                    height: `${card.height}px`,
                  }}
                >
                  <Icon size={28} strokeWidth={1.2} />

                  <p style={{ fontSize: `${card.fontSize}px` }}>{card.text}</p>

                  <div className="line">
                    <span></span>
                    <small>♥</small>
                    <span></span>
                  </div>

                  <footer>BETWEEN US</footer>
                </div>
              ) : (
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="card back-card"
                  style={{
                    background: card.bg,
                    color: card.textColor,
                    width: `${card.width}px`,
                    height: `${card.height}px`,
                  }}
                >
                  <div className="back-border">
                    <div className="logo">BU</div>

                    <div className="brand">BETWEEN US</div>

                    <div className="back-line"></div>

                    <p className="back-copy">
                      Thoughtfully designed prompts for quiet evenings,
                      meaningful conversations, and intentional connection.
                    </p>

                    <Leaf size={32} strokeWidth={1.1} />

                    <small>ABOVE ALL, LOVE DEEPLY.</small>
                  </div>
                </div>
              )}

              <button onClick={() => exportPNG(index)}>Export This Card</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
