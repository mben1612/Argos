import banana_dev as banana
import sys

def getrespose(text,leng):
    api_key="ae88ee36-779a-4dac-858a-381e16e23e24"
    model_key="gptj"
    model_inputs = { "text": text, "length": leng, "temperature": 0.9, "topK": 50, "topP": 0.9}
    out = banana.run(api_key, model_key, model_inputs)
    # print(out)
    return out["modelOutputs"][0]["output"]
    # return text

str = sys.argv[1]
length = int(sys.argv[2])
#print(int(sys.argv[2]))
if(str != ""):
    print(getrespose(str,length))
else:
     print(getrespose("My name is Ben. What is your name?",100))

# print(getrespose("My name is Ben. What is your name?"))
