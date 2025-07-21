import os
import json
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Constants
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
PROMPT_PATH = os.path.join(os.path.dirname(__file__), "prompts", "base_prompt.txt")


# Load base prompt template from file
def load_base_prompt():
    try:
        with open(PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "You are an AI lesson generator for STEM topics. Follow the given objectives and subtopics."


@app.route("/api/generate-lesson", methods=["POST"])
def generate_lesson():
    try:
        body = request.get_json()

        course_title = body.get("course_title")
        objectives = body.get("objectives")
        subtopics = body.get("subtopics")
        learning_styles = body.get("learning_styles")

        # Validation
        if not course_title or not objectives or not subtopics or not learning_styles:
            return jsonify({"error": "Missing required fields"}), 400

        base_prompt = load_base_prompt()

        # Construct final prompt
        full_prompt = f"""{base_prompt}

Course Title: {course_title}

Objectives:
{json.dumps(objectives, indent=2)}

Subtopics:
{json.dumps(subtopics, indent=2)}

Learning Styles Distribution:
{json.dumps(learning_styles, indent=2)}

Generate a personalized, structured STEM lesson in JSON format based on the above.
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

        if "choices" not in data or not data["choices"]:
            return jsonify({"error": "No content returned by AI"}), 500

        ai_reply = data["choices"][0]["message"]["content"]
        return jsonify({"lesson": ai_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
