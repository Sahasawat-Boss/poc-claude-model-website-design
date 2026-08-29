สร้าง landing page สำหรับบริษัท B2B SaaS ชื่อ "Nordveil"
ขายแพลตฟอร์ม infrastructure monitoring สำหรับทีม engineering ขนาดกลาง

ข้อกำหนด technical:
- ไฟล์เดียว HTML (CSS อยู่ใน <style>, JS อยู่ใน <script>)
- ห้ามใช้ CSS framework / CDN ใดๆ — เขียน CSS เองทั้งหมด
- ห้ามใช้ภาพจาก external URL — visual ทั้งหมดสร้างด้วย CSS หรือ inline SVG
- responsive ทั้ง mobile และ desktop
- เปิดไฟล์ใน browser แล้วต้องทำงานได้ทันที ไม่ต้อง build

Section ที่ต้องมี:
1. Nav + hero (headline, subheadline, CTA เดียว)
2. Social proof (logo bar หรือ metric strip)
3. Feature section 3 อัน
4. How it works
5. Pricing 3 tier
6. Footer

โจทย์ด้าน design:
- ห้ามให้ออกมาหน้าตาเหมือน template ทั่วไป
  (ห้าม hero กลางจอ + gradient ม่วง-ฟ้า + card เงาๆ 3 ใบเรียงกัน)
- typographic hierarchy ชัดเจน มี contrast ระหว่าง scale จริงจัง
- color palette ที่มี point of view ไม่ใช่ default blue
- ต้องมี visual element อย่างน้อย 1 อย่างที่ทำให้จำหน้านี้ได้
  (grid system แปลกๆ, typography treatment, asymmetric layout อะไรก็ได้)
- micro-interaction / hover state ที่ตั้งใจ ไม่ใช่แค่ opacity เปลี่ยน
- JS ใช้เท่าที่จำเป็น (mobile menu, scroll effect, หรือ interaction ที่เสริม design จริงๆ)

ก่อนเขียนโค้ด อธิบาย design direction ที่เลือกสั้นๆ 3-4 บรรทัด
ว่าทำไมถึงเลือกทางนี้ และมันสื่ออะไรถึงกลุ่มเป้าหมาย