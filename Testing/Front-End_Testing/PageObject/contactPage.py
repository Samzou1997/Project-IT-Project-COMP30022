#coding: utf-8
from Base.base_page import *
from PageObject.Indirection import *
from selenium.webdriver.common.by import By


class ContactPage(BasePage):

    contact_class = (By.CSS_SELECTOR, '[href = "/personal/contact"]')

    def click_contact(self):
        self.locate_element(*self.contact_class).click()
    
    def testing_contact(self, uid, pwd):
        self.open()
        self.tmp = LoginPage(self.driver, 'http://54.206.15.44/personal/contact')
        self.tmp.login(uid, pwd)

        sleep(2)
        self.click_contact()

        sleep(2)
        self.tmp.logout()