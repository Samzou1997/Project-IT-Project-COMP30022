from selenium import webdriver
import unittest
from selenium.webdriver.common.keys import Keys
import time
import HtmlTestRunner
from loginPage import LoginPage
from homePage import HomePage


class UpRank(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        PATH = '/Users/zehongli/Documents/GitHub/Project-IT-Project-COMP30022/Testing/chromedriver'
        cls.driver = webdriver.Chrome(PATH)
        cls.driver.fullscreen_window()
        cls.driver.implicitly_wait(10)

    def test_login_automation(self):
        driver = self.driver
        driver.get('http://3.131.49.106/')

        login = LoginPage(driver)
        login.enter_username("873651425@qq.com")
        login.enter_password('qpzm123456\n')

        homepage = HomePage(driver)
        homepage.click_logout()
        # Testing valid email && valid password
        #self.driver.find_element_by_name("email").send_keys('873651425@qq.com')
        #self.driver.find_element_by_id("pwd-input-login").send_keys('qpzm123456\n')
        #self.driver.find_element_by_link_text("Logout").click()

    @classmethod 
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("Test completed!")

if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='/Users/zehongli/Desktop/Testing/reports'))
