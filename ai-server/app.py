import os, requests, json, re
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
PROMPT_PATH = os.path.join("prompts", "base_prompt.txt")

def load_prompt():
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()

def extract_json_from_response(text: str):
    text = re.sub(r"```(?:json)?", "", text)
    start = text.find("[")
    end = text.rfind("]") + 1
    return json.loads(text[start:end])

@app.route("/api/generate-lesson", methods=["POST"])
def generate_lesson():
    data = request.get_json()
    required = ["course_title", "objectives", "subtopics", "learning_styles", "age_group"]
    missing = [key for key in required if not data.get(key)]
    if missing:
        return jsonify({"error": "Missing fields", "fields": missing}), 400

    full_prompt = load_prompt() + "\n\n" + json.dumps({
        "user_id": data.get("user_id", "anon"),
        "age_group": data["age_group"],
        "course_title": data["course_title"],
        "objectives": data["objectives"],
        "subtopics": data["subtopics"],
        "learning_styles": data["learning_styles"]
    }, indent=2) + "\n\nReturn JSON array only."

    try:
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
        content = response.json()["choices"][0]["message"]["content"]
        lesson = extract_json_from_response(content)
        return jsonify({"lesson": lesson})
    except Exception as e:
        return jsonify({"error": "AI request failed", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5001)))
