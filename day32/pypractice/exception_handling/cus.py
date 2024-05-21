import sys
def menu():
    try:
        end_program = False
        while(not end_program):
            print("Enter 1 for division \nEnter 2 for exiting the program")
            choice = input("Enter a choice:")
            try:
                match choice:
                    case "1":
                        num1 = int(input("Enter number 1: "))
                        num2 = int(input("Enter number 2: "))
                        result = num1/num2
                    case "2":
                        print("Bye Bye")
                        end_program = True
                    case _:
                        print("Enter correct choice")
            except:
                exc_name = sys.exc_info()[1]
                with open("error.log","a+") as error:
                    error.write(f"\n{exc_name} was occured")
                print("Internal Server Error")



if __name__=="__main__":
    menu()
    
