#1. Write a Python program to handle a ZeroDivisionError exception when dividing a number by zero.

num1 = input("Enter first number")
num2 = input("Enter second number")

try:
    result = num1/num2
    print(f"Your answer is {result}")
except ZeroDivisionError:
    print("Oops you cannot divide by zero")
finally:
    print("Exiting Program")


