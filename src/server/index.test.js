const request = require("supertest"); // استيراد مكتبة supertest لاختبار API
let server; // تعريف متغير لتخزين السيرفر

// تشغيل الكود قبل جميع الاختبارات
beforeAll(() => {
  process.env.PORT = 8001; // تعيين منفذ مختلف لاختبارات (لتجنب تعارض مع السيرفر الفعلي)
  server = require("./index"); // استيراد السيرفر من الملف index.js
});

// إغلاق السيرفر بعد جميع الاختبارات
afterAll((done) => {
  server.close(done); // إغلاق السيرفر بعد الانتهاء من الاختبارات
});

// مجموعة اختبارات لمسار GET على الجذر "/"
describe("GET /", () => {
  // اختبار يحقق أن المسار الجذري يعيد ملف index.html بشكل صحيح
  it("should respond with the index.html file", async () => {
    const response = await request(server).get("/"); // إجراء طلب GET إلى الجذر
    expect(response.statusCode).toBe(200); // التحقق من أن الاستجابة تحمل رمز الحالة 200 (ناجح)
    expect(response.headers["content-type"]).toBe("text/html; charset=UTF-8"); // التحقق من أن نوع المحتوى هو HTML
  });
});
