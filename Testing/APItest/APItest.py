import json
import os
import traceback
from TestCase.test import *
        
print("API test start...")

#find path for test case data
path = os.getcwd()
path = os.path.join(path,"TestData/data.json")

#case counting
total_case = 0
succeed_case = 0
failed_case = 0

try:
    with open(path,'r',encoding = 'utf-8') as load_f:
        load_dict = json.load(load_f)
        for testcase in load_dict:
            total_case += 1
            result = test_case(testcase)
            if result:
                succeed_case += 1
            else:
                failed_case += 1
except Exception:
    traceback.print_exc()

print("--------------------")
print("Total test case:", total_case)
print("Succeed test case:", succeed_case)
print("Failed test case:", failed_case)