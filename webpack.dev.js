// استيراد الموديلات المطلوبة
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  // تحديد نقطة البداية (entry point) لتطبيقك
  entry: "./src/client/index.js",

  // وضع التطوير (development mode) للحصول على بيئة تطوير مع تحجيم أقل وأسرع
  mode: "development",

  // إعدادات الـ Source Map لمساعدتك في التصحيح
  devtool: "source-map",

  // إعدادات السيرفر المحلي (dev server)
  devServer: {
    static: path.join(__dirname, "dist"), // تحديد مجلد الملفات الثابتة
    port: 8080, // تحديد رقم المنفذ الذي يعمل عليه السيرفر المحلي
  },

  // قواعد معالجة الملفات
  module: {
    rules: [
      {
        // معالجة ملفات JavaScript باستخدام babel-loader
        test: /\.js$/, // تحديد جميع ملفات .js
        exclude: /node_modules/, // استبعاد مجلد node_modules
        use: {
          loader: "babel-loader", // استخدام babel لتحويل الكود إلى JavaScript متوافق مع جميع المتصفحات
        },
      },
      {
        // معالجة ملفات SCSS و CSS باستخدام style-loader, css-loader و sass-loader
        test: /\.(scss|css)$/, // تحديد جميع ملفات .scss و .css
        use: ["style-loader", "css-loader", "sass-loader"], // تحميل المحولات اللازمة لتحويل SCSS إلى CSS وتطبيقه على الصفحة
      },
      {
        // معالجة ملفات الصور (مثل png, jpg, gif) باستخدام file-loader
        test: /\.(png|jpg|gif)$/i, // تحديد جميع أنواع الصور المدعومة
        use: {
          loader: "file-loader", // استخدام file-loader لتحميل الصور
          options: {
            name: "[name].[ext]", // تحديد تنسيق اسم الملف الناتج (نفس اسم الملف الأصلي مع الامتداد)
          },
        },
      },
    ],
  },

  // إضافة Plugins لزيادة إمكانيات Webpack
  plugins: [
    // استخدام HtmlWebpackPlugin لتوليد HTML تلقائيًا
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html", // استخدام قالب HTML من المصدر
      filename: "./index.html", // إنشاء الملف الناتج باسم index.html في المجلد dist
    }),

    // استخدام CleanWebpackPlugin لتنظيف المجلد dist من الملفات القديمة عند كل بناء جديد
    new CleanWebpackPlugin({
      dry: true, // لتشغيل الكود بدون تنفيذ التنظيف الفعلي (مفيد للاختبار)
      verbose: true, // إظهار رسائل التفاصيل في وحدة التحكم
      cleanStaleWebpackAssets: true, // تنظيف الملفات غير المستخدمة
      protectWebpackAssets: false, // عدم حماية الأصول من التنظيف
    }),

    // استخدام WorkboxPlugin لتوليد Service Worker
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // مطالبة العملاء باستخدام الـ Service Worker بعد تثبيته
      skipWaiting: true, // تخطي الانتظار بعد التثبيت مباشرة
    }),
  ],
};

