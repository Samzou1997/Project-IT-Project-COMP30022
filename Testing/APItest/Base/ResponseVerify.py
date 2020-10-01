def responseVerify(res, expected):
    if (str(res.status_code) == expected["status_code"]):
        return "succeed"
    else:
        print("Error:", res.status_code)
        return "failed"
