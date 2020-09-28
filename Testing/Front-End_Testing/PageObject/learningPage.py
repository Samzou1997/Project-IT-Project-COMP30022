#coding: utf-8
from Base.base_page import *
from PageObject.Indirection import *
from selenium.webdriver.common.by import By


class LearningPage(BasePage):

    learning_class = (By.CSS_SELECTOR, '[href = "/personal/learning"]')
    edit_btn = (By.ID, "writebtn")
    edit_area = (By.CSS_SELECTOR, '[role="textbox"]')

    def click_learning(self):
        self.locate_element(*self.learning_class).click()

    def click_edit(self):
        self.locate_element(*self.edit_btn).click()
    
    def type(self, text):
        self.locate_element(*self.edit_area).send_keys(text)
    
    def testing_learning(self, uid, pwd, txt):
        self.open()
        self.tmp = LoginPage(self.driver, 'http://54.206.15.44/personal/learning')
        self.tmp.login(uid, pwd)
        sleep(1)
        self.click_learning()

        sleep(2)
        self.click_edit()

        sleep(1)
        self.type(txt)

        sleep(2)
        self.tmp.logout()
        

    



