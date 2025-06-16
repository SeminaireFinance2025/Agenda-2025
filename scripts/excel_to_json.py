#!/usr/bin/env python3
import pandas as pd, json, unicodedata

def normalize(name):
    nfkd = unicodedata.normalize('NFKD', str(name))
    return ''.join(c for c in nfkd if not unicodedata.combining(c)).strip().lower()

def main():
    # load your sheet (columns named NOM, PRENOM, ACT1, ACT2, ACT3)
    df = pd.read_excel('assignments.xlsx', dtype=str)

    df['nom_norm']    = df['NOM'].apply(normalize)
    df['prenom_norm'] = df['PRENOM'].apply(normalize)
    df['key']         = df['prenom_norm'] + ' ' + df['nom_norm']

    assignments = {}
    for _, row in df.iterrows():
        assignments[row['key']] = {
            'act1': float(row['ACT1']) if pd.notna(row['ACT1']) else None,
            'act2': float(row['ACT2']) if pd.notna(row['ACT2']) else None,
            'act3': float(row['ACT3']) if pd.notna(row['ACT3']) else None,
        }

    with open('assignments.json', 'w', encoding='utf-8') as f:
        json.dump(assignments, f, ensure_ascii=False, indent=2)
    print(f"✅ Wrote {len(assignments)} entries to assignments.json")

if __name__ == '__main__':
    main()
