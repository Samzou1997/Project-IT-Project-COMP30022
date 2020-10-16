import os
import traceback

def summary(total_case, succeed_case, failed_case):
    print("--------------------")
    print("Total test case:", len(total_case))
    print("Succeed test case:", len(succeed_case))
    print("Failed test case:", len(failed_case))
    print("--------------------")

    path = os.getcwd()
    path = os.path.join(path,"Report/report.txt")

    try:
        with open(path,'w',encoding = 'utf-8') as f:
            f.write("Total test case: " + str(len(total_case)) + "\n")
            f.write("Succeed test case: " + str(len(succeed_case)) + "\n")
            f.write("Failed test case: " + str(len(failed_case)) + "\n")
            if len(failed_case) > 0:
                f.write("Failed case (index): ")
                for case in failed_case:
                    f.write(case["index"] + " ")
    except Exception:
        traceback.print_exc()
