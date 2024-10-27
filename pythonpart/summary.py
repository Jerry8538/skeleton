from openai import OpenAI
from dotenv import load_dotenv
import re
load_dotenv()
client = OpenAI()

def get_total_summary(data):
    response = client.chat.completions.create(
      model = "gpt-4o-mini",
      messages = [
        {
          "role": "system",
          "content": """
                You are an assistant to a human and should give output in a easy to read manner.
                Based on intensities and concerns, create a summary of the mental health state with patient over time.
                Include if the user's mental health is improving, deteriorating, or staying the same overtime.
                Include how the user's mental health is changing over time. how the mental health concerns in the form of the category of concern and intensity of concern are changing over time.
          Give the user suggestions also on how to improve their mental health specifically based on the given data.
          IT IS MOST IMPORTANT FOR YOU TO WRITE YOUR SUMMARY IN A READBLE,CONSISE MANNER FOR ANY PERSON.
          """
        },
        {
          "role": "user",
          "content": f"""the {data} is in the form of a list of descriptions of the user's mental health
          create a summary that describes the user's mental health state over time. The inputs in the list are sequential with the oldest one being the oldest day and the newest one being the newest day.
          """
        } 
      ], 
    )
    
    return response.choices[0].message.content


def get_conversation_summary(conversations):
    response = client.chat.completions.create(
      model = "gpt-4o-mini",
      messages = [{
            "role": "system",
            "content": """
            You are an assistant to a human and should give output in a easy to read manner.
            You are a mental health analysing assistant
                    Based on the data of previous conversations provided, create a summary of the mental health state and the sentiment of the user, the given data is sequential. Use the conversations to get the summary and tell how the user's sentiment changes overtime.
                    Give the user suggestions also on how to improve their mental health specifically based on the given data.
                    IT IS MOST IMPORTANT FOR YOU TO WRITE YOUR SUMMARY IN A READBLE,CONSISE MANNER FOR ANY PERSON.
                    """
        },  # Added missing comma here
        {
            "role": "user",
            "content": f""" the given data is {conversations} """
        } 
      ] 
    )
    
    return response.choices[0].message.content

def parse_category_summary(summary):
    category_summary = re.search(r'\|\|category\|\|\[(.+?)\]\|\|category\|\|', summary)
    if category_summary:
        category_summary = category_summary.group(1).split(',')
        return category_summary
    else:
        return None
    
def get_category_summary(categories):
        response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = [
            {
            "role": "system",
            "content": f"""
                    You are a mental health and sentiment based analysis system.
                    Based on intensities and concerns of a particular conversation with a mental health patient,
                    You are given 9 categories of mental health concerns, the concerns and the intensity of the concern.
                    create a summary of the mental health state with respect to the particular category.
                    Include if the user's mental health is improving, deteriorating, or staying the same overtime with respect to the category for each category
                    give the output in the format of ||category||[<category1summary>, <category2summary>, ....]||category|| as output, if category is not having a summary, return an empty string in that place
                    Give the user suggestions also on how to improve their mental health specifically based on the given data.            
            """
            },
            {
            "role": "user",
            "content": f"""the categories are in the form of a json format with phrase describing concern and the intensity of concern(value from 0-10)
            input is : {categories}
            """
            } 
        ], 
        )
        return parse_category_summary(response.choices[0].message.content)
    

def get_total_category_summary(summarylist, category):
    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = [
            {
            "role": "system",
            "content": f"""
                    You are a mental health and sentiment based analysis system.
                    You are given input in the form of a list of descriptions of ai therapy chats which correspond to the given category and are sequential in manner.
                    create a total summary of the mental health state with respect to the particular category for the whole time and describe how it changes overtime.
                    Include if the user's mental health is improving, deteriorating, or staying the same overtime with respect to the category for each category
            Give the user suggestions also on how to improve their mental health specifically based on the given data.
            """
            },
            {
            "role": "user",
            "content": f"""the categories and summaries are in the form of a json format . 
            The particular category is {category},
            summaries input is : {summarylist}
            """
            } 
        ], 
        )
    return parse_category_summary(response.choices[0].message.content)



if __name__ == "__main__":  # Fixed syntax
    concerns = ["can’t sleep well", "feel very low", "still anxious", "feel better"]
    summary = get_total_summary(concerns)
    print(summary)