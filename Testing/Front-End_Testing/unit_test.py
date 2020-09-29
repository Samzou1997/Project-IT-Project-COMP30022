#coding: utf-8
import unittest

from selenium import webdriver
import HtmlTestRunner
from PageObject.registeration import *
from PageObject.loginPage import *
from PageObject.learningPage import *
from PageObject.workingPage import *
from PageObject.volunteerPage import *
from PageObject.contactPage import *
from PageObject.settingPage import *
from ddt import ddt, data, unpack

@ddt
class UnitTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("/Users/zehongli/Desktop/Project-IT-Project-COMP30022/Testing/chromedriver")

    def tearDown(self):
        self.tmp.quit()

    ############################################## SPRINT 1 ##############################################
    # #login
    # @data(('http://54.206.15.44/', 'zehongl@student.unimelb.edu.au', 'qpzm123456'))
    # @unpack
    # def test_1(self, url, uid, pwd):
    #     self.tmp = LoginPage(self.driver,url)
    #     self.tmp.login(uid, pwd)

    # #logout
    # @data(('http://54.206.15.44/', 'zehongl@student.unimelb.edu.au', 'qpzm123456'))
    # @unpack
    # def test_2(self, url, uid, pwd):
    #     self.tmp = LoginPage(self.driver,url)
    #     self.tmp.logout(uid, pwd)

    # #register
    # @data(('http://54.206.15.44/', 'test1@test.com', 'Normal', 'Normal','Zehong', 'LI'))
    # @unpack
    # def test_3(self, url, uid, pwd, es_pwd, first, last):
    #     self.tmp = RegisterPage(self.driver,url)
    #     self.tmp.register(first, last, uid, pwd, es_pwd)
    #######################################################################################################

    ############################################## SPRINT 2 ###############################################
    #Setting Page Testing
    @data(('http://54.206.15.44/', 'test1@test.com', 'Normal', 'Zehong', 'LI', '13/07/1998','Male', 'IT Project', 'Unimelb', 'Computer science', 'bachelor of science'))
    @unpack
    def test_4(self, url, uid, pwd, firstname, lastname, dob, gen, introduct, campus, mj, dg):
        self.tmp = SettingPage(self.driver,url)
        self.tmp.testing_setting(uid, pwd, firstname, lastname, dob, gen, introduct, campus, mj, dg)

    # Learning Page Testing
    @data(('http://54.206.15.44/personal/working', 'test1@test.com', 'Normal', ' Mary had a little lamb, Little lamb, little lamb, Mary had a little lamb, Its fleece was white as snow, And everywhere that Mary went, Mary went, Mary went, Everywhere that Mary went, The lamb was sure to go'))
    @unpack
    def test_5(self, url, uid, pwd, txt):
        self.tmp = LearningPage(self.driver,url)
        self.tmp.testing_learning(uid, pwd, txt)

    # Working Page Testing
    @data(('http://54.206.15.44/personal/working', 'test1@test.com', 'Normal', ' Lakers Championship Lakers Championship Lakers Championship'))
    @unpack
    def test_6(self, url, uid, pwd, txt):
        self.tmp = WorkingPage(self.driver,url)
        self.tmp.testing_working(uid, pwd, txt)

    # Volunteer Page Testing
    @data(('http://54.206.15.44/personal/working', 'test1@test.com', 'Normal', ' 天青色等烟雨 而我在等你 月色被打捞起 晕开了结局 如传世的青花瓷 自顾自美丽 你眼带笑意'))
    @unpack
    def test_7(self, url, uid, pwd, txt):
        self.tmp = VolunteerPage(self.driver,url)
        self.tmp.testing_volunteer(uid, pwd, txt)

    # Contact Page Testing
    @data(('http://54.206.15.44/personal/contact', 'test1@test.com', 'Normal'))
    @unpack
    def test_8(self, url, uid, pwd):
        self.tmp = ContactPage(self.driver,url)
        self.tmp.testing_contact(uid, pwd)
    ######################################################################################################

if __name__ == '__main__':
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output='/Users/zehongli/Desktop/Project-IT-Project-COMP30022/Testing/Front-End_Testing/Reports'))
