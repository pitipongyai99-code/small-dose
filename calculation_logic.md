# เอกสารอธิบายโลจิกการคำนวณ (Calculation Logic Guide)
## ระบบคำนวณยาสำหรับเด็ก (Small Dose Calculator) - รพ.โพนทอง

เอกสารฉบับนี้จัดทำขึ้นเพื่ออธิบายหลักการ ตัวแปร และสูตรการคำนวณที่ใช้ในระบบ **Small Dose Calculator** เพื่อให้ทีมพัฒนาในโปรเจกต์อื่นสามารถทำความเข้าใจและนำไปปรับใช้ต่อได้ง่าย

---

## 1. โครงสร้างข้อมูลยา (Data Model)

ข้อมูลยาในระบบแบ่งออกเป็น 2 ประเภทหลัก โดยดึงข้อมูลมาจากไฟล์ CSV:

### 1.1 ยาฉีด (IV Drugs)
*จากไฟล์ `รายชื่อยา Small doseรพ.โพนทอง - ข้อมูลยา ห้ามแก้ไข.csv`*

| ฟิลด์ (Field) | คำอธิบาย |
| :--- | :--- |
| `name` | ชื่อตัวยา |
| `solvent_volume` | ปริมาตรสารน้ำที่ใช้ละลายผงยา (ml) |
| `total_volume` | ปริมาตรรวมหลังผสม (ml) |
| `conc_text` | ข้อความแสดงความเข้มข้นหลังผสมเสร็จ |
| `conc_num` | ค่าความเข้มข้นตัวเลขจริง (mg/ml) |
| `diluent` | สารน้ำที่ใช้เจือจางก่อนฉีด (เช่น NSS, D5W) |
| `admin_conc_text` | ข้อความแสดงความเข้มข้นที่แนะนำในการบริหารยา |
| `admin_conc_num` | ค่าความเข้มข้นสูงสุดที่แนะนำสำหรับการบริหารยา (mg/ml) |
| `admin_rate` | อัตราความเร็วในการให้ยา (Drip Rate) |
| `remark` | หมายเหตุการพยาบาลและการบริหารยา |
| `sanford_dose` | ขนาดยาแนะนำตามเกณฑ์ Sanford (ข้อความอ้างอิง) |
| `min_dose_per_kg` | ขนาดยาขั้นต่ำ (mg/kg/day) |
| `max_dose_per_kg` | ขนาดยาสูงสุด (mg/kg/day) |
| `divided_per_day` | จำนวนครั้งที่ต้องแบ่งให้ต่อวัน (ครั้ง/วัน) |
| `frequency` | ความถี่ในการให้ยา (เช่น q 12 hr, q 8 hr) |
| `age_limit` | ข้อห้ามหรือคำเตือนเรื่องอายุผู้ป่วย |

### 1.2 ยาน้ำ (Oral Suspension)
*จากไฟล์ `รายชื่อยา Small doseรพ.โพนทอง - ข้อมูลยาน้ำ ห้ามแก้ไข.csv`*

| ฟิลด์ (Field) | คำอธิบาย |
| :--- | :--- |
| `name` | ชื่อตัวยา |
| `concentration` | ความเข้มข้นของยาน้ำ (mg/ml) |
| `sanford_std_dose` | ข้อความแสดงเกณฑ์ขนาดยามาตรฐาน (Standard Dose) |
| `sanford_high_dose` | ข้อความแสดงเกณฑ์ขนาดยาสูงสุด (High Dose) |
| `sanford_max_dose` | ขนาดยาสูงสุดต่อวัน (Max Daily Dose) |
| `micromedex_std_dose`| เกณฑ์อ้างอิงจาก Micromedex |
| `ministry_dose` | เกณฑ์อ้างอิงจากกระทรวงสาธารณสุข (ใช้เป็นค่าทดแทนหากไม่มีเกณฑ์อื่น) |
| `age_limit` | ข้อควรระวังเรื่องอายุ |

---

## 2. โลจิกการคำนวณยาฉีด (IV Drug Calculations)

