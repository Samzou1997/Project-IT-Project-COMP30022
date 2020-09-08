#coding: utf-8
import unittest

from selenium import webdriver
from PageObject.login import *
from ddt import ddt, data, unpack

@ddt
class UnitTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("/Users/apple/Downloads/chromedriver")

    def tearDown(self):
        self.sp.quit()

    #account: valid, password: valid
    @data(('http://3.131.49.106/', '634273197@qq.com', 'mamad74CAO'))
    @unpack
    def test_1_2(self, url, uid, pwd):
        self.sp = LoginPage(self.driver,url)
        self.sp.login(uid, pwd)

    #account: invalid, password: valid
    @data(('http://3.131.49.106/', '6@qq.com', 'mamad74CAO'))
    @unpack
    def test_1_3(self, url, uid, pwd):
        self.sp = LoginPage(self.driver,url)
        self.sp.login(uid, pwd)

    

if __name__ == '__main__':
    unittest.main()
