# prompts/generate_prompt.py
def build_prompt(course_name, subtopic_name, learning_style, age_group):
    return f"""
You are an AI teacher creating a full, personalized, and engaging course lesson for a smart educational platform designed for children aged 11–12.

You must follow a **very specific 10-step lesson structure** to help children understand the topic effectively, based on their unique learning style. Most AIs don’t know this structure — so read and follow everything carefully.

---

🎯 **Parameters**
- Topic: [INSERT TOPIC HERE]
- Age Group: 11–12
- Learning Style Ratios:
  - Visual: [X]%
  - Auditory: [X]%
  - Reading/Writing: [X]%
  - Kinesthetic: [X]%

Use the **most dominant learning style(s)** to decide the **single best format** for each step — only one format per step. Examples:
- Visual → use videos, animations, or illustrations.
- Auditory → use audio narrations, music, or rhythm.
- Reading → use clean text explanations.
- Kinesthetic → use simulations, sliders, drag & drop, or other interactive code.

---

🧱 **STRUCTURE OF THE LESSON** (IMPORTANT!)

Every lesson must have exactly **10 parts**, each with a specific goal. They must be in this exact order. Here's what you must do in each step:

1. **Introduction (Hook)**  
   Start with a fun, surprising, or funny moment that gets the learner's attention.  
   Use animations or funny dialogue. This helps kids get curious.

2. **Purpose (What They’ll Learn)**  
   Clearly tell the learner what they’re going to learn today and why it matters.  
   Keep it exciting and kid-friendly.

3. **Concept Introduction (Main Idea)**  
   Explain the topic in a simple way using examples kids relate to (e.g. skateboards, pets, games).

4. **Memory Aid (Catchy Help)**  
   Give them something to help them remember the idea — a rhyme, jingle, acronym, or trick.

5. **Visual Demonstration**  
   Show what the concept looks like in motion or a visual story. Use videos or animations if visual is dominant.

6. **Interactive Experiment**  
   Let them try it! Add a small simulation or activity (e.g. change a slider, click to move something).  
   Must include working HTML+JavaScript code and a short explanation of what it does.

7. **Summary Recap**  
   Repeat the core idea using bold keywords and fun voice to reinforce learning.

8. **Quick Quiz**  
   Ask at least **2 multiple choice questions** to check understanding.  
   Each question must have:
   - `question`
   - `options` (array of 3–4)
   - `correct_answer` (index)
   - `explanation`

9. **Real-Life Use**  
   Show how this idea connects to something in their real life (e.g. riding a bike, cooking, using a stopwatch, building with blocks).

10. **AI Feedback & Adaptation**  
   Tell the learner how the AI will adapt based on how well they did — encourage them to keep learning whether they got it right or not.

---

💡 **RULES:**
- Use only **one `type`** per step: `"text"`, `"video"`, `"audio"`, `"interaction"`, or `"quiz"`.
- Don’t mix content types per step.
- Use a friendly tone and emojis 😊
- Make all language understandable for age 11–12.
- If `"interaction"`, you must provide:
  - `"working_code"`: Valid HTML/JS code
  - `"explain"`: What the simulation does
- If `"quiz"`, you must provide at least 2 questions, `correct_answer` index, and a short `explanation`.

---

📦 **OUTPUT FORMAT:**

Return only the final JSON array of 10 objects like this:

```json
[
  {
    "type": "video",
    "step_number": 1,
    "lesson_purpose": "Grab attention with a funny or surprising hook.",
    "scene_description": "Doodle pops out of a backpack and throws numbers in the air!",
    "script": "Whoa! What just happened?! Numbers everywhere! Let’s sort this out together in today’s lesson!"
  },
  {
    "type": "text",
    "step_number": 2,
    "lesson_purpose": "Tell learners what they’ll learn and why it matters.",
    "content": "We’re about to learn all about **fractions**! 🍕 That’s how we divide things fairly — like pizza or candy bars!"
  },
  {
    "type": "audio",
    "step_number": 4,
    "lesson_purpose": "Use a song to help remember.",
    "script": "🎵 A half and a half makes a whole, put them together, now you’re on a roll! 🎵"
  },
  {
    "type": "interaction",
    "step_number": 6,
    "lesson_purpose": "Try dividing shapes into parts.",
    "title": "Slice the Circle!",
    "description": "Click to divide the circle into equal parts.",
    "working_code": "<html><body>...</body></html>",
    "explain": "This shows how we can divide a whole into equal parts — that’s what a fraction is!"
  },
  {
    "type": "quiz",
    "step_number": 8,
    "lesson_purpose": "Check understanding.",
    "questions": [
      {
        "question": "What is 1/2 of a pizza?",
        "options": ["One pizza", "Half of the pizza", "Two pizzas"],
        "correct_answer": 1,
        "explanation": "1/2 means one part out of two equal parts!"
      },
      {
        "question": "What’s another name for 2/4?",
        "options": ["One half", "Two", "Four halves"],
        "correct_answer": 0,
        "explanation": "2/4 is the same as 1/2 when simplified."
      }
    ]
  },
  ...
]

Topic: {course_name} – {subtopic_name}
Learning Style: {learning_style}
Return content as JSON with only one segment per step.
    """.strip()
