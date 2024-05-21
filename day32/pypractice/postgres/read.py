from con import connect_db

try:
    con = connect_db()
    cur = con.cursor()
    cur.execute("SELECT * from student")
    result = cur.fetchall()
    for row in result:
        print(row)
except Exception as error:
    print(error)
finally:
    cur.close()
    con.close()



