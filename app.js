// Javascript: Small Dose Medication Calculator Logic

// Embedded Fallback Database
const EMBEDDED_IV_DRUGS = [{"name": "Adrenaline 1 mg/1ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "1 mg/ml (1:1000)", "conc_num": 1.0, "diluent": "D5W D10W NSS*", "admin_conc_text": "infusion max conc 60 mcg/ml", "admin_conc_num": "-", "admin_rate": null, "remark": "NSS (compativle but administration in saline solution alone is not recomeded)", "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Calcium gluconate 0.45 mEq/1 ml (10 ml/amp)", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "0.45 mEq/ml", "conc_num": 0.45, "diluent": "D5W D10W NSS", "admin_conc_text": "conc bolus 10-50 mg/ml conc continuous infusion 5.8-10 mg/ml", "admin_conc_num": 5.8, "admin_rate": "max IV drip 100 mg/min, max continuos drip neonate (<1 month): 17-33 mg/kg/hr, >1 month - 17 year: 8-13 mg/kg/hr ", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Ciprofloxacin 400 mg/200 ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "2 mg/ml", "conc_num": 2.0, "diluent": "D5W D10W NSS \nD5N/2 D5N/4 LRS", "admin_conc_text": "0.5-2 mg/ml ", "admin_conc_num": 0.5, "admin_rate": "IV drip over 60 min", "remark": null, "sanford_dose": "20-30 mg/kg/day (divided q 12 hr)", "min_dose_per_kg": 20.0, "max_dose_per_kg": 30.0, "divided_per_day": 2.0, "frequency": "ทุก 12 ชั่วโมง", "age_limit": null}, {"name": "Dexamethasone 4mg/1ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "4 mg/ml", "conc_num": 4.0, "diluent": "D5W D10W NSS", "admin_conc_text": "undiluted or diluted to 0.1-1 mg/ml", "admin_conc_num": 0.1, "admin_rate": "-", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "DIAZEPAM 10 mg/ 2 ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "5 mg/ml", "conc_num": 5.0, "diluent": null, "admin_conc_text": null, "admin_conc_num": null, "admin_rate": null, "remark": null, "sanford_dose": "sedation: 0.05-0.1 mg/kg/dose\nseizures 0.2-0.3 mg/kg", "min_dose_per_kg": 0.2, "max_dose_per_kg": 0.3, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Gentamicin 80 mg/2ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "40 mg/ml", "conc_num": 40.0, "diluent": "D5W D10W NSS", "admin_conc_text": "1 mg/ml or 2 mg/ml or 10 mg/ml or 10 mg/ml", "admin_conc_num": 1.0, "admin_rate": "IV drip in 30 min", "remark": null, "sanford_dose": "- 2.5 (divided q 8 hr)\n- 5-7 mg/kg/day) OD\n- max 105 mg/day", "min_dose_per_kg": 5.0, "max_dose_per_kg": 7.0, "divided_per_day": 3.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "Levetiracetam 100 mg/1ml (5 ml/vial)", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "100 mg/1ml", "conc_num": 100.0, "diluent": "D5W NSS LRS", "admin_conc_text": "max 15 mg/ml", "admin_conc_num": 15.0, "admin_rate": "IV drip over 15 min", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Methylprednisolone 40 mg/1 mg (single dose vial)", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "40 mg/ml", "conc_num": 40.0, "diluent": "D5W NSS  D5S D5N/2 LRS", "admin_conc_text": "IV push over several min, IV infusion high dose 15-30 mg/kg or 500-1000 mg per dose to 2.5-20 mg/ml", "admin_conc_num": 2.5, "admin_rate": "IV drip over 30 min to 3 hr", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Metronidazole 500 mg/100 ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "5 mg/ml", "conc_num": 5.0, "diluent": "D5W NSS", "admin_conc_text": "max 8 mg/ml", "admin_conc_num": 8.0, "admin_rate": "IV drip over 30-60 min", "remark": null, "sanford_dose": "22.5-40 mg/kg/day (divided q 6-8)", "min_dose_per_kg": 22.5, "max_dose_per_kg": 40.0, "divided_per_day": 3.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "ONDANSETRON 4 mg /2 ml.", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "2 mg/ml", "conc_num": 2.0, "diluent": null, "admin_conc_text": null, "admin_conc_num": null, "admin_rate": null, "remark": null, "sanford_dose": "0.15 mg/kg/dose", "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Phenobarbital 200 mg/1 ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "200 mg/ml", "conc_num": 200.0, "diluent": "D5W D10W NSS", "admin_conc_text": "standard conc 10 mg/ml and 65 mg/ml", "admin_conc_num": 10.0, "admin_rate": "IV drip 15- 30 min", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Phenytoin 250 mg/5ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "50 mg/ml", "conc_num": 50.0, "diluent": "NSS only", "admin_conc_text": "IV infusion not less than 5 mg/ml", "admin_conc_num": 5.0, "admin_rate": "IV drip in 15-30 min", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Potassium chloride 40 mEq/20 ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "2 mEq/ml", "conc_num": 2.0, "diluent": "D5W D10W NSS D5N/2 D5N/4 LRS, Acetar", "admin_conc_text": "max. peripheral infusion 60-80 mEq/L max. central line infusion 200 mEq/L ", "admin_conc_num": null, "admin_rate": "max 1 mEq/kg/hr or 40 mEq/hr", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Sodium valproate 400 mg/4ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "100 mg/ml", "conc_num": 100.0, "diluent": "D5W NSS LRS", "admin_conc_text": null, "admin_conc_num": null, "admin_rate": "IV drip max 20 mg/min over 60 min", "remark": "เจือจางในสารน้ำ อย่างน้อย 50 ml", "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Amoxy-clave 1.2 g", "solvent_volume": "NSS,SWI 19.1 ml", "total_volume": "20 ml", "conc_text": "50 mg/ml", "conc_num": 50.0, "diluent": "NSS", "admin_conc_text": "10-20 mg of amoxicillin/ml ", "admin_conc_num": 10.0, "admin_rate": "IV drip in 30-40 min", "remark": null, "sanford_dose": "<3 mo, wt. <4 kg: 25 mg/kg q 12 hr \n<3 mo, wt. >=4 kg: 25 mg/kg q 8 hr \n>=3 mo, wt. <40 kg: 25 mg/kg q 8 hr \n>=3 mo, wt. <40 kg:  1000/200 q 8 hr ", "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Ampicillin 1000 mg", "solvent_volume": "NSS,SWI 7.4 ml", "total_volume": "10 ml", "conc_text": "100 mg/ml", "conc_num": 100.0, "diluent": "D5W NSS D5N/2 LRS", "admin_conc_text": "recommened 30,40,50,100 mg/ml", "admin_conc_num": 30.0, "admin_rate": "IV drip in 30 min", "remark": null, "sanford_dose": "- 200 mg/kg/day (divided q 6 hr)\n- meningitis 300-400 mg/kg/day (divided q 4 hr)", "min_dose_per_kg": 200.0, "max_dose_per_kg": null, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Ampicillin 500 mg", "solvent_volume": "NSS,SWI 5 ml", "total_volume": "5 ml", "conc_text": "100 mg/ml", "conc_num": 100.0, "diluent": "D5W", "admin_conc_text": "recommened 30,40,50,100 mg/ml", "admin_conc_num": 30.0, "admin_rate": "IV drip in 30 min", "remark": null, "sanford_dose": "-200 mg/kg/day (divided q 6 hr)\n-meningitis 300-400 mg/kg/day (divided q 4 hr)", "min_dose_per_kg": 200.0, "max_dose_per_kg": null, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Cefazolin 1 g", "solvent_volume": "SWI 4.5 ml", "total_volume": "5 ml", "conc_text": "200 mg/ml", "conc_num": 200.0, "diluent": "NSS D5W D10W LRS", "admin_conc_text": "IV bolus  100 mg/ml, IV infusion 5-20 mg/ml", "admin_conc_num": 5.0, "admin_rate": "IV bolus over 3-5 min or IV drip 30-60 min", "remark": null, "sanford_dose": "-50-150 mg/kg/day (divided q 6-8 hr)\n-max 6 gm/day", "min_dose_per_kg": 50.0, "max_dose_per_kg": 150.0, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Cefotaxime 1 g", "solvent_volume": "SWI 9.6 ml", "total_volume": "10 ml", "conc_text": "100 mg/ml", "conc_num": 100.0, "diluent": "NSS D5W D10W", "admin_conc_text": "IV bolus 50-100 mg/ml, IV infusion 10-40 mg/ml", "admin_conc_num": 10.0, "admin_rate": "IV drip in 30 min", "remark": null, "sanford_dose": "Standard\n0-7 day: 100 mg/kg/day (divided q 12 hr)\n8-28 day: 150 mg/kg/day (divided q 8 hr)\n>28 day: 150-200 mg/kg/day (divided q 6-8 hr)\nMeningitis\n0-7 day: 100-150 mg/kg/day (divided q 8-12 hr)\n8-28 day: 150-200 mg/kg/day (divided q 6-8 ht)\n>28 day: 225-300 mg/kg/day (divided q 6-8 ht)", "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Ceftazidime 1 g", "solvent_volume": "SWI 9  ml", "total_volume": "10 ml", "conc_text": "100 mg/ml", "conc_num": 100.0, "diluent": "NSS D5W D10W", "admin_conc_text": "1-40 mg/ml", "admin_conc_num": 20.0, "admin_rate": "IV drip over 30-60 min", "remark": "น้อยกว่า 1 g เจือจางในสารน้ำ 30-50 ml, มากกว่า 1 g เจือจางในสารน้ำ 60-100 ml", "sanford_dose": "-150-200 mg/kg/day divided q 8 hr\n-CF: 300 mg2kg/day divided q 8 hr", "min_dose_per_kg": 150.0, "max_dose_per_kg": 200.0, "divided_per_day": 3.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "Ceftriaxone 1 g", "solvent_volume": "SWI 9.5 ml", "total_volume": "10 ml", "conc_text": "100 mg/ml", "conc_num": 100.0, "diluent": "NSS D5W D10W", "admin_conc_text": "10-40 mg/ml (or lower if necessary)", "admin_conc_num": 10.0, "admin_rate": "<1 g IV drip in 30 min, > 1 g  IV drip in 60 min", "remark": "น้อยกว่า 1 g เจือจางในสารน้ำ 30-50 ml, มากกว่า 1 g เจือจางในสารน้ำ 60-100 ml", "sanford_dose": "-50-100 mg/kg q 24 hr\n-meningitis: 50 mg/kg q 12 hr", "min_dose_per_kg": 50.0, "max_dose_per_kg": 100.0, "divided_per_day": 1.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "Cloxacillin 1 g", "solvent_volume": "IV bolus SWI 9.6 ml, IV infusion SWI 3.4 ml", "total_volume": "IV bolus 10 ml, IV infusion 4 ml", "conc_text": "IV bolus 100 mg/ml, IV infusion 250 mg/ml", "conc_num": 250.0, "diluent": "NSS D5W*", "admin_conc_text": "IV push 50 or 10 mg/ml, IV infusion +solution to 100 ml", "admin_conc_num": null, "admin_rate": "IV bolus over 2-4 min, IV drip over 30-40 min", "remark": "ให้ add  NSS to 100 ml \n***ใน D5W โอกาสเกิด phlebitis มากกว่า ", "sanford_dose": "-50-200 mg/kg/day divided q 6 hr", "min_dose_per_kg": 50.0, "max_dose_per_kg": 200.0, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Colistin 150 mg", "solvent_volume": "SWI 2 ml", "total_volume": "2 ml", "conc_text": "75 mg/ml", "conc_num": 75.0, "diluent": "NSS, D5W, D5S, D10W, SWI", "admin_conc_text": "75 mg/ml", "admin_conc_num": 75.0, "admin_rate": "IV drip 30-60 min", "remark": null, "sanford_dose": "-2.5-5 mg/kg/day divided q 6-12 hr\n-CF: 3-8 mg/kg/day divided q 8 hr", "min_dose_per_kg": 2.5, "max_dose_per_kg": 5.0, "divided_per_day": 2.0, "frequency": "ทุก 12 ชั่วโมง", "age_limit": null}, {"name": "Hydrocortisone 100 mg", "solvent_volume": "SWI 1.8 ml", "total_volume": "2 ml", "conc_text": "50 mg/ml", "conc_num": 50.0, "diluent": "NSS D5W", "admin_conc_text": "IV infusion 1 mg/ml, fluid-restricted pt. IV bolus up to 3000 mg + 50 ml and IV infusion 1,2,5 mg/ml", "admin_conc_num": 1.0, "admin_rate": "IV bolus 30 sec. (100 mg) to 10 min (500 mg and more), ", "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Meropenem 1 g", "solvent_volume": "SWI 19 ml", "total_volume": "20 ml", "conc_text": "50 mg/ml", "conc_num": 50.0, "diluent": "NSS D5W D10W", "admin_conc_text": "1-20 mg/ml", "admin_conc_num": 4.0, "admin_rate": "IV drip over 30 min", "remark": null, "sanford_dose": "-60 mg/kg/day divided q 8 hr\n-Meninigitis 120 mg/kg/day divided q 8 hr", "min_dose_per_kg": 60.0, "max_dose_per_kg": null, "divided_per_day": 3.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "Omeprazole 40 mg", "solvent_volume": "SWI 10 ml", "total_volume": "-", "conc_text": "4 mg/ml", "conc_num": 4.0, "diluent": "NSS", "admin_conc_text": "direct IV or dilute 50-100 ml  iv infusion", "admin_conc_num": "-", "admin_rate": "direct IV 40 mg over 5 min  or IV drip 20-30 min", "remark": "infusion เจือจางในสารน้ำ 50-100 ml", "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "Penicillin G Sodium 5 MU", "solvent_volume": "SWI 8 ml", "total_volume": "10 ml", "conc_text": "500,000 unit/ml", "conc_num": 500000.0, "diluent": "NSS D5W", "admin_conc_text": "50,000-100,000 unit/ml (in neonate 25,000 unit/ml has been used)", "admin_conc_num": 50000.0, "admin_rate": "IV drip : add solution up to 30 ml drip over 15-30 min", "remark": null, "sanford_dose": "-100,000 - 300,000 unit/kg/day divided q 4-6 hr\n-CNS 300,000 - 400,000 unit/kg/day divied q 4 hr\n-meningitis\n<= 7 day: 450,000 unit/kg/day divied q 8 hr\n>7 day: 500,000 unit/kg/day divied q 6 hr", "min_dose_per_kg": 100000.0, "max_dose_per_kg": 300000.0, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Piperacillin+tazobactam 4.5 g", "solvent_volume": "SWI 20 ML", "total_volume": "-", "conc_text": "180 mg/mL", "conc_num": 180.0, "diluent": "NSS D5W", "admin_conc_text": "20-80 mg/ml of piperacillin ", "admin_conc_num": 20.0, "admin_rate": "IV drip over 30 min", "remark": null, "sanford_dose": "400 mg/kg/day divided q 6 hr", "min_dose_per_kg": 400.0, "max_dose_per_kg": null, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Vancomycin 500 mg", "solvent_volume": "SWI 10 ml", "total_volume": "-", "conc_text": "50 mg/ml", "conc_num": 50.0, "diluent": "NSS D5W", "admin_conc_text": "5 mg/ml", "admin_conc_num": 5.0, "admin_rate": "max rate 10 mg/min", "remark": null, "sanford_dose": "60-80  mg/kg/day divided q 6 hr", "min_dose_per_kg": 60.0, "max_dose_per_kg": 80.0, "divided_per_day": 4.0, "frequency": "ทุก 6 ชั่วโมง", "age_limit": null}, {"name": "Acyclovir 250 mg", "solvent_volume": "SWI 10 ML", "total_volume": "-", "conc_text": "25 mg/ml", "conc_num": 25.0, "diluent": "NSS", "admin_conc_text": "<5", "admin_conc_num": 4.0, "admin_rate": "IV drip conc <5 mg/ml drip over 1 hr", "remark": "IV drip conc <5 mg/ml", "sanford_dose": "-60 mg/kg/day divided q 8 hr\n-HSV encephalitis >3 MO 30-45 mg/kg/day divided q 8 hr", "min_dose_per_kg": 60.0, "max_dose_per_kg": null, "divided_per_day": 3.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "Amikacin sulfate  500 mg/2 ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "250 MG/ml", "conc_num": 250.0, "diluent": "D5W NSS", "admin_conc_text": "2.5- 10 mg/ml", "admin_conc_num": 2.5, "admin_rate": "IV drip in 30 min", "remark": null, "sanford_dose": "-15-20 mg/kg/day once daily\n-5-7.5 mg/kg q 8 hr", "min_dose_per_kg": 15.0, "max_dose_per_kg": 20.0, "divided_per_day": 1.0, "frequency": "ทุก 24 ชั่วโมง", "age_limit": null}, {"name": "Clindamycin 600 mg/4ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "150 mg/ml", "conc_num": 150.0, "diluent": "D5W D10W NSS", "admin_conc_text": "max 18 mg/ml standard conc. 6 mg/ml or 12 mg/ml or 18 mg/ml", "admin_conc_num": 6.0, "admin_rate": "IV drip in 10-60 min not exceed 30 mg/min", "remark": null, "sanford_dose": "20-40 mg/kg/day divided q 6-8 hr", "min_dose_per_kg": 20.0, "max_dose_per_kg": 40.0, "divided_per_day": 3.0, "frequency": "ทุก 8 ชั่วโมง", "age_limit": null}, {"name": "Amiodarone Hydrochloride 50 mg/ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "50 mg/ml", "conc_num": 50.0, "diluent": "D5W", "admin_conc_text": null, "admin_conc_num": null, "admin_rate": null, "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "DIGOXIN IV 0.25 mg/ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "0.25 mg/ml", "conc_num": 0.25, "diluent": "D5W NSS", "admin_conc_text": null, "admin_conc_num": null, "admin_rate": null, "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "DIPOTASSIUM PHOSPHATE 1meq/ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "1 meq/ml", "conc_num": 1.0, "diluent": "D5W NSS", "admin_conc_text": null, "admin_conc_num": null, "admin_rate": null, "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}, {"name": "50%MAGNESIUM SULFATE 0.5 g/ml", "solvent_volume": 0.0, "total_volume": "-", "conc_text": "500 mg/ml", "conc_num": 500.0, "diluent": "D5W NSS", "admin_conc_text": null, "admin_conc_num": null, "admin_rate": null, "remark": null, "sanford_dose": null, "min_dose_per_kg": null, "max_dose_per_kg": null, "divided_per_day": null, "frequency": null, "age_limit": null}];
const EMBEDDED_ORAL_DRUGS = [{"name": "AMOXICILLIN 125 mg/5ml x 1 ขวด (60 ml.)\n", "concentration": 25.0, "sanford_std_dose": "25-50 mg/kg/day divied q 8 hr", "sanford_high_dose": "80-100 mg/kg/day", "sanford_max_dose": null, "micromedex_std_dose": "<3 MO 15 mg/kg/dose q 12 hr\n>3 MO & Wt.<40 kg 25-45 mg/kg/day\n>=3 MO& Wt. >40 kg 500 mg/dose q 8-12 hr, 250 mg/dose q 8 hr, 875 mg q 12 hr", "micromedex_high_dose": "50 mg/kg/dose", "micromedex_max_dose": null, "ministry_dose": "20-50 mg/kg/day divied q 8 hr", "age_limit": null}, {"name": "Co-Amoxiclav 457 mg/5ml x 1 ขวด", "concentration": "******amoxy content", "sanford_std_dose": "45 mg/kg/day", "sanford_high_dose": "90 mg/kg/day", "sanford_max_dose": null, "micromedex_std_dose": "<90 day: 30 mg/kg/day divied q 12 hr\n>90 day: 25 mg/kg/day divied q 12 hr (max 500 mg/dose), 20 mg/kg/day divied q 8 hr (max250 mg/dose)", "micromedex_high_dose": "90 mg/kg/day", "micromedex_max_dose": null, "ministry_dose": "25-45 mg/kg/day divied q 8 hr", "age_limit": null}, {"name": "DICLOXACILLIN 62.5 mg/5ml x 1 ขวด (60 ml.)", "concentration": 12.5, "sanford_std_dose": "12.5-25 mg/kg/day divied q 6 hr", "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": "SSTI: \n", "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "12.5-25 mg/kg/day divied q 6 hr", "age_limit": null}, {"name": "CO-TRIMOXAZOLE susp 240 mg/5ml x 1 ขวด (60 ml.)", "concentration": 48.0, "sanford_std_dose": "8-10 TMP/kg/day divied q 12 hr\nPJP: 15-20 TMP/kg/day divied q 6-8 hr", "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "4 mg/kg/dose  q 8 hr", "age_limit": null}, {"name": "cePHALEXIN SYRUP 125 mg/5ml x 1 syrup", "concentration": 25.0, "sanford_std_dose": "25-100 mg/kg/day divied q 6 hr", "sanford_high_dose": "mg/kg/day divied q hr", "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "25-50 mg/kg/day divied q 6 hr", "age_limit": null}, {"name": "CEFIXIME(Cefspan) SYRUP 100 mg/5ml x 1 ขวด", "concentration": 20.0, "sanford_std_dose": "8 mg/kg/day divied q 12-24 hr", "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "ERYTHROMYCIN 125 mg/5ml x 1 ขวด (60 ml.)", "concentration": 25.0, "sanford_std_dose": "45-50 mg/kg/day divied q 6 hr", "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "30-50 mg/kg/day divied q 6 hr", "age_limit": null}, {"name": "azithromycin", "concentration": null, "sanford_std_dose": "5-12 mg/kg/day", "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "10 mg/kg/day OD", "age_limit": null}, {"name": "Favipiravir 100 mg/1ml", "concentration": 100.0, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "PARACETAMOL SUSPENSION 120 mg/5ml x 1 ขวด", "concentration": 24.0, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": "<60 kg: 10-15 mg/kg/dose mg q 4-6 hr\n>=60 kg: 650-1000 mg q 4-6 hr", "micromedex_high_dose": null, "micromedex_max_dose": "4 gm/day", "ministry_dose": "10-15 mg/kg/dose q 4-6 hr", "age_limit": null}, {"name": "CPM 2 mg/5ml x 1 ขวด (60 ml.)", "concentration": 0.4, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": "4 gm/day", "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "0.35 mg/kg/day divied q 6-8 hr", "age_limit": null}, {"name": "CETIRIZINE 5 mg/5ml x 1 ขวด (60 ml.)", "concentration": 1.0, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "IBUPROFEN SUSP 100 mg/5ml x 1 ขวด", "concentration": 20.0, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "5-10 mg/kg/dose q6-8 hr", "age_limit": null}, {"name": "GLYCERYL GUAIACOLATE 100 mg/5ml x 1 ขวด", "concentration": null, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "HYOSCINE SYR 5 mg/5ml x 1 ขวด (30 ml.)", "concentration": null, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "SIMETHICONE drop 67 mg./ml. x 1 ขวด (15 ml.)", "concentration": null, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "TERBUTALINE SYRUP 1.5 mg/5ml x 1 ขวด", "concentration": 0.3, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}, {"name": "DOMPERIDONE 5 mg/5ml x 1 ขวด (30 ml.)", "concentration": 1.0, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": "0.2-0.4 mg/kg/dose q 8 hr", "age_limit": null}, {"name": "smecta", "concentration": null, "sanford_std_dose": null, "sanford_high_dose": null, "sanford_max_dose": null, "micromedex_std_dose": null, "micromedex_high_dose": null, "micromedex_max_dose": null, "ministry_dose": null, "age_limit": null}];

