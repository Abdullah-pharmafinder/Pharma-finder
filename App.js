import React, { useState } from "react";
import "./App.css";

export default function PharmaFinder() {
  const [symptoms, setSymptoms] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState("en");
  const [chatOpen, setChatOpen] = useState(false);

  const handleSearch = () => {
    const mockData = {
      bestMedicine: language === "ur" ? "پیرسیٹامول 500 ملی گرام" : "Paracetamol 500mg",
      alternatives: language === "ur" ? ["پیناڈول", "کالپول"] : ["Panadol", "Calpol"],
      prices: {
        Pakistan: "PKR 50",
        India: "INR 20",
        USA: "$5"
      }
    };
    setResults(mockData);
  };

  return (
    <div className="container">
      <img src="logo.png" alt="Pharma Finder Logo" className="logo" />
      <h1>{language === "ur" ? "فارما فائنڈر" : "PHARMA FINDER"}</h1>

      <div className="language-switch">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ur">اردو</option>
        </select>
      </div>

      <div className="form">
        <input
          placeholder={language === "ur" ? "اپنی علامات یا تشخیص درج کریں" : "Enter your symptoms or diagnosis"}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />
        <input
          placeholder={language === "ur" ? "اپنا علاقہ درج کریں" : "Enter your region"}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <button onClick={handleSearch}>
          {language === "ur" ? "ادویات تلاش کریں" : "Find Medicine"}
        </button>
      </div>

      {results && (
        <div className="results">
          <h2>{language === "ur" ? "تجویز کردہ دوا" : "Recommended Medicine"}</h2>
          <p>{language === "ur" ? "بہترین دوا:" : "Best Medicine:"} {results.bestMedicine}</p>
          <p>{language === "ur" ? "متبادل:" : "Alternatives:"} {results.alternatives.join(", ")}</p>
          <p>{language === "ur" ? "قیمت:" : "Price:"} {results.prices[region] || (language === "ur" ? "دستیاب نہیں" : "Not available")}</p>
        </div>
      )}

      <div className="chat-button">
        <button onClick={() => setChatOpen(!chatOpen)}>
          {language === "ur" ? "فارمیسسٹ سے بات کریں" : "Chat with Pharmacist"}
        </button>
      </div>

      {chatOpen && (
        <div className="chat-box">
          <p>{language === "ur" ? "ہماری لائسنس یافتہ فارمیسسٹ سے بات کریں" : "Chat with our licensed pharmacist"}</p>
          <input placeholder={language === "ur" ? "اپنا سوال لکھیں..." : "Type your question..."} />
        </div>
      )}
    </div>
  );
}