// استيراد دالة countDays من ملف app.js
import { countDays } from "./app";

describe("Length of trip", () => {
  // استخدام test.each لتحديد حالات متعددة للاختبار
  test.each([["2025-03-03", "2025-03-09", 6]])(
    // التسمية التي توضح ماذا يتم اختباره في كل حالة
    "Returns correct number of days between %s and %s",
    (start, end, expected) => {
      // اختبار دالة countDays باستخدام المدخلات المحددة
      expect(countDays(start, end)).toBe(expected);
    }
  );
});