ใช้สำหรับการคำนวณปริมาตรยาและปริมาตรสารน้ำที่ต้องใช้ในการผสมยาฉีดรายตัว (Quick Calc) และตารางคำนวณรวม (IV Table Sheet)

### 2.1 ปริมาตรยาที่ต้องดูดออกมา (Draw Volume)
เป็นปริมาตรของสารละลายยาตั้งต้น (หลังจากละลายผงยาเสร็จแล้ว) ที่ต้องดูดออกมาจากขวด/Ampule เพื่อให้ได้ขนาดมิลลิกรัม (mg) ตามที่แพทย์สั่ง

$$\text{Draw Volume (ml)} = \frac{\text{ขนาดยาที่แพทย์สั่ง (Ordered Dose in mg)}}{\text{ความเข้มข้นของยาหลังผสม (conc\_num in mg/ml)}}$$

*การเก็บผลลัพธ์: ปัดทศนิยมให้เหลือ 2 ตำแหน่ง (`Math.round(val * 100) / 100`)*

### 2.2 ปริมาตรสารน้ำเจือจาง และปริมาตรรวม (Dilution & Total Volume)
ใช้หาว่าต้องเติมสารน้ำเพื่อเจือจางยาอีกเท่าใด เพื่อให้อยู่ในความเข้มข้นที่เหมาะสมและปลอดภัยในการส่งเข้าสู่ร่างกายผู้ป่วย

1. **คำนวณปริมาตรรวม (Total Volume)** หลังเจือจาง โดยใช้เกณฑ์ความเข้มข้นควบคุมสำหรับการบริหารยา (`admin_conc_num`):
   
   $$\text{Total Volume (ml)} = \frac{\text{ขนาดยาที่แพทย์สั่ง (Ordered Dose in mg)}}{\text{ความเข้มข้นบริหารที่แนะนำ (admin\_conc\_num in mg/ml)}}$$

2. **คำนวณปริมาตรสารน้ำเจือจางที่จะต้องเติม (Diluent Volume)**:
   
   $$\text{Diluent Volume (ml)} = \text{Total Volume (ml)} - \text{Draw Volume (ml)}$$

#### ⚠️ เงื่อนไขพิเศษ (Edge Cases):
* **กรณีความเข้มข้นเกินเกณฑ์ตั้งแต่เริ่มต้น (Diluent Volume < 0):** 
  หากปริมาตรยาทีต้องดูดออกมา (`Draw Volume`) มีค่ามากกว่า `Total Volume` (เช่น ยามีความเข้มข้นต่ำมากอยู่แล้ว) จะไม่มีการเจือจางเพิ่มเติม:
  - กำหนดให้ $\text{Diluent Volume} = 0 \text{ ml}$
  - กำหนดให้ $\text{Total Volume} = \text{Draw Volume}$
* **กรณีไม่จำกัดความเข้มข้นเจือจาง (ไม่มีค่า `admin_conc_num` หรือระบุเป็น `-`):**
  - กำหนดให้ช่อง ปริมาตรสารน้ำเจือจาง แสดงข้อความ: `"เจือจางตามหมายเหตุการพยาบาล"`
  - กำหนดให้ช่อง ปริมาตรรวม แสดงข้อความ: `"เจือจางตามความเหมาะสม"`

---

## 3. โลจิกการตรวจสอบขนาดยาอ้างอิงรายครั้งสำหรับเด็ก (Sanford Dose Guide Validation)

ใช้เพื่อตรวจสอบว่า ขนาดยาที่แพทย์สั่งใช้จริง (Ordered Dose) อยู่ในช่วงที่ปลอดภัยตามเกณฑ์น้ำหนักตัวของผู้ป่วยหรือไม่

### 3.1 คำนวณขนาดยาปลอดภัยขั้นต่ำและสูงสุด (Min/Max Single Dose)
คำนวณขนาดยาที่เหมาะสมต่อครั้ง (mg/dose) จากน้ำหนักของผู้ป่วย (kg) และขนาดยาอ้างอิงต่อวัน (mg/kg/day):

