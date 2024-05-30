import json

filename="test2.json"
with open(filename,"r") as f:
    rawdata = json.loads("".join(f.readlines()))
    entries = rawdata["entry"]
    for entry in entries:
        if entry["resource"]["resourceType"] == "Patient":
            resource = entry["resource"]
            prefix = resource["name"][0]["prefix"][0]
            first_name = resource["name"][0]["given"][0]
            last_name = resource["name"][0]["family"]
            full_name = f"{prefix} {first_name} {last_name}"
            patient_id = resource["id"]
            phone_number = resource["telecom"][0]["value"]
            gender = resource["gender"]
            DOB = resource["birthDate"]
            address = resource["address"][0]["city"]
            extension = resource["extension"]
            marital = resource["maritalStatus"]["coding"][0]["code"]
            for e in extension:
                if e.get("valueCodeableConcept"):
                    if e["valueCodeableConcept"]["text"] == "race":
                        race = e["valueCodeableConcept"]["coding"][0]["display"]
                    elif e["valueCodeableConcept"]["text"] == "ethnicity":
                        ethnicity = e["valueCodeableConcept"]["coding"][0]["display"]

            print("""
Patient ID,Name,Gender,Age,Phone Number,Address,Race,Ethnicity,Marital Status
80bb41d3-ebb4-42e6-b087-6ee89b0463a9,Mrs. Zachary Willms,female,65 years,493.648.2471 x26272,"Loop Shrewsbury, MA",White,Nonhispanic,married

                  """)
            print(patient_id,full_name,gender,phone_number,address,race,ethnicity,marital)

    
