#coding: utf-8
import unittest

from selenium import webdriver
import HtmlTestRunner
from PageObject.login import *
from PageObject.home import *
from ddt import ddt, data, unpack

@ddt
class UnitTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("/Users/apple/Downloads/chromedriver")

    def tearDown(self):
        self.sp.quit()

    #login
    @data(('http://3.131.49.106/', '634273197@qq.com', 'mamad74CAO'),
          ('http://3.131.49.106/', '6@qq.com', 'mamad74CAO'),
          ('http://3.131.49.106/', '634273197@qq.com', 'mamad74'))
    @unpack
    def test_1(self, url, uid, pwd):
        self.sp = LoginPage(self.driver,url)
        self.sp.login(uid, pwd)

    #logout
    @data(('http://3.131.49.106/', '634273197@qq.com', 'mamad74CAO'))
    @unpack
    def test_2(self, url, uid, pwd):
        self.sp = HomePage(self.driver,url)
        self.sp.logout(uid, pwd)

    #register
    @data(('http://3.131.49.106/', '634273197@qq.com', 'mamad74CAO', 'Chang', 'Liu'))
    @unpack
    def test_3(self, url, uid, pwd, first, last):
        self.sp = LoginPage(self.driver,url)
        self.sp.register(first, last, uid, pwd)


if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='/Users/apple/Desktop/2020.2/COMP30022_ITproject/Project-IT-Project-COMP30022/Testing/UnitTest_2/Reports'))
