#coding: utf-8
from selenium import webdriver
from time import sleep

class BasePage(object):

    def __init__(self, driver, url):
        self.driver = driver
        self.driver.implicitly_wait(10)
        self.url = url

    def open(self):
        self.driver.get(self.url)
        self.driver.maximize_window()

    def locate_element(self, *locator):
        element = self.driver.find_element(*locator)
        return element

    #text is title in new page
    def switch_handle(self, text):
        for handle in self.driver.window_handles:
            self.driver.switch_to.window(handle)
            if text in self.driver.title:
                break

    def quit(self):
        sleep(2)
        self.driver.quit()
