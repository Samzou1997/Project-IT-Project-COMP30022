#coding: utf-8
from Base.base_page import *
from PageObject.Indirection import *
from selenium.webdriver.common.by import By


class WorkingPage(BasePage):

    working_class = (By.CSS_SELECTOR, '[href = "/personal/working"]')
    edit_btn = (By.ID, "writebtn")
    edit_area = (By.CSS_SELECTOR, '[role="textbox"]')
    submit_btn = (By.ID, "submitbtn")

    def click_working(self):
        self.locate_element(*self.working_class).click()
    
    def click_edit(self):
        self.locate_element(*self.edit_btn).click()
    
    def type(self, text):
        self.locate_element(*self.edit_area).send_keys(text)

    def submit(self):
        self.locate_element(*self.submit_btn).click()
    
    def testing_working(self, uid, pwd, txt):
        self.open()
        self.tmp = LoginPage(self.driver, 'http://54.206.15.44/personal/working')
        self.tmp.login(uid, pwd)

        sleep(1)
        self.click_working()

        sleep(2)
        self.click_edit()

        sleep(1)
        self.type(txt)

        sleep(2)
        self.submit()

        sleep(3)
        self.tmp.logout()