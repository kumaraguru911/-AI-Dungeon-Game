import { useEffect, useState } from "react";
import { getBackgroundUrl } from "./backgrounds";
import logo from "./aether ai.png";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Loading...");
  const [showStory, setShowStory] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgUrl, setBgUrl] = useState(getBackgroundUrl(""));

  useEffect(() => {
    fetch("http://127.0.0.1:5000/", { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setMessage(data.message || JSON.stringify(data)))
      .catch((err) => setMessage("Error connecting to backend: " + err.message));
  }, []);

  useEffect(() => {
    setBgUrl(getBackgroundUrl(input));
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowStory(false);
    setMessage("");
    try {
      const res = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords: input })
      });
      const data = await res.json();
      setMessage(data.story || data.error || "No story generated.");
      setShowStory(true);
    } catch (err) {
      setMessage("Error connecting to backend: " + err.message);
      setShowStory(true);
    }
    setLoading(false);
  };

  return (
    <div className="wow-bg dark-theme">
      <header className="wow-header animate-fade-in">
        <img src={logo} alt="Aether AI Logo" className="wow-logo" />
        <span className="wow-site-title">Aether <span className="wow-ai-gradient">AI</span></span>
      </header>
      <div className="wow-glass-card animate-fade-in">
        <h1 className="wow-title animate-slide-down">Create Your Fantasy Story</h1>
        <form onSubmit={handleSubmit} className="wow-form animate-fade-in">
          <input
            className="wow-input animate-pop"
            type="text"
            placeholder="Enter keywords (e.g. dragon, castle, hero)"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <button className={`wow-btn animate-pop ${loading ? 'loading' : ''}`} type="submit" disabled={loading || !input.trim()}>
            {loading ? <span className="loader"></span> : <span>✨ Generate Story ✨</span>}
          </button>
        </form>
        {showStory && (
          <div className="wow-story animate-fade-in-up">
            <h2 className="wow-story-title animate-slide-up">Your Story</h2>
            <p className="wow-story-text">{message}</p>
          </div>
        )}
      </div>
      <div className="wow-bg-image" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="wow-bg-overlay dark-overlay" />
      <div className="wow-lights">
        <div className="wow-light wow-light1"></div>
        <div className="wow-light wow-light2"></div>
        <div className="wow-light wow-light3"></div>
      </div>
    </div>
  );
}

export default App;
