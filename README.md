# claude-model — Model Comparison Viewer

Next.js + Tailwind app สำหรับเปิดดูและเปรียบเทียบผลงาน landing page "Nordveil"
ที่สร้างโดย Claude Opus / Sonnet ในระดับ reasoning effort ต่างๆ (low / medium / high / xhigh)

## รัน

```bash
npm install
npm run dev      # http://localhost:3000
```

## หน้าเว็บ

| Route | ใช้ทำอะไร |
| --- | --- |
| `/` | Gallery — thumbnail ของทั้ง 8 เวอร์ชัน แยกตามรุ่น |
| `/view/[slug]` | เปิดดูเต็มจอ 1 เวอร์ชัน + สลับไปเวอร์ชันอื่นได้ (slug เช่น `opus-xhigh`) |
| `/compare` | วางเทียบ 2 เวอร์ชัน side-by-side เลือกได้อิสระ + ปุ่มสลับซ้าย-ขวา |

## โครงสร้าง

```
Ref/                      # ต้นฉบับทั้งหมด (source of truth)
  brief.md                # โจทย์ตั้งต้น
  project-summary.md      # สรุปโปรเจกต์
  opus/{low,medium,high,xhigh}/index.html
  sonnet/{low,medium,high,xhigh}/index.html

public/results/           # สำเนาที่ Next.js เสิร์ฟให้ iframe
src/lib/results.ts        # ตาราง model × effort ใช้ generate ทุกหน้า
src/app/                  # layout, gallery, view, compare
```

## เพิ่มผลงานเวอร์ชันใหม่

1. วางไฟล์ที่ `Ref/<model>/<effort>/index.html`
2. คัดลอกไปที่ `public/results/<model>/<effort>/index.html`
3. ถ้าเป็น model หรือ effort ใหม่ ให้เพิ่มลงใน `MODELS` / `EFFORTS` ใน `src/lib/results.ts`
   หน้าทั้งหมดจะอัปเดตตามเอง
