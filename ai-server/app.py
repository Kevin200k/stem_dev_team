import os
import json
import requests
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
STATIC_FOLDER = os.path.join(os.path.dirname(__file__), "static")
os.makedirs(STATIC_FOLDER, exist_ok=True)

# Environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
PROMPT_PATH = os.path.join("prompts", "base_prompt.txt")

# Load prompt from file
def load_prompt():
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()

# Generate audio from ElevenLabs
# def generate_audio(text, filename="output.mp3"):
#     url = "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL"
#     headers = {
#         "xi-api-key": ELEVENLABS_API_KEY,
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "text": text,
#         "voice_settings": {
#             "stability": 0.4,
#             "similarity_boost": 0.8
#         }
#     }

#     response = requests.post(url, headers=headers, json=payload)
#     response.raise_for_status()

#     audio_path = os.path.join(STATIC_FOLDER, filename)
#     with open(audio_path, "wb") as f:
#         f.write(response.content)

#     return f"/static/{filename}"

# Route to generate the lesson
@app.route("/api/generate-lesson", methods=["POST"])
def generate_lesson():
    try:
        data = request.get_json()
        course_title = data.get("course_title")
        objectives = data.get("objectives")
        subtopics = data.get("subtopics")
        learning_styles = data.get("learning_styles")
        user_id = data.get("user_id", "default_user")

        if not all([course_title, objectives, subtopics, learning_styles]):
            return jsonify({"error": "Missing required fields"}), 400

        prompt = load_prompt()
        full_prompt = f"""{prompt}

User ID: {user_id}
Course Title: {course_title}

Objectives:
{json.dumps(objectives, indent=2)}

Subtopics:
{json.dumps(subtopics, indent=2)}

Learning Styles Distribution:
{json.dumps(learning_styles, indent=2)}

Return only a detailed JSON lesson plan suitable for STEM instruction based on these inputs.
"""

        # Send to Groq
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "llama3-8b-8192",
                "messages": [{"role": "user", "content": full_prompt}]
            }
        )
        response.raise_for_status()
        ai_reply = response.json()["choices"][0]["message"]["content"]

        # Optional: generate audio from the first visual/audio_visual/text step
        audio_url = None
        try:
            lesson = json.loads(ai_reply)
            for step in lesson:
                if step["type"] in ["text", "video", "audio_visual"]:
                    text = step.get("script") or step.get("content")
                    if text:
                        audio_url = generate_audio(text, filename=f"{user_id}.mp3")
                    break
        except Exception as e:
            print("Audio generation failed:", e)

        return jsonify({"lesson": ai_reply, "audio_url": audio_url})

    except Exception as e:
        return jsonify({"error": "Server error", "details": str(e)}), 500

# Serve audio
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(STATIC_FOLDER, filename)

if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("PORT", 5000)))
