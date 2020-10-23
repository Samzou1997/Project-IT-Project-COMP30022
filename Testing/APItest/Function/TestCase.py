from Base.ResponseVerify import *
from Base.SendRequest import *

def test_case(testcase):

    print("--------------------")
    print("Test",testcase["index"], "start...")
    print(testcase["information"])

    res = SendRequest(testcase)
    
    result = responseVerify(res, testcase["expect_response"])

    print("Result:", result + ".")
    if (result == "succeed"):
        return True
    elif (result == "failed"):
        return False
    else:
        print("Error: Response verify error.")
        return False