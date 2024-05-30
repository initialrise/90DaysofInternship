import os
import pandas as pd
import datetime
import re
files = os.listdir("./healthcare-datasets")
jsonfiles = []
for f in files:
    if f.endswith(".json"):
        jsonfiles.append(f"healthcare-datasets/{f}")

def output_patient(patient_data):
    def calculate_age(dob):
        try:
            birth_year = datetime.datetime.strptime(dob, '%Y-%m-%d').year
            age = str(datetime.datetime.now().year - birth_year)
            return age
        except Exception as e:
            return None

    patient_id = patient_data.get("resource.id", pd.Series([]))
    patient_name_data = pd.json_normalize(patient_data.get("resource.name", pd.Series([])).explode())

    if not patient_name_data.empty:
        if "prefix" in patient_name_data.columns:
            patient_name_data = patient_name_data.explode(["given", "prefix"])
        else:
            patient_name_data = patient_name_data.explode("given")
        first_name = patient_name_data[patient_name_data["use"] == "official"].get("given", pd.Series([]))
        last_name = patient_name_data[patient_name_data["use"] == "official"].get("family", pd.Series([]))
        prefix = patient_name_data[patient_name_data["use"] == "official"].get("prefix", pd.Series([]))

        patient_name = prefix.str.cat(first_name.str.cat(last_name, sep=" "), sep=" ")
        patient_name = patient_name.apply(lambda n: re.sub(r"[0-9]", '', n))
    else:
        patient_name = pd.Series([])

    patient_gender = patient_data.get("resource.gender", pd.Series([]))
    patient_age = patient_data.get("resource.birthDate", pd.Series([])).apply(calculate_age)


    telecom_data = pd.json_normalize(patient_data.get("resource.telecom", pd.Series([])).explode())
    patient_phone = telecom_data[telecom_data["system"] == "phone"].get("value", pd.Series([]))


    patient_extension = pd.json_normalize(patient_data.get("resource.extension", pd.Series([])).explode())

    if not patient_extension.empty:
        patient_race = pd.json_normalize(
            patient_extension[patient_extension["valueCodeableConcept.text"] == "race"]
            .get("valueCodeableConcept.coding", pd.Series([])).explode()
        ).get("display", pd.Series([]))

        patient_ethnicity = pd.json_normalize(
            patient_extension[patient_extension["valueCodeableConcept.text"] == "ethnicity"]
            .get("valueCodeableConcept.coding", pd.Series([])).explode()
        ).get("display", pd.Series([]))
    else:
        patient_race = pd.Series([])
        patient_ethnicity = pd.Series([])

    if not patient_extension.empty:
        patient_address = patient_extension.get("valueAddress.city", pd.Series([])).dropna().str.cat(
            patient_extension.get("valueAddress.state", pd.Series([])).dropna(), sep=", "
        )
        patient_address = patient_address.reset_index(drop=True)
    else:
        patient_address = pd.Series([])


    marital_status_data = pd.json_normalize(patient_data.get("resource.maritalStatus.coding", pd.Series([])).explode())
    patient_marital_status = marital_status_data.get("code", pd.Series([])).apply(
        lambda c: "Married" if c == "M" else "Unmarried" if pd.notna(c) else "Unknown"
    )

    patient_output = pd.DataFrame({
        "Patient ID": patient_id,
        "Name": patient_name,
        "Gender": patient_gender,
        "Age": patient_age,
        "Phone Number": patient_phone,
        "Address": patient_address,
        "Race": patient_race,
        "Ethnicity": patient_ethnicity,
        "Marital Status": patient_marital_status
    })

    return patient_output



def output_encounter(encounter_data,patient_data):
    encounter_id = encounter_data.get("resource.id", "")
    encounter_class = encounter_data.get("resource.class.code", "")
    encounter_type = pd.json_normalize(encounter_data.get("resource.type",pd.Series([])).explode()).get("text","")
    encounter_status = encounter_data.get("resource.status", "")
    encounter_start_date = encounter_data.get("resource.period.start", "")
    encounter_end_date = encounter_data.get("resource.period.end", "")

    encounter_patient_reference = encounter_data.get("resource.patient.reference")
    encounter_patient_id=""
    if encounter_patient_reference is not None:
        encounter_patient_relation = pd.merge(patient_data,encounter_data,how="left",left_on="fullUrl",right_on="resource.patient.reference")
        encounter_patient_id=encounter_patient_relation.get("resource.id_x","")
        encounter_columns=["Encounter ID","Status","Class", "Type","Start Date", "End Date","Patient ID"]

    encounter_output = pd.DataFrame({
    "Status":encounter_status,
    "Encounter":encounter_id,
    "Status":encounter_status,
    "Class":encounter_class,
    "Type":encounter_type,
    "Start Date":encounter_start_date,
    "End Date":encounter_end_date,
    "Patient ID":encounter_patient_id
    })
    return encounter_output

