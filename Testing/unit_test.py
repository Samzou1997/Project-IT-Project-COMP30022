from selenium import webdriver
import time

driver = webdriver.Chrome('/Users/zehongli/Documents/GitHub/Project-IT-Project-COMP30022/Testing/chromedriver')
driver.fullscreen_window()
driver.get('http://3.131.49.106/')

# Testing valid email && valid password
driver.find_element_by_id("uid-input-login").send_keys('873651425@qq.com')
driver.find_element_by_id("pwd-input-login").send_keys('qpzm123456\n')


time.sleep(5)

driver.quit()