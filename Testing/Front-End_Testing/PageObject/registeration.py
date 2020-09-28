#coding: utf-8
from Base.base_page import *
from selenium.webdriver.common.by import By
from time import sleep

class RegisterPage(BasePage):

    sign_up_button = (By.ID, "sign-up-btn")
    first_register = (By.CSS_SELECTOR,'[name = "first_name"]')
    last_register = (By.CSS_SELECTOR,'[name = "last_name"]')
    email_register = (By.CSS_SELECTOR,'[class = "sign-up-form"] [name = "email"]')
    password_register = (By.CSS_SELECTOR,'#pwd-input-register')
    ensured_password = (By.CSS_SELECTOR,'[name = "ensuredpassword"]')
    register_button = (By.CSS_SELECTOR, '[value="Register"]')

    def click_sign_up(self):
        self.locate_element(*self.sign_up_button).click()
        
    def register_first(self,text):
        self.locate_element(*self.first_register).send_keys(text)

    def register_last(self,text):
        self.locate_element(*self.last_register).send_keys(text)

    def register_email(self,text):
        self.locate_element(*self.email_register).send_keys(text)

    def register_pwd(self,text):
        self.locate_element(*self.password_register).send_keys(text)

    def ensured_pwd(self,text):
        self.locate_element(*self.ensured_password).send_keys(text)

    def click_register(self):
        self.locate_element(*self.register_button).click()

    def register(self, first, last, email, pwd, es_pwd):
        self.open()
        self.click_sign_up()
        self.register_first(first)
        self.register_last(last)
        self.register_email(email)
        self.register_pwd(pwd)
        self.ensured_pwd(es_pwd)
        sleep(1)
        self.click_register()
        
