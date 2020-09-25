#coding: utf-8
import unittest

from selenium import webdriver
import HtmlTestRunner
from PageObject.registeration import *
from PageObject.loginPage import *
from PageObject.learningPage import *
from ddt import ddt, data, unpack

@ddt
class UnitTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("/Users/zehongli/Desktop/Project-IT-Project-COMP30022/Testing/chromedriver")

    def tearDown(self):
        self.sp.quit()

    ############################################## SPRINT 1 ##############################################
    # #login
    # @data(('http://54.206.15.44/', 'zehongl@student.unimelb.edu.au', 'qpzm123456'))
    # @unpack
    # def test_1(self, url, uid, pwd):
    #     self.sp = LoginPage(self.driver,url)
    #     self.sp.login(uid, pwd)

    # #logout
    # @data(('http://54.206.15.44/', 'zehongl@student.unimelb.edu.au', 'qpzm123456'))
    # @unpack
    # def test_2(self, url, uid, pwd):
    #     self.sp = LoginPage(self.driver,url)
    #     self.sp.logout(uid, pwd)

    # #register
    # @data(('http://54.206.15.44/', 'test1@test.com', 'Normal', 'Normal','Zehong', 'LI'))
    # @unpack
    # def test_3(self, url, uid, pwd, es_pwd, first, last):
    #     self.sp = RegisterPage(self.driver,url)
    #     self.sp.register(first, last, uid, pwd, es_pwd)
    #######################################################################################################

    ############################################## SPRINT 2 ###############################################
    @data(('http://54.206.15.44/personal/learning', 'test1@test.com', 'Normal'))
    @unpack
    def test_4(self, url, uid, pwd):
        self.sp = LearningPage(self.driver,url)
        self.sp.display_learning(uid, pwd)
    

if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='/Users/zehongli/Desktop/Project-IT-Project-COMP30022/Testing/Front-End Testing/Reports'))
