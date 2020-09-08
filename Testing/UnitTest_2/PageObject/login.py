#coding: utf-8
from Base.base_page import *
from selenium.webdriver.common.by import By

class LoginPage(BasePage):

    email_id = (By.ID, "uid-input-login")
    password_id = (By.ID, "pwd-input-login")
    submit_class = (By.CSS_SELECTOR, '[value="Login"]')

    def input_email(self,text):
        self.locate_element(*self.email_id).send_keys(text)

    def input_password(self,text):
        self.locate_element(*self.password_id).send_keys(text)

    def click_submit(self):
        self.locate_element(*self.submit_class).click()

    def login(self, uid, pwd):
        self.open()
        self.input_email(uid)
        self.input_password(pwd)
        self.click_submit()
        self.quit()