def output_procedure(procedure_data,patient_data,encounter_data):
    procedure_status = procedure_data.get("resource.status", "")
    procedure_code_text = procedure_data.get("resource.code.text", "")
    procedure_performed_period_start = procedure_data.get("resource.performedPeriod.start", "")
    procedure_performed_period_end = procedure_data.get("resource.performedPeriod.end", "")

    procedure_patient_id = pd.Series([])
    procedure_encounter_id = pd.Series([])

    procedure_subject_reference = procedure_data.get("resource.subject.reference", None)
    if procedure_subject_reference is not None:
        procedure_patient_relation = pd.merge(procedure_data, patient_data, how="left", left_on="resource.subject.reference", right_on="fullUrl")
        procedure_patient_id = procedure_patient_relation.get("resource.id_y", "")


    procedure_encounter_reference = procedure_data.get("resource.encounter.reference", None)
    if procedure_encounter_reference is not None:
        procedure_encounter_relation = pd.merge(procedure_data, encounter_data, how="left", left_on="resource.encounter.reference", right_on="fullUrl")
        procedure_encounter_id = procedure_encounter_relation.get("resource.id_y", "")


    procedure_output = pd.DataFrame({
        "Status": procedure_status,
        "Procedure Name": procedure_code_text,
        "Patient ID": procedure_patient_id,
        "Encounter ID": procedure_encounter_id,
        "Procedure Date Time Start": procedure_performed_period_start,
        "Procedure Date Time End": procedure_performed_period_end
    })

    return procedure_output

def output_immunization(immunization_data,encounter_data,patient_data):
    immunization_status = immunization_data.get("resource.status", "")
    immunization_date = immunization_data.get("resource.date", "")
    immunization_name = pd.json_normalize(immunization_data.get("resource.vaccineCode.coding", pd.Series([])).explode()).get("display", "")


    immunization_patient_id = pd.Series([])
    immunization_encounter_id = pd.Series([])


    immunization_patient_reference = immunization_data.get("resource.patient.reference", None)
    if immunization_patient_reference is not None:
        immunization_patient_relation = pd.merge(immunization_data, patient_data, how="left", left_on="resource.patient.reference", right_on="fullUrl")
        immunization_patient_id = immunization_patient_relation.get("resource.id_y", "")


    immunization_encounter_reference = immunization_data.get("resource.encounter.reference", None)
    if immunization_encounter_reference is not None:
        immunization_encounter_relation = pd.merge(immunization_data, encounter_data, how="left", left_on="resource.encounter.reference", right_on="fullUrl")
        immunization_encounter_id = immunization_encounter_relation.get("resource.id_y", "")


    immunization_output = pd.DataFrame({
        "Status": immunization_status,
        "Date": immunization_date,
        "Immunization Name": immunization_name,
        "Patient ID": immunization_patient_id,
        "Encounter ID": immunization_encounter_id
    })

    return immunization_output

def output_diagnostic(diagnostic_data,patient_data,encounter_data):
    diagnostic_report_id = diagnostic_data.get("resource.id", "")
    diagnostic_name = pd.json_normalize(diagnostic_data.get("resource.code.coding", pd.Series([])).explode()).get("display", "")
    diagnostic_performer = pd.json_normalize(diagnostic_data.get("resource.performer", pd.Series([])).explode()).get("display", "")
    diagnostic_status = diagnostic_data.get("resource.status", "")
    diagnostic_date = diagnostic_data.get("resource.effectiveDateTime", "")


    diagnostic_patient_id = pd.Series([])
    diagnostic_encounter_id = pd.Series([])


    diagnostic_patient_reference = diagnostic_data.get("resource.subject.reference", None)
    if diagnostic_patient_reference is not None:
        diagnostic_patient_relation = pd.merge(diagnostic_data, patient_data, how="left", left_on="resource.subject.reference", right_on="fullUrl")
        diagnostic_patient_id = diagnostic_patient_relation.get("resource.id_y", "")


    diagnostic_encounter_reference = diagnostic_data.get("resource.encounter.reference", None)
    if diagnostic_encounter_reference is not None:
        diagnostic_encounter_relation = pd.merge(diagnostic_data, encounter_data, how="left", left_on="resource.encounter.reference", right_on="fullUrl")
        diagnostic_encounter_id = diagnostic_encounter_relation.get("resource.id_y", "")


    diagnostic_result = diagnostic_data.get("resource.result", pd.Series([])).explode()


    diagnostic_output = pd.DataFrame({
        "Status": diagnostic_status,
        "Report ID": diagnostic_report_id,
        "Diagnostic Name": diagnostic_name,
        "Patient ID": diagnostic_patient_id,
        "Encounter ID": diagnostic_encounter_id,
        "Diagnostic Date Time": diagnostic_date,
        "Performer": diagnostic_performer,
        "Result": diagnostic_result
    })


    diagnostic_output["display"] = pd.json_normalize(diagnostic_output["Result"]).set_index(diagnostic_output["Result"].index).get("display", "")
    diagnostic_output["reference"] = pd.json_normalize(diagnostic_output["Result"]).set_index(diagnostic_output["Result"].index).get("reference", "")

    diagnostic_output.drop("Result", axis=1, inplace=True)
    return diagnostic_output

