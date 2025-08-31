import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_task(task_text: str):
    
    prompt = f"""
    Extract a structured todo item from the following text:
    "{task_text}"

    Return valid JSON with these keys:
    {{
      "title": "string",
      "description": "string",
      "completed": true/false
    }}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    return response.choices[0].message.content