let ivDrugs = [];
let oralDrugs = [];
let activeTab = 'quick-calc';
let activeDbTab = 'iv';
let selectedQuickDrug = null;

// Paths to CSV databases on server
const IV_CSV_PATH = "รายชื่อยา Small doseรพ.โพนทอง - ข้อมูลยา ห้ามแก้ไข.csv";
const ORAL_CSV_PATH = "รายชื่อยา Small doseรพ.โพนทอง - ข้อมูลยาน้ำ ห้ามแก้ไข.csv";

// Parse RFC 4180 CSV
function parseCSV(text) {
    const lines = [];
    let row = [""];
    let inQuotes = false;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                row[row.length - 1] += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push('');
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') {
                i++;
            }
            lines.push(row);
            row = [''];
        } else {
            row[row.length - 1] += char;
        }
    }
    if (row.length > 1 || row[0] !== '') {
        lines.push(row);
    }
    return lines;
}

// Map parsed CSV to JSON objects
function parseCSVData(csvText, type) {
    const rows = parseCSV(csvText);
    if (rows.length < 2) return [];
    
    const data = [];
    if (type === 'iv') {
        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (r.length < 5 || !r[0].trim()) continue;
            
            data.push({
                name: r[0].trim(),
                solvent_volume: r[1],
                total_volume: r[2],
                conc_text: r[3],
                conc_num: parseFloat(r[4]) || null,
                diluent: r[5],
                admin_conc_text: r[6],
                admin_conc_num: parseFloat(r[7]) || r[7], // keep text if not a float (e.g. '-')
                admin_rate: r[8],
                remark: r[9],
                sanford_dose: r[10],
                min_dose_per_kg: parseFloat(r[11]) || null,
                max_dose_per_kg: parseFloat(r[12]) || null,
                divided_per_day: parseFloat(r[13]) || null,
                frequency: r[14],
                age_limit: r[15]
            });
        }
    } else if (type === 'oral') {
        for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (r.length < 2 || !r[0].trim()) continue;
            
            data.push({
                name: r[0].trim().replace(/\r?\n/g, ' '),
                concentration: parseFloat(r[1]) || r[1],
                sanford_std_dose: r[2],
                sanford_high_dose: r[3],
                sanford_max_dose: r[4],
                micromedex_std_dose: r[5],
                micromedex_high_dose: r[6],
                micromedex_max_dose: r[7],
                ministry_dose: r[8],
                age_limit: r[9]
            });
        }
    }
    return data;
}

