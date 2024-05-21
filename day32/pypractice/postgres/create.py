from con import connect_db

try:
    con = connect_db()
    cur = con.cursor()
    query = "CREATE TABLE student (id serial PRIMARY KEY, name varchar, address varchar)"
    cur.execute(query)
    cur.execute("INSERT into student VALUES(1,'Rabindra','Ktm')")
    con.commit()
    cur.close()
    con.close()
except Exception as error:
    print(f"Something went wrong {error}")



