import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";

export default function PharmaFinder() {
  const [symptoms, setSymptoms] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  // Auto-detect region using browser geolocation
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setRegion(data.country_name);
      })
      .catch(() => setRegion(""));
  }, []);

  const symptomMap = {
    fever: {
      medicine: "Paracetamol 500mg",
      alternatives: ["Panadol", "Calpol"],
      prices: {
        Pakistan: "PKR 50",
        India: "INR 20",
        USA: "$5"
      }
    },
    headache: {
      medicine: "Ibuprofen 200mg",
      alternatives: ["Advil", "Brufen"],
      prices: {
        Pakistan: "PKR 60",
        India: "INR 25",
        USA: "$6"
      }
    },
    cough: {
      medicine: "Dextromethorphan Syrup",
      alternatives: ["Benylin", "Robitussin"],
      prices: {
        Pakistan: "PKR 80",
        India: "INR 30",
        USA: "$7"
      }
    }
  };

  const handleSearch = () => {
    const key = Object.keys(symptomMap).find(sym =>
      symptoms.toLowerCase().includes(sym)
    );

    if (key) {
      setResults(symptomMap[key]);
    } else {
      setResults({
        medicine: "No exact match found",
        alternatives: ["Consult your doctor"],
        prices: { [region]: "Unavailable" }
      });
    }
  };

  const handleChat = async () => {
    if (!chatMessage.trim()) return;
    setChatResponse("Thinking...");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful pharmacist assistant. You give medical advice, suggest medicines, and recommend what to do for symptoms."
            },
            {
              role: "user",
              content: chatMessage
            }
          ]
        })
      });
      const data = await res.json();
      const reply = data.choices[0].message.content;
      setChatResponse(reply);
    } catch (err) {
      setChatResponse("Sorry, I couldn't fetch a response.");
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Pharma Finder Logo" className="logo" />
      <h1>PHARMA FINDER</h1>

      <div className="form">
        <input
          placeholder="Enter your symptoms (e.g., fever, cough)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <input
          placeholder="Your region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button onClick={handleSearch}>Find Medicine</button>
      </div>

      {results && (
        <div className="results">
          <h2>Recommended Medicine</h2>
          <p><strong>Best Medicine:</strong> {results.medicine}</p>
          <p><strong>Alternatives:</strong> {results.alternatives.join(", ")}</p>
          <p><strong>Price:</strong> {results.prices[region] || "Not available"}</p>
        </div>
      )}

      <div className="chat-button">
        <button onClick={() => setChatOpen(!chatOpen)}>
          Chat with Pharmacist
        </button>
      </div>

      {chatOpen && (
        <div className="chat-box">
          <p>Ask your question:</p>
          <input
            placeholder="Type your question..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button style={{ marginTop: "10px" }} onClick={handleChat}>
            Send
          </button>
          {chatResponse && <p style={{ marginTop: "10px" }}><strong>Pharmacist:</strong> {chatResponse}</p>}
        </div>
      )}
    </div>
  );
}