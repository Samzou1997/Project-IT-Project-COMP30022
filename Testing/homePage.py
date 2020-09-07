class HomePage():

    def __init__(self, driver):
        self.driver = driver
        self.logout_link_linkText = "logout"

    def click_logout(self):
        self.driver.find_element_by_class_name(self.logout_link_linkText).click()