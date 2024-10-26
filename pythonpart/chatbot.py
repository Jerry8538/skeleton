
import os
from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
load_dotenv()

memory = ConversationBufferMemory()
stored_conversation = fetch_conversation_from_firebase()
memory = ConversationBufferMemory(buffer=stored_conversation)
llm = OpenAI(temperature=0.7)

system_role = (
    "You are a compassionate and understanding mental health counselor. "
    "Your role is to listen attentively, ask open-ended questions, and provide non-judgmental support. "
    "Encourage reflection and self-expression. Avoid giving direct advice; instead, prompt the user to explore their thoughts and feelings. "
    "For example, ask questions like 'How does that make you feel?' or 'Can you tell me more about that?' or 'What do you think would help you in this situation?' "
)

# Set up the conversation chain to maintain context
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    system_role=system_role
)

def chat_with_bot(userinput):    
        response = conversation.run(userinput)
        return response
        


if __name__ == "__main__":
    chat_with_bot()