import os



def convert_txt_to_csv(i,txtfile):
    with open(txtfile,"r+") as t:
        txt_content = "".join(t.readlines())
        csv_content = txt_content.replace("|",",")
        t.seek(0)
        t.write(csv_content)
    new_file_name = f"csv_file_{i}.csv"
    location = "/".join([txtfile.split("/")[0],txtfile.split("/")[1],new_file_name])
    print(location)
    os.rename(txtfile,location)
    
main_folder = input("Enter the main folder: ")

subfolders = os.listdir(main_folder)

for subf in subfolders:
    txt_files = os.listdir(f"{main_folder}/{subf}")
    full_paths = [f"{main_folder}/{subf}/{f}" for f in txt_files]
    for i,f in enumerate(full_paths):
        convert_txt_to_csv(i,f)


