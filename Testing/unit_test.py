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

    @data(('http://3.131.49.106/', '634273197@qq.com', 'mamad74CAO'),
          ('http://3.131.49.106/', '634273197@qq.com', 'mamad74CAO'))
    @unpack
    def test_1(self, url, uid, pwd):
        self.sp = LoginPage(self.driver,url)
        self.sp.login(uid, pwd)

if __name__ == '__main__':
    unittest.main()