// Show Toast notification
function showNotification(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-message');
    toastText.textContent = message;
    
    toast.className = 'toast active ' + type;
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}

// Initialize Database
async function initDatabase() {
    let localIV = localStorage.getItem('smalldose_iv_drugs');
    let localOral = localStorage.getItem('smalldose_oral_drugs');
    
    if (localIV && localOral) {
        ivDrugs = JSON.parse(localIV);
        oralDrugs = JSON.parse(localOral);
        document.getElementById('db-status-text').textContent = "ใช้ฐานข้อมูลแก้ไขได้ (Local)";
        document.getElementById('db-status').querySelector('.status-dot').className = 'status-dot warning';
    } else {
        try {
            const ivRes = await fetch(IV_CSV_PATH);
            const oralRes = await fetch(ORAL_CSV_PATH);
            
            if (ivRes.ok && oralRes.ok) {
                const ivText = await ivRes.text();
                const oralText = await oralRes.text();
                
                ivDrugs = parseCSVData(ivText, 'iv');
                oralDrugs = parseCSVData(oralText, 'oral');
                
                if (ivDrugs.length > 0 && oralDrugs.length > 0) {
                    document.getElementById('db-status-text').textContent = "ใช้ฐานข้อมูลโรงพยาบาล (Live CSV)";
                    document.getElementById('db-status').querySelector('.status-dot').className = 'status-dot success';
                    // Cache defaults
                    localStorage.setItem('smalldose_default_iv', JSON.stringify(ivDrugs));
                    localStorage.setItem('smalldose_default_oral', JSON.stringify(oralDrugs));
                } else {
                    throw new Error("Empty or malformed CSV rows");
                }
            } else {
                throw new Error("HTTP Status error loading CSV files");
            }
        } catch (err) {
            console.warn("Using embedded default datasets due to CORS / Offline opening.", err);
            ivDrugs = EMBEDDED_IV_DRUGS;
            oralDrugs = EMBEDDED_ORAL_DRUGS;
            document.getElementById('db-status-text').textContent = "ใช้ฐานข้อมูลยาสำเร็จรูป (Offline)";
            document.getElementById('db-status').querySelector('.status-dot').className = 'status-dot success';
        }
    }
    
    renderIVBatchTable();
    renderOralTable();
    renderEditorTable();
}

