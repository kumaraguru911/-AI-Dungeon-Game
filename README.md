# Aether AI Dungeon Game

Aether AI is an interactive, story-driven web application that uses AI to generate creative stories based on user-provided keywords. The project features a beautiful, dynamic frontend and a Python backend powered by HuggingFace Transformers.

## Features

- **Dynamic Story Generation:** Enter keywords or prompts and let the AI create a unique story.
- **Modern UI:** Glassmorphic, dark-themed interface with animated backgrounds and transitions.
- **Keyword-Based Themes:** The background adapts to your story’s theme.
- **Pop-up Effects:** Interactive UI elements for an engaging user experience.
- **Python Backend:** Flask API with a HuggingFace GPT-2 model for story generation.

## Project Structure

```
AI-Dungeon-Game/
│
├── backend/           # Flask backend
│   ├── app.py
│   └── requirements.txt
│
├── ml-model/          # Story generation model
│   ├── story_generator.py
│   └── __init__.py
│
├── frontend/          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── aether ai.png
│   │   ├── aether ai.ico
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── backgrounds.js
│   │   └── ...
│   └── package.json
│
└── README.md
```

## Getting Started

### Backend

1. **Install dependencies:**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

2. **Run the backend server:**
    ```bash
    python app.py
    ```

### Frontend

1. **Install dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

2. **Start the frontend:**
    ```bash
    npm start
    ```

3. Open https://aether-ai-dungeon-game.netlify.app/ in your browser to view frontend.

## Usage

- Enter keywords (e.g., `dragon, castle, hero`) and click "Generate Story".
- Enjoy a dynamically generated story and a themed background!

## Requirements

- Python 3.7+
- Node.js & npm
- See `backend/requirements.txt` for Python dependencies.

## Customization

- **Logo & Favicon:** Replace `frontend/public/aether ai.png` and `aether ai.ico` with your own images.
- **Backgrounds:** Edit `backgrounds.js` to add or change dynamic backgrounds.

## License

This project is for educational and personal use.

---

**Aether AI** – Let your imagination run wild!
