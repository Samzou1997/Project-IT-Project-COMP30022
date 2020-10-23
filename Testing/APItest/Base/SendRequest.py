import requests
import json

def SendRequest(testcase):
    #read data, find request
    test_req = testcase["request"]
    method = test_req["request_method"]
    url = test_req["url"]   
    data = json.dumps(test_req["data"])
    headers = test_req["headers"]

    #send request
    if (method == "post"):
        res = requests.post(url = url, data = data, headers = headers)
    elif (method == "get"):
        res = requests.get(url = url,params = data, headers = headers)
    else:
        print("Error: Test", testcase["index"], "request_method error.")
        return False

    return res