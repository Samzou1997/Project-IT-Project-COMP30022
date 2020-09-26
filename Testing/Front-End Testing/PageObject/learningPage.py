#coding: utf-8
from Base.base_page import *
from PageObject.loginPage import *
from selenium.webdriver.common.by import By


class LearningPage(BasePage):

    learning_class = (By.CSS_SELECTOR, '[href = "/personal/learning"]')


    def click_learning(self):
        self.locate_element(*self.learning_class).click()
    
    def display_learning(self, uid, pwd):
        self.open()
        self.sp = LoginPage(self.driver, 'http://54.206.15.44/')
        self.sp.login(uid, pwd)
        self.click_learning()