$$\text{Min Dose Per Single (mg)} = \frac{\text{min\_dose\_per\_kg (mg/kg/day)} \times \text{น้ำหนักผู้ป่วย (Weight in kg)}}{\text{จำนวนครั้งที่แบ่งให้ต่อวัน (divided\_per\_day)}}$$

$$\text{Max Dose Per Single (mg)} = \frac{\text{max\_dose\_per\_kg (mg/kg/day)} \times \text{น้ำหนักผู้ป่วย (Weight in kg)}}{\text{จำนวนครั้งที่แบ่งให้ต่อวัน (divided\_per\_day)}}$$

*หมายเหตุ: หากไม่มีเกณฑ์สูงสุด (`max_dose_per_kg` เป็น null) ให้กำหนดให้ $\text{Max Dose Per Single} = \text{Min Dose Per Single}$*

### 3.2 ระดับการแจ้งเตือนความปลอดภัย (Dose Check Alert States)
เปรียบเทียบขนาดยาสั่งใช้จริง (`Ordered Dose`) กับช่วงปลอดภัยที่คำนวณได้ (`[Min Dose Per Single, Max Dose Per Single]`) โดยยอมรับความคลาดเคลื่อนเบี่ยงเบนได้ $\pm 0.1 \text{ mg}$:

* **กรณี ขนาดยาต่ำกว่าเกณฑ์อ้างอิง (Warning Low Dose):**
  $$\text{Ordered Dose} < \text{Min Dose Per Single} - 0.1$$
  *ระบบจะแสดงเตือนสีส้มอ่อน/เหลือง: "ขนาดยาต่ำกว่าเกณฑ์ความปลอดภัย"*
* **กรณี ขนาดยาสูงเกินเกณฑ์อ้างอิงสูงสุด (Warning High Dose):**
  $$\text{Ordered Dose} > \text{Max Dose Per Single} + 0.1$$
  *ระบบจะแสดงเตือนสีแดง: "คำเตือน: ขนาดยาสูงเกินเกณฑ์ความปลอดภัยสูงสุด"*
* **กรณี ขนาดยาอยู่ในเกณฑ์ปลอดภัย (Safe Dose):**
  $$\text{Min Dose Per Single} - 0.1 \le \text{Ordered Dose} \le \text{Max Dose Per Single} + 0.1$$
  *ระบบจะแสดงสัญลักษณ์ติ๊กถูกสีเขียว: "ขนาดยาอยู่ในเกณฑ์ที่ปลอดภัย"*

---

## 4. โลจิกการคำนวณยาน้ำสำหรับเด็ก (Oral Suspension Calculations)

ยาน้ำสำหรับเด็กจะใช้วิธีคำนวณปริมาตรต่อครั้งเป็น **มิลลิลิตร (ml)** เพื่อให้ผู้ปกครองหรือพยาบาลตวงยาได้ง่าย โดยระบบจะสแกนและแปลงข้อความเกณฑ์ขนาดยาที่เป็นตัวอักษรให้ออกมาเป็นค่าช่วงตัวเลขโดยอัตโนมัติ

### 4.1 การหาความถี่/การแบ่งมื้อยา (Parsing Divisions)
ระบบจะอ่านข้อความอ้างอิง (`doseText`) เช่น `"25-50 mg/kg/day divided q 8 hr"` และค้นหาคีย์เวิร์ดเพื่อกำหนดตัวหาร (`divisions`) สำหรับคำนวณปริมาตรต่อครั้ง ดังนี้:

| คีย์เวิร์ดที่พบในข้อความ | จำนวนครั้งที่แบ่ง (`divisions`) |
| :--- | :---: |
| `"q 8"`, `"divied q 8"`, `"divided q 8"`, `"3 times"` | **3** |
| `"q 6"`, `"divied q 6"`, `"divided q 6"`, `"4 times"` | **4** |
| `"q 12"`, `"divied q 12"`, `"divided q 12"`, `"2 times"` | **2** |
| อื่นๆ หรือไม่ระบุการแบ่งมื้อ | **1** |