// Switching Tabs
function switchTab(tabId) {
    activeTab = tabId;
    
    // Hide all
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
    
    // Show active
    document.getElementById('tab-' + tabId).classList.add('active');
    
    // Sidebar active style
    const menuButtons = document.querySelectorAll('.menu-item');
    if (tabId === 'quick-calc') menuButtons[0].classList.add('active');
    if (tabId === 'iv-table') menuButtons[1].classList.add('active');
    if (tabId === 'oral-calc') menuButtons[2].classList.add('active');
    if (tabId === 'db-editor') menuButtons[3].classList.add('active');
    
    // Mobile active style
    if (tabId === 'quick-calc') document.getElementById('mob-btn-quick').classList.add('active');
    if (tabId === 'iv-table') document.getElementById('mob-btn-iv').classList.add('active');
    if (tabId === 'oral-calc') document.getElementById('mob-btn-oral').classList.add('active');
    if (tabId === 'db-editor') document.getElementById('mob-btn-db').classList.add('active');

    // Page titles
    const titles = {
        'quick-calc': ['ระบบคำนวณยาสำหรับเด็ก (Small Dose)', 'คำนวณขนาดยาและการเจือจางแบบรายตัว (Quick Calculator)'],
        'iv-table': ['ตารางคำนวณยา IV ทั้งหมด', 'ตารางการเตรียมยาฉีด IV คล้ายรูปแบบ Excel ป้อนปริมาณขนาดยาเพื่อคำนวณอัตโนมัติ'],
        'oral-calc': ['ตารางคำนวณยาน้ำกุมาร', 'คู่มือแนะนำขนาดยาน้ำรับประทานสำหรับเด็กตามเกณฑ์น้ำหนักตัว'],
        'db-editor': ['จัดการฐานข้อมูลยา', 'ตรวจสอบและปรับปรุงเกณฑ์ขนาดยาของโรงพยาบาลโพนทอง']
    };
    
    document.getElementById('page-title').textContent = titles[tabId][0];
    document.getElementById('page-subtitle').textContent = titles[tabId][1];
}

let selectedSuggestionIndex = -1;

// Autocomplete Search logic
function onDrugSearch(query) {
    const suggestionsBox = document.getElementById('drug-suggestions');
    selectedSuggestionIndex = -1; // Reset selection index on search text change
    
    if (!query.trim()) {
        suggestionsBox.style.display = 'none';
        return;
    }
    
    const matches = ivDrugs.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));
    if (matches.length === 0) {
        suggestionsBox.innerHTML = '<div class="dropdown-item">ไม่พบรายการยา</div>';
        suggestionsBox.style.display = 'block';
        return;
    }
    
    suggestionsBox.innerHTML = matches.map((d, i) => `<div class="dropdown-item" id="suggestion-item-${i}" onclick="selectQuickDrug('${escapeHtml(d.name)}')">${escapeHtml(d.name)}</div>`).join('');
    suggestionsBox.style.display = 'block';
}

function onDrugInputKeyDown(e) {
    const suggestionsBox = document.getElementById('drug-suggestions');
    if (!suggestionsBox || suggestionsBox.style.display === 'none') return;
    
    const items = suggestionsBox.querySelectorAll('.dropdown-item');
    if (items.length === 0 || (items.length === 1 && items[0].textContent.includes('ไม่พบรายการยา'))) return;
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedSuggestionIndex++;
        if (selectedSuggestionIndex >= items.length) {
            selectedSuggestionIndex = 0; // Wrap to first
        }
        highlightSuggestion(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedSuggestionIndex--;
        if (selectedSuggestionIndex < 0) {
            selectedSuggestionIndex = items.length - 1; // Wrap to last
        }
        highlightSuggestion(items);
    } else if (e.key === 'Enter') {
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < items.length) {
            e.preventDefault();
            items[selectedSuggestionIndex].click(); // Trigger click/select event
        }
    } else if (e.key === 'Escape') {
        suggestionsBox.style.display = 'none';
        selectedSuggestionIndex = -1;
    }
}

