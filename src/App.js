import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./TradingAssistant.css"; // Custom CSS for styling

const TradingAssistant = () => {
  const [analysis, setAnalysis] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const audioPlayerRef = useRef(null);
  const widgetContainerRef = useRef(null);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get("http://91.107.226.186:5000/ai-mentor");
      const updatedAudioUrl = `http://91.107.226.186:5000/analysis.mp3?t=${Date.now()}`;
      setAnalysis(response.data.analysis);
      setAudioUrl(updatedAudioUrl);
    } catch (error) {
      console.error("Error fetching analysis:", error.message);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    const intervalId = setInterval(fetchAnalysis, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (audioUrl && audioPlayerRef.current) {
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.load();
      audioPlayerRef.current.play().catch((err) => {
        console.error("Error playing audio:", err.message);
      });
    }
  }, [audioUrl]);

  useEffect(() => {
    // Initialiseer de TradingView-widget
    if (widgetContainerRef.current) {
      new window.TradingView.widget({
        container_id: "tradingview-widget",
        autosize: true,
        symbol: "BLACKBULL:NAS100", // NASDAQ 100 van BlackBull
        interval: "15", // 15 minuten interval
        timezone: "America/New_York", // New York-tijdzone
        theme: "dark", // Donker thema
        style: "1",
        locale: "en",
        toolbar_bg: "#1e1e1e",
        enable_publishing: false,
        allow_symbol_change: true,
        hideideas: true,
        studies: [] // Volume-indicator verwijderd
      });
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>AI Mentor Trading Assistant</h1>
        <p>Your Intelligent Trading Partner</p>
      </div>
      
      <div className="dashboard-body">
        <div className="analysis-section">
          <h2>Analysis</h2>
          <p>{analysis || "Loading analysis..."}</p>
        </div>
        
        <div className="audio-section">
          <h2>Audio Guidance</h2>
          <audio ref={audioPlayerRef} controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div className="tradingview-section">
          <h2>Trading Chart</h2>
          {/* Widget wordt hier weergegeven */}
          <div ref={widgetContainerRef} id="tradingview-widget" className="tradingview-widget"></div>
        </div>
      </div>
      
      <div className="dashboard-footer">
        <p>Powered by <span className="brand">UpsellFX</span></p>
      </div>
    </div>
  );
};

export default TradingAssistant;
