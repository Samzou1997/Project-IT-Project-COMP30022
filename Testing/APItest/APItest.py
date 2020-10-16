import json
import os
import traceback
from Function.test import *
from Function.summary import *
        
print("API test start...")

#case counting
total_case = []
succeed_case = []
failed_case = []

#find path for test case data
path = os.getcwd()
path = os.path.join(path,"TestData/data.json")

try:
    with open(path,'r',encoding = 'utf-8') as load_f:
        load_dict = json.load(load_f)
        for testcase in load_dict:
            total_case.append(testcase)
            result = test_case(testcase)
            if result:
                succeed_case.append(testcase)
            else:
                failed_case.append(testcase)
except Exception:
    traceback.print_exc()

summary(total_case, succeed_case, failed_case)