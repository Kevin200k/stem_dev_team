import requests

GROQ_API_KEY = "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"

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "model": "llama3-8b-8192",
    "messages": [
        {"role": "user", "content": "Hello!"}
    ]
}

res = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data)

print(res.status_code)
print(res.json())
