import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
import traceback

# Dynamically resolve the absolute path to ml-model
ml_model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'ml-model'))
if ml_model_path not in sys.path:
    sys.path.insert(0, ml_model_path)

try:
    from story_generator import generate_story
except ImportError as e:
    generate_story = None
    print(f"Error importing generate_story: {e}")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/generate', methods=['POST'])
def generate():
    if not generate_story:
        return jsonify({"error": "Backend misconfiguration: story_generator not found."}), 500
    try:
        data = request.get_json(force=True)
        keywords = data.get('keywords') or data.get('prompt')
        if not keywords:
            return jsonify({"error": "Keywords or prompt are required."}), 400
        # Accept both string and list for keywords
        if isinstance(keywords, str):
            # Split comma or space separated string into list
            keywords = [k.strip() for k in keywords.replace(',', ' ').split() if k.strip()]
        story = generate_story(keywords)
        return jsonify({"story": story})
    except Exception as e:
        print(f"Error in /generate: {e}\n{traceback.format_exc()}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Backend is running!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
