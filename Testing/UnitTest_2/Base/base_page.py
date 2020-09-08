#coding: utf-8
from selenium import webdriver
from time import sleep

class BasePage(object):

    def __init__(self, driver, url):
        self.driver = driver
        self.url = url

    def open(self):
        self.driver.get(self.url)
        self.driver.maximize_window()

    def locate_element(self, *locator):
        element = self.driver.find_element(*locator)
        return element

    def quit(self):
        sleep(2)
        self.driver.quit()