def output_observation(observation_data,patient_data,encounter_data,diagnostic_data):
    #Observation ID, Status, Patient ID, Encounter ID, Observation Date Time, Observation Type, Observation Value, Diagnostic Report ID
    observation_report_id = observation_data.get("resource.id", "")
    observation_type = pd.json_normalize(observation_data.get("resource.code.coding", pd.Series([])).explode()).get("display", "")
    observation_status = observation_data.get("resource.status", "")
    observation_date = observation_data.get("resource.effectiveDateTime", "")

    observation_patient_id = ""
    observation_encounter_id = ""

    observation_patient_reference = observation_data.get("resource.subject.reference", None)
    if observation_patient_reference is not None:
        observation_patient_relation = pd.merge(observation_data, patient_data, how="left", left_on="resource.subject.reference", right_on="fullUrl")
        observation_patient_id = observation_patient_relation.get("resource.id_y", "")

    observation_encounter_reference = observation_data.get("resource.encounter.reference", None)
    if observation_encounter_reference is not None:
        observation_encounter_relation = pd.merge(observation_data, encounter_data, how="left", left_on="resource.encounter.reference", right_on="fullUrl")
        observation_encounter_id = observation_encounter_relation.get("resource.id_y", "")

    observation_value = observation_data.get("resource.valueQuantity.value", pd.Series([])).astype("str")
    observation_unit = observation_data.get("resource.valueQuantity.unit", pd.Series([]))
    observation_value_final = observation_value.str.cat(observation_unit, sep=" ")


    diagnosticID = diagnostic_data.get("resource.id", "")
    test_index = diagnostic_data.get("resource.result", pd.Series([])).explode().index#["reference"]
    observation_id = pd.json_normalize(diagnostic_data.get("resource.result", pd.Series([])).explode()).set_index(test_index).get("reference",pd.Series([]))
    observation_id = observation_id.apply(lambda x:x.replace("urn:uuid:",""))
    mapper = pd.DataFrame({"Dia ID":diagnosticID,"Observation ID":observation_id}) 
    #mapper[mapper["Observation ID"]=="412a5566-7260-49cb-9235-9fb3b5b8f5a1"]

    observation_output = pd.DataFrame({
        "Observation ID": observation_report_id,
        "Status": observation_status,
        "Patient ID": observation_patient_id,
        "Encounter ID": observation_encounter_id,
        "Observation Date Time": observation_date,
        "Observation Value": observation_value_final,
        "Observation Type": observation_type
    })

    def lookup_mapper(oid):
        dia_id_series = mapper[mapper["Observation ID"] == oid]["Dia ID"]
        if not dia_id_series.empty:
            return dia_id_series.iloc[0]
        return None
    diagonal_id = observation_output["Observation ID"].apply(lookup_mapper)
    observation_output["Diagonal ID"] = diagonal_id
    return observation_output

