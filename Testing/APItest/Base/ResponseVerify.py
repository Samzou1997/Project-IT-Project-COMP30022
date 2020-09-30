def responseVerify(res, expected):
    print(res.status_code)
    print(expected["status_code"])
    if (str(res.status_code) == expected["status_code"]):
        return "succeed"
    else:
        return "failed"
