import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const TradingAssistant = () => {
  const [analysis, setAnalysis] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const audioPlayerRef = useRef(null);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ai-mentor");
      const updatedAudioUrl = `http://localhost:5000/analysis.mp3?t=${Date.now()}`;
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

  return (
    <div>
      <h1>AI Mentor Trading Assistant</h1>
      <p><strong>Analysis:</strong></p>
      <p>{analysis || "Loading analysis..."}</p>

      <audio ref={audioPlayerRef} controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default TradingAssistant;