### 4.2 การแปลงข้อความขนาดยาและการคำนวณปริมาตร (Parsing & Calculating Volume)
ระบบใช้ Regular Expression (Regex) เพื่อตรวจจับประเภทเกณฑ์การให้ยา แล้วทำการคำนวณดังนี้:

#### รูปแบบที่ 1: ช่วงปริมาณต่อวัน `[Min - Max] mg/kg/day`
* **Regex Pattern:** `/(\d+(\.\d+)?)-(\d+(\.\d+)?)\s*mg\/kg\/day/i`
* **สูตรการคำนวณหาปริมาตร (ml):**
  
  $$\text{Min Volume (ml)} = \frac{\left( \frac{\text{Min Value (mg)} \times \text{น้ำหนัก (kg)}}{\text{divisions}} \right)}{\text{ความเข้มข้นของยาน้ำ (concentration in mg/ml)}}$$
  
  $$\text{Max Volume (ml)} = \frac{\left( \frac{\text{Max Value (mg)} \times \text{น้ำหนัก (kg)}}{\text{divisions}} \right)}{\text{ความเข้มข้นของยาน้ำ (concentration in mg/ml)}}$$
  
* **ผลลัพธ์:** แสดงในช่วง `"Min Volume - Max Volume ml"`

#### รูปแบบที่ 2: ปริมาณต่อวันค่าเดียว `[Val] mg/kg/day`
* **Regex Pattern:** `/(\d+(\.\d+)?)\s*mg\/kg\/day/i`
* **สูตรการคำนวณหาปริมาตร (ml):**
  
  $$\text{Volume (ml)} = \frac{\left( \frac{\text{Value (mg)} \times \text{น้ำหนัก (kg)}}{\text{divisions}} \right)}{\text{ความเข้มข้นของยาน้ำ (concentration in mg/ml)}}$$

#### รูปแบบที่ 3: ช่วงปริมาณต่อครั้ง `[Min - Max] mg/kg/dose`
* **Regex Pattern:** `/(\d+(\.\d+)?)-(\d+(\.\d+)?)\s*mg\/kg\/dose/i`
* (เป็นหน่วยปริมาณต่อครั้งอยู่แล้ว จึงไม่ต้องหารด้วย `divisions`)
* **สูตรการคำนวณหาปริมาตร (ml):**
  
  $$\text{Min Volume (ml)} = \frac{\text{Min Value (mg)} \times \text{น้ำหนัก (kg)}}{\text{ความเข้มข้นของยาน้ำ (concentration in mg/ml)}}$$
  
  $$\text{Max Volume (ml)} = \frac{\text{Max Value (mg)} \times \text{น้ำหนัก (kg)}}{\text{ความเข้มข้นของยาน้ำ (concentration in mg/ml)}}$$

#### รูปแบบที่ 4: ปริมาณต่อครั้งค่าเดียว `[Val] mg/kg/dose`
* **Regex Pattern:** `/(\d+(\.\d+)?)\s*mg\/kg\/dose/i`
* **สูตรการคำนวณหาปริมาตร (ml):**
  
  $$\text{Volume (ml)} = \frac{\text{Value (mg)} \times \text{น้ำหนัก (kg)}}{\text{ความเข้มข้นของยาน้ำ (concentration in mg/ml)}}$$

---

## 5. การระบุยาแจ้งเตือนความเสี่ยงสูง (High Alert Medications Check)

ระบบใช้ฟังก์ชัน `isHighAlert(name)` เพื่อดักจับว่าตัวยาใดอยู่ในกลุ่ม High Alert โดยตรวจสอบว่ามีคีย์เวิร์ดต่อไปนี้ในชื่อยาหรือไม่ (แบบ Case-Insensitive):
* `adrenaline`
* `calcium gluconate`
* `digoxin`
* `potassium chloride`
* `phenobarbital`
* `phenytoin`
* `amiodarone`
* `magnesium sulfate`

หากตรงกับคีย์เวิร์ดเหล่านี้ ระบบจะแสดงป้ายเตือนกำกับสีเหลืองส้มเข้มหน้ากล่องผลลัพธ์: **"⚠️ ยาความเสี่ยงสูง (High Alert)"**
