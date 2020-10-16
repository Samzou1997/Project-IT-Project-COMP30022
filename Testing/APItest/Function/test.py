import requests
import json
from Base.ResponseVerify import *

def test_case(testcase):

    print("--------------------")
    print("Test",testcase["index"], "start...")
    print(testcase["information"])

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
        result = "failed."
        return False
    
    
    result = responseVerify(res, testcase["expect_response"])

    #print("response status code:",res.status_code)
    #print("response headers",type(res.headers))
    print("Result:", result + ".")
    if (result == "succeed"):
        return True
    elif (result == "failed"):
        return False
    else:
        print("Error: Response verify error.")
        return False