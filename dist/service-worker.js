// عند تثبيت الـ Service Worker
self.addEventListener("install", (event) => {
  // هذه الدالة تُنفذ عندما يتم تثبيت الـ Service Worker لأول مرة
  console.log("Service worker installed");
});

// عند تفعيل الـ Service Worker
self.addEventListener("activate", (event) => {
  // هذه الدالة تُنفذ عندما يتم تفعيل الـ Service Worker
  console.log("Service worker activated");
});

// عند معالجة طلبات الشبكة (fetch)
self.addEventListener("fetch", (event) => {
  // هذه الدالة تُنفذ كلما تم إجراء طلب للموارد عبر الشبكة
  console.log(event.request);
  // هنا يمكن إضافة منطق للتعامل مع الطلبات (مثل تخزين الكاش أو إعادة الاستجابة من الكاش)
});

