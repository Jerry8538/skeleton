from openai import OpenAI
from dotenv import load_dotenv
import re
load_dotenv()
client = OpenAI()
mental_health_categories = [
    "Anxiety",
    "Career worries",
    "Depression",
    "Eating disorder",
    "Health anxiety",
    "Insomnia",
    "Positive outlook",
    "Stress",
    "Extreme mental health emergency"
]

def get_openai_response(prompt):
    response = client.chat.completions.create(
      model = "gpt-4o-mini",
      messages = [
        {
          "role": "system",
          "content": """You are an assistant that gives mental health metrics of a user: You are supposed to do the following stuff: 
          1)Give the specific polarity of the sentiment of the user input. Give the polarity in the form of a number from -100 to 100.(-100 being "I want to kill myself, I hate my life, everyday is miserable" and +100 being "I am sooo happy, I love to be alive, Im not worried at all" and 0 being "I am fine, life is going on") Give it in the format of ||polarity||<polarity(number from -100 to 100)>||polarity|| as output
          2)Give the important phrases which might represent the state of the user according to the input which are important for understanding about the user's mental health metrics. Give the exact specific phrases of the texts in the form of ||concerns|| ["concern1","concern2","concern3","concern4","concern5"....] ||concerns|| as output.
          Note: Pay special attention to the negations in the statement. Analyze the sentiment and mental health implications accordingly.
          example: for the prompt I can't sleep well, I am feeling low, the output should be ||polarity||-65||polarity|| ||concerns||["can't sleep well","feel very low"]||concerns||
          
          """
        },
        {
          "role": "user",
          "content": f"Specifically give the output in the form given by the system, the user input is {prompt}"
        } 
      ]
    )
    return response.choices[0].message.content

def extract_text_enclosed(text):
    polarity_match = re.search(r'\|\|polarity\|\|(.+?)\|\|polarity\|\|', text)
    if polarity_match:
        polarity = polarity_match.group(1).strip()
    else:
        polarity = None

    concerns_matches = re.findall(r'\|\|concerns\|\|(.+?)\|\|concerns\|\|', text)
    concerns =  eval(concerns_matches[0].strip()) if concerns_matches else None
    
    return polarity, concerns



def get_categories(concern):
    response = client.chat.completions.create(
      model = "gpt-4o-mini",
      messages = [
        {
          "role": "system",
          "content": """Based on the given mental health concern, put it into one of the following categories only:
          Note: Pay special attention to negations in the statement. Analyze the sentiment and mental health implications accordingly.
          1. Anxiety
          2. Career worries
          3. Depression
          4. Eating disorder
          5. Health anxiety
          6. Insomnia
          7. Positive outlook
          8. Stress
          9. Extreme mental health emergency
            Choose an exact category exactly one as a number from 1 to 9
            output format: |||category number|||
          """
        },
        {
          "role": "user",
          "content": f"{concern}"
        } 
      ]
    )
    return response.choices[0].message.content

def extract_text_enclosed_for_categories(text):
    # Use regular expression to find all occurrences of text between ||| and |||
    enclosed_texts = re.findall(r'\|\|\|(.*?)\|\|\|', text)
    return enclosed_texts

def get_category_list(concerns):
    categories = []
    if not concerns:
        return None
    for concern in concerns:
        response = get_categories(concern)
        category = extract_text_enclosed_for_categories(response)
        categories.append(mental_health_categories[int(category[0])-1])
    return categories


def extract_intensity(response_text):
    intensity_match = re.search(r'\|\|intensity\|\|\[(.+?)\]\|\|intensity\|\|', response_text)
    if intensity_match:
        intensity_values = intensity_match.group(1).split(',')
        intensity_list = [int(value.strip()) for value in intensity_values]
        return intensity_list
    else:
        return None  
def get_intensity_of_concerns(concernslist, categorylist, inputtext):
    listofcategory_and_concerns = list(zip(categorylist, concernslist)) if categorylist and concernslist else None

    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = [
            {
            "role": "system",
            "content": """
            Note: Pay special attention to negation in the statement. Analyze the sentiment and mental health implications accordingly. Corelate the concerns with the user input and give the intensity of the concerns in the form of a number from 0 to 10. 
            You are an assistant that gives mental health metrics of a user: You should give the intensity of the concerns of the user according to the input which are important for understanding about the user's mental health metrics. Give the intensity of the concerns in the form of a number from 0 to 10.
            example:  Input: [("can’t sleep well","Insomnia"), ("feel very low","Depression"), ("still anxious","Anxiety"), ("feel better","Positive outlook")], Output: ||intensity||[6, 7, 4, 2]||intensity||.
            Give it in the format of ||intensity||[<intensity1(number from 0 to 10)>, <intensity2(number from 0 to 10)>, ....]||intensity|| as output
            """
            },
            {
            "role": "user",
            "content": f"""Give the output in the form given by the system only
            The user input is {inputtext} ,
            the concerns and the category for the given concerns are {listofcategory_and_concerns}
            """
            } 
        ]
    )
    response_text = response.choices[0].message.content
    intensity_list = extract_intensity(response_text)
    return intensity_list


def final_return(prompt):
    response = get_openai_response(prompt)
    polarity, concerns = extract_text_enclosed(response)
    categories = get_category_list(concerns)
    intensitylist = get_intensity_of_concerns(concerns, categories, prompt)
    return [str(polarity), str(concerns), str(categories), str(intensitylist)]


if(__name__ == "__main__"):
    prompt = "I am feeling very low, I am not able to sleep well, I am feeling very anxious, I am very happy, I am stressed about my career"
    response = get_openai_response(prompt)
    polarity, concerns = extract_text_enclosed(response)
    print(polarity)
    print(concerns)
    categories = get_category_list(concerns)
    print(categories)
    intensitylist = get_intensity_of_concerns(concerns, categories, prompt)
    print(intensitylist)