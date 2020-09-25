import requests
import json
import os

def test_get(url, data, headers):   
    data = json.dumps(data)

    #send request
    res = requests.get(url = url,params = data, headers = headers)
    print("--------------------")
    print("response status code:",res.status_code)
    print("response headers",res.headers)

def test_post(url, data, headers):
    data = json.dumps(data)

    #send request
    res = requests.post(url = url, data = data, headers = headers)

    print("--------------------")
    print("response status code:",res.status_code)
    print("response headers",res.headers)
        
#test()
path = os.getcwd()
path = os.path.join(path,"data.json")
with open(path,'r') as load_f:
    load_dict = json.load(load_f)
    #print(load_dict[0])
    #print(type(load_dict))
    for testcase in load_dict:
        if (testcase["request_method"] == "post"):
            test_post(testcase["url"], testcase["data"], testcase["headers"])
        if (testcase["request_method"] == "get"):
            test_get(testcase["url"], testcase["data"], testcase["headers"])
