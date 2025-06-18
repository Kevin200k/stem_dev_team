import os
import json
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
PROMPT_PATH = os.path.join(BASE_DIR, "prompts", "base_prompt.txt")

def load_base_prompt():
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()

@app.route("/api/generate-lesson/<course_id>", methods=["POST"])
def generate_lesson(course_id):
    try:
        body = request.get_json()
        subtopic_id = body.get("subtopic")
        learning_styles = body.get("learning_styles")

        if not subtopic_id or not learning_styles:
            return jsonify({"error": "Missing subtopic or learning_styles"}), 400

        course_file = os.path.join(DATA_DIR, f"{course_id}.json")
        if not os.path.exists(course_file):
            return jsonify({"error": "Course file not found"}), 404

        with open(course_file, "r", encoding="utf-8") as f:
            subtopics_list = json.load(f)

        # Search for the subtopic by ID
        found_subtopic = next((item for item in subtopics_list if item["id"] == subtopic_id), None)

        if not found_subtopic:
            return jsonify({"error": "Subtopic ID not found in course file"}), 404

        base_prompt = load_base_prompt()

        full_prompt = f"""{base_prompt}

Subtopic Title: {found_subtopic["title"]}
Objectives: {json.dumps(found_subtopic["objectives"], indent=2)}
Learning Styles: {json.dumps(learning_styles, indent=2)}

Use these to generate a structured and personalized JSON lesson.
"""

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "llama3-8b-8192",
            "messages": [
                {"role": "user", "content": full_prompt}
            ]
        }

        response = requests.post(GROQ_URL, headers=headers, json=payload)
        data = response.json()

        ai_reply = data["choices"][0]["message"]["content"]
        return jsonify({"lesson": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