def output_condition(condition_data,patient_data,encounter_data):
    condition_id = condition_data.get("resource.id", "")
    condition_clinical_status = condition_data.get("resource.clinicalStatus", "")
    condition_verification_status = condition_data.get("resource.verificationStatus", "")
    condition_name = pd.json_normalize(condition_data.get("resource.code.coding", pd.Series([])).explode()).get("display", "")

    condition_patient_id = pd.Series([])
    condition_encounter_id = pd.Series([])

    condition_patient_reference = condition_data.get("resource.subject.reference", None)
    if condition_patient_reference is not None:
        condition_patient_relation = pd.merge(condition_data, patient_data, how="left", left_on="resource.subject.reference", right_on="fullUrl")
        condition_patient_id = condition_patient_relation.get("resource.id_y", "")

    condition_encounter_reference = condition_data.get("resource.context.reference", None)
    if condition_encounter_reference is not None:
        condition_encounter_relation = pd.merge(condition_data, encounter_data, how="left", left_on="resource.context.reference", right_on="fullUrl")
        condition_encounter_id = condition_encounter_relation.get("resource.id_y", "")

    condition_onset_datetime = condition_data.get("resource.onsetDateTime", "")
    condition_abatement_datetime = condition_data.get("resource.abatementDateTime", "")

    condition_output = pd.DataFrame({
        "Condition ID": condition_id,
        "Clinical Status": condition_clinical_status,
        "Verification Status": condition_verification_status,
        "Condition Name": condition_name,
        "Patient ID": condition_patient_id,
        "Encounter ID": condition_encounter_id,
        "Onset Date Time": condition_onset_datetime,
        "Abatement Date Time": condition_abatement_datetime
    })

    return condition_output

def output_care_plan(care_plan_data,patient_data,encounter_data):
    care_plan_status = care_plan_data.get("resource.status", "")
    care_plan_code = pd.json_normalize(pd.json_normalize(care_plan_data.get("resource.category", pd.Series([])).explode()).get('coding', pd.Series([])).explode()).get("code", "")
    care_plan_name = pd.json_normalize(pd.json_normalize(care_plan_data.get("resource.category", pd.Series([])).explode()).get('coding', pd.Series([])).explode()).get("display", "")
    care_plan_start_date = care_plan_data.get("resource.period.start", "")
    care_plan_end_date = care_plan_data.get("resource.period.end", "")

    care_plan_patient_id = pd.Series([])
    care_plan_encounter_id = pd.Series([])

    care_plan_patient_reference = care_plan_data.get("resource.subject.reference", None)
    if care_plan_patient_reference is not None:
        care_plan_patient_relation = pd.merge(care_plan_data, patient_data, how="left", left_on="resource.subject.reference", right_on="fullUrl")
        care_plan_patient_id = care_plan_patient_relation.get("resource.id_y", "")

    care_plan_encounter_reference = care_plan_data.get("resource.context.reference", None)
    if care_plan_encounter_reference is not None:
        care_plan_encounter_relation = pd.merge(care_plan_data, encounter_data, how="left", left_on="resource.context.reference", right_on="fullUrl")
        care_plan_encounter_id = care_plan_encounter_relation.get("resource.id_y", "")

    care_plan_output = pd.DataFrame({
        "Care Plan Code": care_plan_code,
        "Status": care_plan_status,
        "Care Plan Name": care_plan_name,
        "Patient ID": care_plan_patient_id,
        "Encounter ID": care_plan_encounter_id,
        "Care Plan Start Date": care_plan_start_date,
        "Care Plan End Date": care_plan_end_date,
    })
    return care_plan_output

def output_care_plan_activities(care_plan_data,patient_data,encounter_data):
    care_plan_status = care_plan_data.get("resource.status", "")
    care_plan_code = pd.json_normalize(pd.json_normalize(care_plan_data.get("resource.category", pd.Series([])).explode()).get('coding', pd.Series([])).explode()).get("code", "")
    care_plan_name = pd.json_normalize(pd.json_normalize(care_plan_data.get("resource.category", pd.Series([])).explode()).get('coding', pd.Series([])).explode()).get("display", "")
    care_plan_start_date = care_plan_data.get("resource.period.start", "")
    care_plan_end_date = care_plan_data.get("resource.period.end", "")

    care_plan_patient_id = pd.Series([]) 
    care_plan_encounter_id = pd.Series([])

    care_plan_patient_reference = care_plan_data.get("resource.subject.reference", None)
    if care_plan_patient_reference is not None:
        care_plan_patient_relation = pd.merge(care_plan_data, patient_data, how="left", left_on="resource.subject.reference", right_on="fullUrl")
        care_plan_patient_id = care_plan_patient_relation.get("resource.id_y", "")

    care_plan_encounter_reference = care_plan_data.get("resource.context.reference", None)
    if care_plan_encounter_reference is not None:
        care_plan_encounter_relation = pd.merge(care_plan_data, encounter_data, how="left", left_on="resource.context.reference", right_on="fullUrl")
        care_plan_encounter_id = care_plan_encounter_relation.get("resource.id_y", "")

    care_plan_activity_data = care_plan_data.get("resource.activity",pd.Series([]))
    care_plan_activity_data
    care_plan_output = pd.DataFrame({
        "Care Plan Code": care_plan_code,
        "Status": care_plan_status,
        "Care Plan Name": care_plan_name,
        "Patient ID": care_plan_patient_id,
        "Encounter ID": care_plan_encounter_id,
        "Care Plan Start Date": care_plan_start_date,
        "Care Plan End Date": care_plan_end_date,
        "Activity":care_plan_activity_data
    })

    care_plan_output = care_plan_output.explode("Activity")
    care_plan_output["status"]=pd.json_normalize(care_plan_output.get("Activity",[{}])).set_index(care_plan_output.get("Activity",pd.Series([])).index).get("detail.status","")
    care_plan_output["details"]=pd.json_normalize(care_plan_output.get("Activity",[{}])).set_index(care_plan_output.get("Activity",pd.Series([])).index).get("detail.code.coding","")
    care_plan_output["Care Plan Activity Code"]=pd.json_normalize(care_plan_output.get("details",pd.Series([])).explode()).get("code")
    care_plan_output["Care Plan Activity Name"]=pd.json_normalize(care_plan_output.get("details",pd.Series([])).explode()).get("display")
    care_plan_output.drop(["Activity","details"],axis=1,inplace=True)
    care_plan_activity = care_plan_output[["Care Plan Code","Patient ID","Encounter ID","Care Plan Activity Code","Care Plan Activity Name"]]
    care_plan_activity.drop_duplicates(inplace=True)
    return care_plan_activity