function highlightSuggestion(items) {
    items.forEach((item, index) => {
        if (index === selectedSuggestionIndex) {
            item.classList.add('focused');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('focused');
        }
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function selectQuickDrug(name) {
    selectedQuickDrug = ivDrugs.find(d => d.name === name);
    document.getElementById('quick-drug').value = name;
    document.getElementById('drug-suggestions').style.display = 'none';
    calculateQuickDose();
}

function clearDrugSearch() {
    document.getElementById('quick-drug').value = '';
    document.getElementById('drug-suggestions').style.display = 'none';
    selectedQuickDrug = null;
    resetQuickResultUI();
}

// Reset results display
function resetQuickResultUI() {
    const alertCard = document.getElementById('dose-alert-card');
    alertCard.className = 'card alert-card warning-level-none';
    document.getElementById('dose-alert-title').textContent = "พร้อมคำนวณ";
    document.getElementById('dose-alert-desc').textContent = "กรุณาเลือกรายการยา น้ำหนักตัว และระบุขนาดยาที่แพทย์สั่งด้านซ้าย";
    
    // Hide icons
    alertCard.querySelector('.icon-check').style.display = 'block';
    alertCard.querySelector('.icon-alert').style.display = 'none';
    
    document.getElementById('quick-res-solvent').textContent = '-';
    document.getElementById('quick-res-conc').textContent = '-';
    document.getElementById('quick-res-draw').textContent = '-';
    
    document.getElementById('quick-dil-fluid').textContent = '-';
    document.getElementById('quick-dil-volume').textContent = '-';
    document.getElementById('quick-dil-total').textContent = '-';
    
    document.getElementById('quick-admin-rate').textContent = '-';
    document.getElementById('quick-remarks').textContent = '-';

    document.getElementById('quick-dose-freq').textContent = '-';
    document.getElementById('quick-dose-min').textContent = '-';
    document.getElementById('quick-dose-max').textContent = '-';
    document.getElementById('quick-dose-range-desc').textContent = '-';
}

// Calculate Quick Dose
function calculateQuickDose() {
    if (!selectedQuickDrug) return;
    
    const weight = parseFloat(document.getElementById('quick-weight').value);
    const age = parseFloat(document.getElementById('quick-age').value);
    const orderedDose = parseFloat(document.getElementById('quick-dose').value);
    
    // 1. Fill Reconstitution
    document.getElementById('quick-res-solvent').textContent = selectedQuickDrug.solvent_volume || 'ไม่ต้องละลายผงยา (ยาน้ำสำเร็จรูป)';
    document.getElementById('quick-res-conc').textContent = selectedQuickDrug.conc_text || '-';
    
    let drawVolume = '-';
    if (!isNaN(orderedDose) && selectedQuickDrug.conc_num) {
        drawVolume = orderedDose / selectedQuickDrug.conc_num;
        // round to 2 decimals
        drawVolume = Math.round(drawVolume * 100) / 100;
        document.getElementById('quick-res-draw').textContent = drawVolume + ' ml';
    } else {
        document.getElementById('quick-res-draw').textContent = '-';
    }
    
    // 2. Fill Dilution
    document.getElementById('quick-dil-fluid').textContent = selectedQuickDrug.diluent || 'บริหารโดยไม่ต้องเจือจาง';
    
    let dilVolume = '-';
    let totalVolume = '-';
    
    if (!isNaN(orderedDose) && drawVolume !== '-') {
        const adminConcNum = parseFloat(selectedQuickDrug.admin_conc_num);
        if (!isNaN(adminConcNum) && adminConcNum > 0) {
            totalVolume = orderedDose / adminConcNum;
            totalVolume = Math.round(totalVolume * 100) / 100;
            
            dilVolume = totalVolume - drawVolume;
            dilVolume = Math.round(dilVolume * 100) / 100;
            
            if (dilVolume < 0) {
                dilVolume = 0;
                totalVolume = drawVolume;
            }
            
            document.getElementById('quick-dil-volume').textContent = dilVolume + ' ml';
            document.getElementById('quick-dil-total').textContent = totalVolume + ' ml';
        } else {
            // admin_conc_num is '-' or null
            document.getElementById('quick-dil-volume').textContent = 'เจือจางตามหมายเหตุการพยาบาล';
            document.getElementById('quick-dil-total').textContent = 'เจือจางตามความเหมาะสม';
        }
    } else {
        document.getElementById('quick-dil-volume').textContent = '-';
        document.getElementById('quick-dil-total').textContent = '-';
    }
    
    // 3. Fill rate & Remarks
    document.getElementById('quick-admin-rate').textContent = selectedQuickDrug.admin_rate || '-';
    document.getElementById('quick-remarks').textContent = selectedQuickDrug.remark || '-';
    
    // Fill Dose limits card static data
    document.getElementById('quick-dose-freq').textContent = selectedQuickDrug.frequency || 'ไม่มีระบุความถี่เฉพาะ';
    document.getElementById('quick-dose-range-desc').textContent = selectedQuickDrug.sanford_dose || 'ไม่มีระบุขนาดยากลาง';

    const minDosePerKg = selectedQuickDrug.min_dose_per_kg;
    const maxDosePerKg = selectedQuickDrug.max_dose_per_kg;
    const dividedPerDay = selectedQuickDrug.divided_per_day;

    // Calculate min/max dose if weight is available (even if ordered dose is not entered yet)
    if (!isNaN(weight) && minDosePerKg !== null && dividedPerDay) {
        const minDosePerSingle = (minDosePerKg * weight) / dividedPerDay;
        const maxDosePerSingle = maxDosePerKg !== null ? (maxDosePerKg * weight) / dividedPerDay : minDosePerSingle;
        const minVal = Math.round(minDosePerSingle * 100) / 100;
        const maxVal = Math.round(maxDosePerSingle * 100) / 100;
        
        document.getElementById('quick-dose-min').textContent = minVal + ' mg';
        document.getElementById('quick-dose-max').textContent = maxVal + ' mg';
    } else {
        document.getElementById('quick-dose-min').textContent = '-';
        document.getElementById('quick-dose-max').textContent = '-';
    }
    
    // 4. Dose Check (Sanford Guide Validation)
    const alertCard = document.getElementById('dose-alert-card');
    const alertTitle = document.getElementById('dose-alert-title');
    const alertDesc = document.getElementById('dose-alert-desc');
    const checkIcon = alertCard.querySelector('.icon-check');
    const alertIcon = alertCard.querySelector('.icon-alert');
    
    const isCritical = isHighAlert(selectedQuickDrug.name);
    const badge = isCritical ? `<span class="critical-med-badge">⚠️ ยาความเสี่ยงสูง (High Alert)</span> ` : '';
    
    if (isNaN(weight) || isNaN(orderedDose)) {
        alertCard.className = 'card alert-card warning-level-none';
        alertTitle.innerHTML = badge + "เลือกยาและข้อมูลครบถ้วน";
        alertDesc.textContent = `ขนาดยาที่แนะนำ (Sanford): ${selectedQuickDrug.sanford_dose || 'ไม่มีระบุขนาดยากลางตามน้ำหนักตัว' }`;
        checkIcon.style.display = 'block';
        alertIcon.style.display = 'none';
        return;
    }
    
    if (minDosePerKg !== null && dividedPerDay) {
        const minDosePerSingle = (minDosePerKg * weight) / dividedPerDay;
        const maxDosePerSingle = maxDosePerKg !== null ? (maxDosePerKg * weight) / dividedPerDay : minDosePerSingle;
        
        const minVal = Math.round(minDosePerSingle * 100) / 100;
        const maxVal = Math.round(maxDosePerSingle * 100) / 100;
        
        if (orderedDose < minVal - 0.1) {
            // Low dose
            alertCard.className = 'card alert-card warning-level-low';
            alertTitle.innerHTML = badge + `ขนาดยาต่ำกว่าเกณฑ์ความปลอดภัย (เกณฑ์แนะนำต่อครั้ง: ${minVal} - ${maxVal} mg)`;
            alertDesc.textContent = `ขนาดยาตามเกณฑ์ผู้ป่วยน้ำหนัก ${weight} kg คือ ${minVal} ถึง ${maxVal} mg/dose. ขนาดยาสั่งใช้จริงคือ ${orderedDose} mg.`;
            checkIcon.style.display = 'none';
            alertIcon.style.display = 'block';
        } else if (orderedDose > maxVal + 0.1) {
            // High dose
            alertCard.className = 'card alert-card warning-level-high';
            alertTitle.innerHTML = badge + `คำเตือน: ขนาดยาสูงเกินเกณฑ์ความปลอดภัยสูงสุด (เกณฑ์แนะนำต่อครั้ง: ${minVal} - ${maxVal} mg)`;
            alertDesc.textContent = `ขนาดยาตามเกณฑ์ผู้ป่วยน้ำหนัก ${weight} kg ไม่ควรเกิน ${maxVal} mg/dose. ขนาดยาสั่งใช้จริงคือ ${orderedDose} mg.`;
            checkIcon.style.display = 'none';
            alertIcon.style.display = 'block';
        } else {
            // Safe dose
            alertCard.className = 'card alert-card warning-level-safe';
            alertTitle.innerHTML = badge + "ขนาดยาอยู่ในเกณฑ์ที่ปลอดภัย";
            alertDesc.textContent = `ขนาดยาสำหรับน้ำหนัก ${weight} kg แนะนำคือ ${minVal} - ${maxVal} mg/dose. ขนาดยาสั่งใช้คือ ${orderedDose} mg (ถูกต้อง)`;
            checkIcon.style.display = 'block';
            alertIcon.style.display = 'none';
        }
    } else {
        // No quantitative range
        alertCard.className = 'card alert-card warning-level-none';
        alertTitle.innerHTML = badge + "ตรวจสอบขนาดยากลาง";
        alertDesc.textContent = `ขนาดยาที่แนะนำ: ${selectedQuickDrug.sanford_dose || 'ไม่มีระบุขนาดยากลาง สามารถบริหารยาได้ตามขนาดยาแพทย์สั่ง' }`;
        checkIcon.style.display = 'block';
        alertIcon.style.display = 'none';
    }
}

function isHighAlert(name) {
    if (!name) return false;
    const list = ["adrenaline", "calcium gluconate", "digoxin", "potassium chloride", "phenobarbital", "phenytoin", "amiodarone", "magnesium sulfate"];
    const ln = name.toLowerCase();
    return list.some(k => ln.includes(k));
}

// Copy summary to clipboard with button animation
function copyCalculationSummary() {
    if (!selectedQuickDrug) {
        showNotification("กรุณาเลือกรายการยาก่อนกดคัดลอก", "warning");
        return;
    }
    
    const weight = document.getElementById('quick-weight').value;
    const orderedDose = document.getElementById('quick-dose').value;
    const drawVol = document.getElementById('quick-res-draw').textContent;
    const dilFluid = document.getElementById('quick-dil-fluid').textContent;
    const dilVol = document.getElementById('quick-dil-volume').textContent;
    const totalVol = document.getElementById('quick-dil-total').textContent;
    const dripRate = document.getElementById('quick-admin-rate').textContent;
    const remark = document.getElementById('quick-remarks').textContent;
    
    if (!orderedDose || drawVol === '-') {
        showNotification("ข้อมูลคำนวณไม่ครบถ้วน กรุณากรอกขนาดยาเพื่อคำนวณก่อน", "warning");
        return;
    }
    
    const isCritical = isHighAlert(selectedQuickDrug.name);
    
    let text = `=== บันทึกเตรียมยาผู้ป่วยเด็ก (Small Dose) รพ.โพนทอง ===\n`;
    text += `รายการยา: ${selectedQuickDrug.name}${isCritical ? ' (⚠️ ยาความเสี่ยงสูง - High Alert)' : ''}\n`;
    if (weight) text += `น้ำหนักผู้ป่วย: ${weight} kg\n`;
    text += `ขนาดยาแพทย์สั่ง: ${orderedDose} mg\n\n`;
    text += `[1. การละลายผงยา (Reconstitution)]\n`;
    text += `- ใช้ตัวทำละลาย: ${selectedQuickDrug.solvent_volume || '-'}\n`;
    text += `- ปริมาตรยาที่ดูดมาใช้: ${drawVol}\n\n`;
    text += `[2. การเจือจางก่อนฉีด (Dilution)]\n`;
    text += `- เจือจางในสารน้ำ: ${dilFluid}\n`;
    text += `- เติมสารน้ำปริมาตร: ${dilVol}\n`;
    text += `- ปริมาตรรวมสารน้ำหลังเจือจาง: ${totalVol}\n\n`;
    text += `[3. การบริหารยา (Administration)]\n`;
    text += `- ความเร็ว/เวลา Drip: ${dripRate}\n`;
    if (remark && remark !== '-') text += `- หมายเหตุ: ${remark}\n`;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification("คัดลอกรายละเอียดข้อมูลเตรียมยาไปยัง Clipboard สำเร็จ", "success");
    }).catch(err => {
        showNotification("การคัดลอกล้มเหลว กรุณาลองคัดลอกด้วยตนเอง", "danger");
    });
}

// Render IV Batch Table (Tab 2)
function renderIVBatchTable() {
    const tbody = document.getElementById('iv-table-body');
    tbody.innerHTML = '';
    
    ivDrugs.forEach((d, index) => {
        const tr = document.createElement('tr');
        tr.id = `iv-row-${index}`;
        tr.innerHTML = `
            <td><strong>${escapeHtml(d.name)}</strong></td>
            <td>${d.solvent_volume || '-'}</td>
            <td>${d.conc_text || '-'}</td>
            <td>${d.diluent || '-'}</td>
            <td><input type="number" id="iv-input-${index}" placeholder="mg" min="0" step="0.1" oninput="calculateIVTableRow(${index})"></td>
            <td id="iv-draw-${index}">-</td>
            <td id="iv-dil-${index}">-</td>
            <td id="iv-total-${index}">-</td>
            <td><small>${d.admin_rate || '-'}<br><span class="warning-text">${d.remark || ''}</span></small></td>
        `;
        tbody.appendChild(tr);
    });
}

function calculateIVTableRow(index) {
    const d = ivDrugs[index];
    const val = parseFloat(document.getElementById(`iv-input-${index}`).value);
    
    const drawTd = document.getElementById(`iv-draw-${index}`);
    const dilTd = document.getElementById(`iv-dil-${index}`);
    const totalTd = document.getElementById(`iv-total-${index}`);
    
    if (isNaN(val) || val <= 0) {
        drawTd.textContent = '-';
        dilTd.textContent = '-';
        totalTd.textContent = '-';
        return;
    }
    
    // Draw volume
    let drawVol = val / d.conc_num;
    drawVol = Math.round(drawVol * 100) / 100;
    drawTd.textContent = drawVol + ' ml';
    
    // Diluent Volume
    const adminConcNum = parseFloat(d.admin_conc_num);
    if (!isNaN(adminConcNum) && adminConcNum > 0) {
        let totalVol = val / adminConcNum;
        totalVol = Math.round(totalVol * 100) / 100;
        
        let dilVol = totalVol - drawVol;
        dilVol = Math.round(dilVol * 100) / 100;
        
        if (dilVol < 0) {
            dilVol = 0;
            totalVol = drawVol;
        }
        
        dilTd.textContent = dilVol + ' ml';
        totalTd.textContent = totalVol + ' ml';
    } else {
        dilTd.textContent = 'ตามหมายเหตุ';
        totalTd.textContent = 'ตามหมายเหตุ';
    }
}

// Filter IV table search
function filterIVTable(query) {
    ivDrugs.forEach((d, index) => {
        const row = document.getElementById(`iv-row-${index}`);
        if (d.name.toLowerCase().includes(query.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Render Oral Table (Tab 3)
function renderOralTable() {
    const tbody = document.getElementById('oral-table-body');
    tbody.innerHTML = '';
    
    oralDrugs.forEach((d, index) => {
        const tr = document.createElement('tr');
        tr.id = `oral-row-${index}`;
        tr.innerHTML = `
            <td><strong>${escapeHtml(d.name)}</strong></td>
            <td>${d.concentration} mg/ml</td>
            <td id="oral-std-${index}" class="font-large">-</td>
            <td id="oral-high-${index}" class="font-large">-</td>
            <td><small>Std: ${d.sanford_std_dose || '-'}<br>High: ${d.sanford_high_dose || '-'}</small></td>
            <td><small>${d.micromedex_std_dose || '-'}<br><span class="warning-text">${d.age_limit || ''}</span></small></td>
        `;
        tbody.appendChild(tr);
    });
}

// Calculate Oral Syrup Dose
function calculateOralDoses(weightVal) {
    const weight = parseFloat(weightVal);
    
    oralDrugs.forEach((d, index) => {
        const stdTd = document.getElementById(`oral-std-${index}`);
        const highTd = document.getElementById(`oral-high-${index}`);
        
        if (isNaN(weight) || weight <= 0) {
            stdTd.textContent = '-';
            highTd.textContent = '-';
            return;
        }
        
        const conc = parseFloat(d.concentration);
        if (isNaN(conc)) {
            // Some drug concentration might be a text (e.g. Co-Amoxiclav amoxy content)
            stdTd.textContent = 'ดูความเข้มข้นสารออกฤทธิ์';
            highTd.textContent = 'ดูความเข้มข้นสารออกฤทธิ์';
            return;
        }
        
        // Let's parse Sanford std dose
        // Examples: "25-50 mg/kg/day divied q 8 hr" or "10-15 mg/kg/dose"
        let stdDoseRange = parseDoseRange(d.sanford_std_dose, weight, conc);
        let highDoseRange = parseDoseRange(d.sanford_high_dose, weight, conc);
        
        // Fallback to micromedex std/high if sanford is null
        if (!stdDoseRange) {
            stdDoseRange = parseDoseRange(d.ministry_dose, weight, conc);
        }
        
        stdTd.textContent = stdDoseRange ? stdDoseRange + ' ml' : 'อ้างอิงตารางเกณฑ์';
        highTd.textContent = highDoseRange ? highDoseRange + ' ml' : '-';
    });
}

// Helper function to extract numerical dose and calculate volume in ml
function parseDoseRange(doseText, weight, concentration) {
    if (!doseText) return null;
    
    // Look for numbers like "25-50 mg/kg/day" or "10-15 mg/kg/dose"
    const matchKgDay = doseText.match(/(\d+(\.\d+)?)-(\d+(\.\d+)?)\s*mg\/kg\/day/i);
    const matchSingleKgDay = doseText.match(/(\d+(\.\d+)?)\s*mg\/kg\/day/i);
    const matchKgDose = doseText.match(/(\d+(\.\d+)?)-(\d+(\.\d+)?)\s*mg\/kg\/dose/i);
    const matchSingleKgDose = doseText.match(/(\d+(\.\d+)?)\s*mg\/kg\/dose/i);
    
    let isDivided = doseText.toLowerCase().includes('divied') || doseText.toLowerCase().includes('divided') || doseText.toLowerCase().includes('q 8') || doseText.toLowerCase().includes('q 6') || doseText.toLowerCase().includes('q 12');
    let divisions = 1;
    if (isDivided) {
        if (doseText.includes('q 8') || doseText.includes('divied q 8') || doseText.includes('divided q 8') || doseText.includes('3 times')) divisions = 3;
        else if (doseText.includes('q 6') || doseText.includes('divied q 6') || doseText.includes('divided q 6') || doseText.includes('4 times')) divisions = 4;
        else if (doseText.includes('q 12') || doseText.includes('divied q 12') || doseText.includes('divided q 12') || doseText.includes('2 times')) divisions = 2;
    }
    
    if (matchKgDay) {
        const minVal = parseFloat(matchKgDay[1]);
        const maxVal = parseFloat(matchKgDay[3]);
        
        const minMl = (minVal * weight / divisions) / concentration;
        const maxMl = (maxVal * weight / divisions) / concentration;
        
        return `${Math.round(minMl * 100) / 100} - ${Math.round(maxMl * 100) / 100}`;
    } else if (matchSingleKgDay) {
        const val = parseFloat(matchSingleKgDay[1]);
        const ml = (val * weight / divisions) / concentration;
        return `${Math.round(ml * 100) / 100}`;
    } else if (matchKgDose) {
        const minVal = parseFloat(matchKgDose[1]);
        const maxVal = parseFloat(matchKgDose[3]);
        
        const minMl = (minVal * weight) / concentration;
        const maxMl = (maxVal * weight) / concentration;
        
        return `${Math.round(minMl * 100) / 100} - ${Math.round(maxMl * 100) / 100}`;
    } else if (matchSingleKgDose) {
        const val = parseFloat(matchSingleKgDose[1]);
        const ml = (val * weight) / concentration;
        return `${Math.round(ml * 100) / 100}`;
    }
    
    return null;
}

// Database Editor & Settings (Tab 4)
function switchDbTab(tab) {
    activeDbTab = tab;
    document.querySelectorAll('.db-tab-btn').forEach(btn => btn.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.db-tab-btn');
    if (tab === 'iv') buttons[0].classList.add('active');
    else buttons[1].classList.add('active');
    
    renderEditorTable();
}

function renderEditorTable() {
    const thead = document.getElementById('editor-table-head');
    const tbody = document.getElementById('editor-table-body');
    
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    if (activeDbTab === 'iv') {
        thead.innerHTML = `
            <tr>
                <th>ชื่อยา</th>
                <th>ละลายผงยา (ml)</th>
                <th>Conc (mg/ml)</th>
                <th>ตัวเจือจาง</th>
                <th>Min Conc (mg/ml)</th>
                <th>Min Dose (mg/kg)</th>
                <th>Max Dose (mg/kg)</th>
                <th>ความถี่ / Drip</th>
                <th>เครื่องมือ</th>
            </tr>
        `;
        
        ivDrugs.forEach((d, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${escapeHtml(d.name)}</strong></td>
                <td>${d.solvent_volume || '-'}</td>
                <td>${d.conc_num || '-'}</td>
                <td>${d.diluent || '-'}</td>
                <td>${d.admin_conc_num || '-'}</td>
                <td>${d.min_dose_per_kg || '-'}</td>
                <td>${d.max_dose_per_kg || '-'}</td>
                <td><small>${d.frequency || '-'}<br>${d.admin_rate || '-'}</small></td>
                <td>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="openEditDrugModal('iv', ${index})">แก้ไข</button>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; color: #ef4444; border-color: #fca5a5;" onclick="deleteDrug('iv', ${index})">ลบ</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } else {
        thead.innerHTML = `
            <tr>
                <th>ชื่อยาน้ำ</th>
                <th>ความเข้มข้น (mg/ml)</th>
                <th>Std Dose (Sanford)</th>
                <th>High Dose (Sanford)</th>
                <th>Micromedex Reference</th>
                <th>กระทรวง</th>
                <th>เครื่องมือ</th>
            </tr>
        `;
        
        oralDrugs.forEach((d, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${escapeHtml(d.name)}</strong></td>
                <td>${d.concentration || '-'}</td>
                <td>${d.sanford_std_dose || '-'}</td>
                <td>${d.sanford_high_dose || '-'}</td>
                <td><small>${d.micromedex_std_dose || '-'}</small></td>
                <td>${d.ministry_dose || '-'}</td>
                <td>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;" onclick="openEditDrugModal('oral', ${index})">แก้ไข</button>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; color: #ef4444; border-color: #fca5a5;" onclick="deleteDrug('oral', ${index})">ลบ</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Open Edit Drug Dialog
function openEditDrugModal(type, index) {
    document.getElementById('edit-drug-type').value = type;
    document.getElementById('edit-drug-index').value = index;
    
    const ivFields = document.getElementById('iv-form-fields');
    const oralFields = document.getElementById('oral-form-fields');
    
    if (type === 'iv') {
        ivFields.style.display = 'block';
        oralFields.style.display = 'none';
        
        const d = ivDrugs[index];
        document.getElementById('modal-title').textContent = "แก้ไขยาฉีด IV";
        document.getElementById('edit-name').value = d.name;
        document.getElementById('edit-solvent').value = d.solvent_volume || '';
        document.getElementById('edit-conc-num').value = d.conc_num || '';
        document.getElementById('edit-diluent').value = d.diluent || '';
        document.getElementById('edit-admin-conc-num').value = d.admin_conc_num || '';
        document.getElementById('edit-admin-rate').value = d.admin_rate || '';
        document.getElementById('edit-sanford-dose').value = d.sanford_dose || '';
        document.getElementById('edit-min-dose-per-kg').value = d.min_dose_per_kg || '';
        document.getElementById('edit-max-dose-per-kg').value = d.max_dose_per_kg || '';
        document.getElementById('edit-divided-per-day').value = d.divided_per_day || '';
        document.getElementById('edit-frequency').value = d.frequency || '';
        document.getElementById('edit-remarks').value = d.remark || '';
    } else {
        ivFields.style.display = 'none';
        oralFields.style.display = 'block';
        
        const d = oralDrugs[index];
        document.getElementById('modal-title').textContent = "แก้ไขยาน้ำกุมาร";
        document.getElementById('edit-name').value = d.name;
        document.getElementById('edit-oral-conc').value = d.concentration || '';
        document.getElementById('edit-oral-sanford-std').value = d.sanford_std_dose || '';
        document.getElementById('edit-oral-sanford-high').value = d.sanford_high_dose || '';
        document.getElementById('edit-oral-micromedex-std').value = d.micromedex_std_dose || '';
        document.getElementById('edit-oral-ministry').value = d.ministry_dose || '';
    }
    
    document.getElementById('drug-modal').classList.add('active');
}

function openAddDrugModal() {
    document.getElementById('edit-drug-type').value = activeDbTab;
    document.getElementById('edit-drug-index').value = "-1"; // indicates new drug
    
    document.getElementById('drug-editor-form').reset();
    
    const ivFields = document.getElementById('iv-form-fields');
    const oralFields = document.getElementById('oral-form-fields');
    
    if (activeDbTab === 'iv') {
        ivFields.style.display = 'block';
        oralFields.style.display = 'none';
        document.getElementById('modal-title').textContent = "เพิ่มยาฉีด IV ตัวใหม่";
    } else {
        ivFields.style.display = 'none';
        oralFields.style.display = 'block';
        document.getElementById('modal-title').textContent = "เพิ่มยาน้ำกุมารตัวใหม่";
    }
    
    document.getElementById('drug-modal').classList.add('active');
}

function closeDrugModal() {
    document.getElementById('drug-modal').classList.remove('active');
}

// Save edit/add drug form
function saveDrugForm(event) {
    event.preventDefault();
    
    const type = document.getElementById('edit-drug-type').value;
    const index = parseInt(document.getElementById('edit-drug-index').value);
    
    const name = document.getElementById('edit-name').value;
    
    if (type === 'iv') {
        const drugObj = {
            name: name,
            solvent_volume: document.getElementById('edit-solvent').value,
            total_volume: document.getElementById('edit-solvent').value ? document.getElementById('edit-solvent').value : '-',
            conc_text: document.getElementById('edit-conc-num').value + ' mg/ml',
            conc_num: parseFloat(document.getElementById('edit-conc-num').value),
            diluent: document.getElementById('edit-diluent').value,
            admin_conc_text: document.getElementById('edit-admin-conc-num').value + ' mg/ml',
            admin_conc_num: parseFloat(document.getElementById('edit-admin-conc-num').value) || document.getElementById('edit-admin-conc-num').value,
            admin_rate: document.getElementById('edit-admin-rate').value,
            remark: document.getElementById('edit-remarks').value,
            sanford_dose: document.getElementById('edit-sanford-dose').value,
            min_dose_per_kg: parseFloat(document.getElementById('edit-min-dose-per-kg').value) || null,
            max_dose_per_kg: parseFloat(document.getElementById('edit-max-dose-per-kg').value) || null,
            divided_per_day: parseFloat(document.getElementById('edit-divided-per-day').value) || null,
            frequency: document.getElementById('edit-frequency').value,
            age_limit: null
        };
        
        if (index === -1) {
            ivDrugs.push(drugObj);
            showNotification(`เพิ่มยา IV ${name} สำเร็จ`, "success");
        } else {
            ivDrugs[index] = drugObj;
            showNotification(`แก้ไขยา IV ${name} สำเร็จ`, "success");
        }
    } else {
        const drugObj = {
            name: name,
            concentration: parseFloat(document.getElementById('edit-oral-conc').value) || document.getElementById('edit-oral-conc').value,
            sanford_std_dose: document.getElementById('edit-oral-sanford-std').value,
            sanford_high_dose: document.getElementById('edit-oral-sanford-high').value,
            sanford_max_dose: null,
            micromedex_std_dose: document.getElementById('edit-oral-micromedex-std').value,
            micromedex_high_dose: null,
            micromedex_max_dose: null,
            ministry_dose: document.getElementById('edit-oral-ministry').value,
            age_limit: null
        };
        
        if (index === -1) {
            oralDrugs.push(drugObj);
            showNotification(`เพิ่มยาน้ำ ${name} สำเร็จ`, "success");
        } else {
            oralDrugs[index] = drugObj;
            showNotification(`แก้ไขยาน้ำ ${name} สำเร็จ`, "success");
        }
    }
    
    // Save to localStorage
    localStorage.setItem('smalldose_iv_drugs', JSON.stringify(ivDrugs));
    localStorage.setItem('smalldose_oral_drugs', JSON.stringify(oralDrugs));
    
    // Update DB status badge
    document.getElementById('db-status-text').textContent = "ใช้ฐานข้อมูลแก้ไขได้ (Local)";
    document.getElementById('db-status').querySelector('.status-dot').className = 'status-dot warning';
    
    closeDrugModal();
    renderIVBatchTable();
    renderOralTable();
    renderEditorTable();
    
    // Reset autocomplete if current selected drug was updated
    if (selectedQuickDrug && selectedQuickDrug.name === name) {
        selectedQuickDrug = type === 'iv' ? ivDrugs.find(d => d.name === name) : null;
        calculateQuickDose();
    }
}

// Delete drug from Database
function deleteDrug(type, index) {
    const name = type === 'iv' ? ivDrugs[index].name : oralDrugs[index].name;
    if (!confirm(`คุณต้องการลบรายการยา "${name}" ใช่หรือไม่?`)) return;
    
    if (type === 'iv') {
        ivDrugs.splice(index, 1);
    } else {
        oralDrugs.splice(index, 1);
    }
    
    localStorage.setItem('smalldose_iv_drugs', JSON.stringify(ivDrugs));
    localStorage.setItem('smalldose_oral_drugs', JSON.stringify(oralDrugs));
    
    showNotification(`ลบยา ${name} สำเร็จ`, "success");
    
    renderIVBatchTable();
    renderOralTable();
    renderEditorTable();
}

// Reset database back to default
function resetDatabaseToDefault() {
    if (!confirm("คุณต้องการล้างข้อมูลยาทั้งหมดที่แก้ไข และกลับไปใช้ฐานข้อมูลเริ่มต้นของโรงพยาบาลใช่หรือไม่?")) return;
    
    localStorage.removeItem('smalldose_iv_drugs');
    localStorage.removeItem('smalldose_oral_drugs');
    
    showNotification("กำลังโหลดข้อมูลเริ่มต้นของโรงพยาบาล...", "info");
    initDatabase();
}

// Backup export JSON
function exportDatabaseJSON() {
    const backupObj = {
        version: "1.0",
        hospital: "รพ.โพนทอง",
        ivDrugs: ivDrugs,
        oralDrugs: oralDrugs,
        exportedAt: new Date().toISOString()
    };
    
    const str = JSON.stringify(backupObj, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(str);
    
    const exportFileDefaultName = 'smalldose_database_backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification("ส่งออกฐานข้อมูลยาไปที่ดาวน์โหลดสำเร็จ", "success");
}

// Restore import JSON
function importDatabaseJSON(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const imported = JSON.parse(event.target.result);
            if (imported.ivDrugs && imported.oralDrugs) {
                ivDrugs = imported.ivDrugs;
                oralDrugs = imported.oralDrugs;
                
                localStorage.setItem('smalldose_iv_drugs', JSON.stringify(ivDrugs));
                localStorage.setItem('smalldose_oral_drugs', JSON.stringify(oralDrugs));
                
                document.getElementById('db-status-text').textContent = "ใช้ฐานข้อมูลแก้ไขได้ (Local)";
                document.getElementById('db-status').querySelector('.status-dot').className = 'status-dot warning';
                
                renderIVBatchTable();
                renderOralTable();
                renderEditorTable();
                showNotification("นำเข้าและปรับใช้ฐานข้อมูลใหม่สำเร็จ", "success");
            } else {
                throw new Error("Invalid structure missing drugs array");
            }
        } catch (e) {
            showNotification("นำเข้าข้อมูลล้มเหลว: ไฟล์ JSON ไม่ถูกต้องตามรูปแบบ", "danger");
        }
    };
    reader.readAsText(file);
}

// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('smalldose_dark_mode', isDark);
    
    // Toggle icon
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const label = document.getElementById('dark-mode-label');
    
    if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        label.textContent = "โหมดกลางวัน";
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        label.textContent = "โหมดกลางคืน";
    }
}

// Initialize Dark mode state
function initDarkMode() {
    const localDark = localStorage.getItem('smalldose_dark_mode');
    const isDark = localDark === 'true';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.querySelector('.sun-icon').style.display = 'none';
        document.querySelector('.moon-icon').style.display = 'block';
        document.getElementById('dark-mode-label').textContent = "โหมดกลางวัน";
    }
}

// Close suggestions dropdown when clicking outside
document.addEventListener('click', function(e) {
    const searchWrapper = document.querySelector('.dropdown-container');
    const suggestionsBox = document.getElementById('drug-suggestions');
    
    if (searchWrapper && !searchWrapper.contains(e.target) && suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }
});

// Document Load Init
window.onload = function() {
    initDatabase();
    initDarkMode();
};
