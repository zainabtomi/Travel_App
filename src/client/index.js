// استيراد ملفات الأنماط الخاصة بالرأس والنموذج والتذييل
import "./styles/header.scss";
import "./styles/form.scss";
import "./styles/footer.scss";

// استيراد الدالة الرئيسية ودالة عرض المعلومات من الملف app.js
import { processTripData, tripInfo } from "./js/app.js";

// إضافة مستمع للحدث DOMContentLoaded للتأكد من تحميل المستند بالكامل قبل تنفيذ الكود
document.addEventListener("DOMContentLoaded", () => {
  // تحديد العنصر الذي يمثل النموذج (form) باستخدام ID
  const formElement = document.getElementById("myform");

  // إضافة Event Listener للنموذج بحيث عند الإرسال (submit)، يتم استدعاء دالة المعالجة
  formElement.addEventListener("submit", async (event) => {
    // منع السلوك الافتراضي للنموذج (تحديث الصفحة)
    event.preventDefault();

    // استخراج البيانات المدخلة من المستخدم (الوجهة، تاريخ البداية، تاريخ العودة)
    const destinationInput = document.getElementById("location").value;
    const tripStartDate = document.getElementById("start-date").value;
    const tripEndDate = document.getElementById("return-date").value;

    try {
      // استدعاء الدالة الرئيسية لمعالجة بيانات الرحلة باستخدام المدخلات
      await processTripData(destinationInput, tripStartDate, tripEndDate);
      
      // بعد معالجة البيانات، استدعاء الدالة لعرض معلومات الرحلة
      tripInfo();
    } catch (error) {
      // في حال حدوث خطأ، يتم طباعة الخطأ في وحدة التحكم وعرض رسالة تنبيه للمستخدم
      console.error("An error occurred while processing trip data:", error);
      alert(
        "Failed to retrieve trip details. Please check your input and try again later."
      );
    }
  });
});