def df_list_to_csv(df_list,output_file):
    final = pd.concat(df_list)
    final.reset_index(drop=True,inplace=True)
    os.makedirs("outputs",exist_ok=True)
    final.to_csv(f"outputs/{output_file}",index=False)
    
def output_csv(jsonfiles):
    df_encounter_list = []
    df_patient_list = []
    df_condition_list = []
    df_diagnostic_list = []
    df_immunization_list = []
    df_observation_list = []
    df_procedure_list = []
    df_care_plan_list = []
    df_care_plan_activities_list = []

    for f in jsonfiles:
        with open(f,"r") as jsonfile:
            print(f"Reading {f}")
            df = pd.read_json(jsonfile)
            entries = pd.json_normalize(df.entry)
            patient_data = entries[entries["resource.resourceType"]=="Patient"]
            encounter_data = entries[entries["resource.resourceType"]=="Encounter"]
            procedure_data = entries[entries["resource.resourceType"]=="Procedure"]
            immunization_data = entries[entries["resource.resourceType"]=="Immunization"]
            diagnostic_data = entries[entries["resource.resourceType"]=="DiagnosticReport"]
            observation_data = entries[entries["resource.resourceType"]=="Observation"]
            condition_data = entries[entries["resource.resourceType"]=="Condition"]
            care_plan_data = entries[entries["resource.resourceType"]=="CarePlan"]
            procedure_data.reset_index(drop=True,inplace=True)
            encounter_data.reset_index(drop=True,inplace=True)
            observation_data.reset_index(drop=True,inplace=True)
            immunization_data.reset_index(drop=True,inplace=True)
            diagnostic_data.reset_index(drop=True,inplace=True)
            condition_data.reset_index(drop=True,inplace=True)
            care_plan_data.reset_index(drop=True,inplace=True)
            
            df_patient_list.append(output_patient(patient_data))
            df_encounter_list.append(output_encounter(encounter_data, patient_data))
            df_condition_list.append(output_condition(condition_data, patient_data,encounter_data))
            df_diagnostic_list.append(output_diagnostic(diagnostic_data, patient_data, encounter_data))
            df_immunization_list.append(output_immunization(immunization_data,encounter_data, patient_data))
            df_observation_list.append(output_observation(observation_data, patient_data,encounter_data,diagnostic_data))
            df_procedure_list.append(output_procedure(procedure_data, patient_data, encounter_data))
            df_care_plan_list.append(output_care_plan(care_plan_data, patient_data,encounter_data))
            df_care_plan_activities_list.append(output_care_plan_activities(care_plan_data, patient_data,encounter_data))

    
    df_list_to_csv(df_patient_list, "patient.csv")
    df_list_to_csv(df_encounter_list, "encounter.csv")
    df_list_to_csv(df_condition_list, "condition.csv")
    df_list_to_csv(df_diagnostic_list, "diagnostic.csv")
    df_list_to_csv(df_immunization_list, "immunization.csv")
    df_list_to_csv(df_observation_list, "observation.csv")
    df_list_to_csv(df_procedure_list, "procedure.csv")
    df_list_to_csv(df_care_plan_list, "care_plan.csv")
    df_list_to_csv(df_care_plan_activities_list, "care_plan_activities.csv")

output_csv(jsonfiles)

