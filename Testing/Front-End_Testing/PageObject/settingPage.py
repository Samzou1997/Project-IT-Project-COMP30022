#coding: utf-8
from Base.base_page import *
from PageObject.loginPage import *
from selenium.webdriver.common.by import By


class SettingPage(BasePage):

    setting_class = (By.CSS_SELECTOR, '[class = "image-container"]')
    update_btn = (By.CSS_SELECTOR, '[type = "submit"]')

    # personal input
    personal = (By.CSS_SELECTOR, '[onclick = "tabs(0)"]')
    first_name = (By.CSS_SELECTOR, '[name = "firstname"]')
    last_name = (By.CSS_SELECTOR, '[name = "lastname"]')
    date_of_birth = (By.CSS_SELECTOR, '[name = "dateofbirth"]')
    gender = (By.CSS_SELECTOR, '[name = "gender"]')
    introduction = (By.CSS_SELECTOR, '[name = "intro"]')
    logout_class = (By.CSS_SELECTOR, "[class = 'logout']")

    # education input
    education = (By.CSS_SELECTOR, '[onclick = "tabs(1)"]')
    school = (By.CSS_SELECTOR, '[name="graduatedschool"]')
    major = (By.CSS_SELECTOR, '[name="major"]')
    degree = (By.CSS_SELECTOR, '[name="degree"]')

    def click_setting(self):
        self.locate_element(*self.setting_class).click()

    # personal input
    def click_personal(self):
        self.locate_element(*self.personal).click()

    def input_first_name(self,text):
        self.locate_element(*self.first_name).send_keys(text)

    def input_last_name(self,text):
        self.locate_element(*self.last_name).send_keys(text)

    def input_date_of_birth(self,text):
        self.locate_element(*self.date_of_birth).send_keys(text)

    def input_gender(self,text):
        self.locate_element(*self.gender).send_keys(text)

    def input_introduction(self,text):
        self.locate_element(*self.introduction).send_keys(text)

    # education info
    def click_education(self):
        self.locate_element(*self.education).click()
    
    def input_school(self,text):
        self.locate_element(*self.school).send_keys(text)

    def input_major(self,text):
        self.locate_element(*self.major).send_keys(text)
    
    def input_degree(self,text):
        self.locate_element(*self.degree).send_keys(text)



    def input_update(self):
        self.locate_element(*self.update_btn).click()
    
    def click_logout(self):
        self.locate_element(*self.logout_class).click()

    def testing_setting(self, uid, pwd, firstname, lastname, dob, gen, introduct, campus, mj, dg):
        self.open()
        self.tmp = LoginPage(self.driver, 'http://54.206.15.44/')
        self.tmp.login(uid, pwd)

        sleep(2)
        self.click_setting()

        self.click_personal()
        self.input_first_name(firstname)
        self.input_last_name(lastname)
        self.input_date_of_birth(dob)
        self.input_gender(gen)
        self.input_introduction(introduct)
        

        self.click_education()
        self.input_school(campus)
        self.input_major(mj)
        self.input_degree(dg)

        self.click_personal()
        self.input_update()

        sleep(3)
        self.click_logout()