import pandas as pd
import json

# 1) Read the Excel file (must be named exactly)
df = pd.read_excel("assignments.xlsx", engine="openpyxl")

# 2) Build lookup key "firstname lastname"
df["key"] = (
    df["PRENOM"].str.strip().str.lower()
    + " "
    + df["NOM"].str.strip().str.lower()
)

# 3) Build the assignments dict
assignments = {}
for _, row in df.iterrows():
    assignments[row["key"]] = {
        "act1": row["ACT1"],
        "act2": row["ACT2"],
        "act3": row["ACT3"],
    }

# 4) Write to assignments.json at repo root
with open("assignments.json", "w", encoding="utf-8") as f:
    json.dump(assignments, f, ensure_ascii=False, indent=2)
