// حدث "install" يُنفذ عندما يتم تثبيت الـ Service Worker
self.addEventListener("install", (event) => {
  console.log("Service worker installed");  // تسجيل رسالة عند تثبيت الـ Service Worker
});

// حدث "activate" يُنفذ عندما يصبح الـ Service Worker نشطًا
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");  // تسجيل رسالة عند تنشيط الـ Service Worker
});

// حدث "fetch" يُنفذ عند كل طلب شبكة (مثل تحميل صفحة أو صورة)
self.addEventListener("fetch", (event) => {
  console.log(event.request);  // تسجيل تفاصيل الطلب الذي تم استلامه
});
