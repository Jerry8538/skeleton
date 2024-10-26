from openai import OpenAI
from dotenv import load_dotenv
import re
load_dotenv()
client = OpenAI()

def get_openai_response(prompt):
    response = client.chat.completions.create(
      model = "gpt-4o-mini",
      messages = [
        {
          "role": "system",
          "content": "You are an assistant that gives the specific stuffs that the user wants to learn in the form of |||<thing the user wants to learn||| as output"
        },
        {
          "role": "user",
          "content": f"Specifically give the output in the form of |||item the user wants to learn |||, the prompt is {prompt}"
        } 
        
      ]
    )
    return response.choices[0].message.content

def extract_text_enclosed(text):
    # Use regular expression to find all occurrences of text between ||| and |||
    enclosed_texts = re.findall(r'\|\|\|(.*?)\|\|\|', text)
    return enclosed_texts

if __name__ == "__main__" :
    print(extract_text_enclosed( get_openai_response("I want to learn c programming and cooking and tennis")) )
