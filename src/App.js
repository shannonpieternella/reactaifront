import React, { useEffect, useState } from "react";

const App = () => {
  const [analysis, setAnalysis] = useState("");

  const fetchAnalysis = async () => {
    try {
      const response = await fetch(
        `https://reactai-backend.onrender.com/ai-mentor`
      );
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error.message);
    }
  };
  

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div>
      <h1>AI Mentor Trading Assistant</h1>
      <p>
        <strong>Analysis:</strong>
      </p>
      <p>{analysis || "Loading analysis..."}</p>
    </div>
  );
};

export default App;
