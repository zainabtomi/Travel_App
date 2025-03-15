// استيراد الموديلات المطلوبة لتكوين Webpack
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // تحديد نقطة الدخول (entry point) لتطبيقك
  entry: "./src/client/index.js",

  // تحديد مكان وضع الملف الناتج (output)
  output: {
    path: path.resolve(__dirname, "dist"), // مسار المجلد الذي سيتم حفظ الملفات فيه
    filename: "bundle.js", // اسم الملف الناتج
  },

  // وضع التطوير (development mode) للحصول على بيئة تطوير مع تحجيم أقل وأسرع
  mode: "development",

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
          options: {
            presets: ["@babel/preset-env"], // استخدام preset-env لتحويل الكود للنسخ الأحدث من JavaScript
          },
        },
      },
      {
        // معالجة ملفات SCSS باستخدام style-loader, css-loader و sass-loader
        test: /\.scss$/, // تحديد جميع ملفات .scss
        use: ["style-loader", "css-loader", "sass-loader"], // تحميل المحولات اللازمة لتحويل SCSS إلى CSS وتطبيقه على الصفحة
      },
    ],
  },

  // إضافة Plugins لزيادة إمكانيات Webpack
  plugins: [
    // استخدام HtmlWebpackPlugin لتوليد HTML تلقائيًا
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html", // استخدام قالب HTML من المصدر
      filename: "index.html", // إنشاء الملف الناتج باسم index.html في المجلد dist
    }),

    // استخدام CopyWebpackPlugin لنسخ ملفات معينة من مصدر إلى مجلد dist
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/client/views/service-worker.js", to: "service-worker.js" }, // نسخ ملف service-worker.js إلى المجلد dist
      ],
    }),

    // استخدام CleanWebpackPlugin لتنظيف المجلد dist من الملفات القديمة عند كل بناء جديد
    new CleanWebpackPlugin(),
  ],
};

