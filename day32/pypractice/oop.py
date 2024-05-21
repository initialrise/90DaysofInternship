class Animal:
    def __init__(self,name=""):
        self.name = name

    def __donttouchme(self):
        print("you can't")

    def eat(self):
        print("Animal is eating")
    
    _no="YEs"
    yes="You can"



a1 = Animal()
a1.__donttouchme()
a1.eat()

    

