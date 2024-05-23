import random
import os
import string
from faker import Faker
from tqdm import tqdm

fake = Faker()
NUM_OF_SUBFOLDERS=5

def handle_commas_in_data(value):
    if "," in value:
        value = f'"{value}"'
    return value

def randomstring():
    return ''.join(random.choices(string.ascii_lowercase, k=5))

def gen_random_data():
    output = "Name|Address|Job|Company\n"
    for _ in range(20):
        fake_name = handle_commas_in_data(fake.name())
        fake_ssn = handle_commas_in_data(fake.ssn())
        fake_job = handle_commas_in_data(fake.job())
        fake_company = handle_commas_in_data(fake.company())
        # fake_details = [fake.name(),fake.address(),fake.job(),fake.company()]
        fake_details = [fake_name,fake_ssn,fake_job,fake_company]
        output += "|".join(fake_details) + "\n"
    return output


def main():
    main_folder = input("Enter folder name:")
    os.mkdir(main_folder)
    os.chdir(main_folder)
    for _ in range(NUM_OF_SUBFOLDERS):
        folder_name = randomstring()
        os.mkdir(folder_name)
        num_of_files = random.randint(3,7)
        for _ in tqdm(range(num_of_files)):
            filename = randomstring()+".txt"
            #print(f"{filename} created in {folder_name}")
            with open(f"{folder_name}/{filename}","w+") as f:
                f.write(gen_random_data())
            



if __name__ == "__main__":
    main()