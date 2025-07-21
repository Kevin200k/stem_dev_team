import os
import json
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load env variables
load_dotenv()

app = Flask(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
PROMPT_PATH = os.path.join(os.path.dirname(__file__), "prompts", "base_prompt.txt")

def load_base_prompt():
    try:
        with open(PROMPT_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return "You are an AI STEM lesson generator. Follow the structure and details."

@app.route("/api/generate-lesson", methods=["POST"])
def generate_lesson():
    try:
        body = request.get_json()

        # Extract fields
        course_title = body.get("course_title")
        objectives = body.get("objectives")
        subtopics = body.get("subtopics")
        learning_styles = body.get("learning_styles")
        user_id = body.get("user_id")

        # Basic validation
        if not all([course_title, objectives, subtopics, learning_styles]):
            return jsonify({"error": "Missing required fields"}), 400

        # Load prompt
        base_prompt = load_base_prompt()

        # Construct final prompt
        final_prompt = f"""{base_prompt}

User ID: {user_id or "N/A"}
Course Title: {course_title}

Objectives:
{json.dumps(objectives, indent=2)}

Subtopics:
{json.dumps(subtopics, indent=2)}

Learning Styles Distribution:
{json.dumps(learning_styles, indent=2)}

Return only a detailed JSON lesson plan suitable for STEM instruction based on these inputs.
"""

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "llama3-8b-8192",
            "messages": [
                {"role": "user", "content": final_prompt}
            ]
        }

        # Call Groq API
        response = requests.post(GROQ_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()

        if "choices" not in data or not data["choices"]:
            return jsonify({"error": "AI returned no content"}), 502

        ai_reply = data["choices"][0]["message"]["content"]
        return jsonify({"lesson": ai_reply})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to call Groq API", "details": str(e)}), 502

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
