from con import connect_db

try:
    name = input("Enter your Name: ")
    address = input("Enter your Address: ")
    con = connect_db()
    cur = con.cursor()
    cur.execute("INSERT into student(name,address) VALUES (%s,%s)",(name,address))
    con.commit()
except Exception as error:
    print("Error agaya")
    print(error)
finally:
    cur.close()
    con.close()

