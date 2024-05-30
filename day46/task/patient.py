import json
import os
import datetime
import re

def parseJSON(filename):
    with open(filename, "r") as f:
        rawdata = json.loads(f.read())
        entries = rawdata.get("entry", [])
        for entry in entries:
            if entry["resource"]["resourceType"] == "Patient":
                resource = entry["resource"]
                name = resource.get("name", [{}])[0]
                prefix = name.get("prefix", [""])[0]
                firstNameRaw = name.get("given", [""])[0]
                lastNameRaw = name.get("family", "")
                first_name = re.sub(r'[0-9]', '', firstNameRaw)
                last_name = re.sub(r'[0-9]', '', lastNameRaw)
                full_name = f"{prefix} {first_name} {last_name}"
                patient_id = resource.get("id", "")
                telecom = resource.get("telecom", [{}])[0]
                phone_number = telecom.get("value", "")
                gender = resource.get("gender", "")
                DOB = resource.get("birthDate", "")
                age = ""
                if DOB:
                    birth_year = datetime.datetime.strptime(DOB, '%Y-%m-%d').year
                    age = str(datetime.datetime.now().year - birth_year)
                city = resource.get("address", [{}])[0].get("city", "")
                state = resource.get("address", [{}])[0].get("state", "")
                address = f"{city}, {state}"
                extension = resource.get("extension", [])
                marital_code = resource.get("maritalStatus", {}).get("coding", [{}])[0].get("code", "")
                if marital_code == "S":
                    marital_status = "Single"
                elif marital_code == "M":
                    marital_status = "Married"
                else:
                    marital_status = "Unknown"
                
                race = ""
                ethnicity = ""
                for e in extension:
                    if e.get("valueCodeableConcept"):
                        if e["valueCodeableConcept"].get("text") == "race":
                            race = e["valueCodeableConcept"]["coding"][0].get("display", "")
                        elif e["valueCodeableConcept"].get("text") == "ethnicity":
                            ethnicity = e["valueCodeableConcept"]["coding"][0].get("display", "")

                data = [patient_id, full_name, gender, age, phone_number, address, race, ethnicity, marital_status]
                return data



def convertToCSV(data):
    for i,d in enumerate(data):
        if "," in d:
            data[i] = f'"{d}"'
    return ",".join(data)

def main():
    files = os.listdir("healthcare-datasets/")
    output  = ["Patient ID,Name,Gender,Age,Phone Number,Address,Race,Ethnicity,Marital Status"]
    for file in files:
        output.append(convertToCSV(parseJSON(f"healthcare-datasets/{file}")))
    with open("output.csv", "w") as f:
        pass
        f.write("\n".join(output))
        #print("\n".join(output))


if __name__ == "__main__":
    main()
