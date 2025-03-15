// استيراد الموديلات المطلوبة
const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  // نقطة الدخول (entry point) لتطبيقك
  entry: "./src/client/index.js",

  // وضع الإنتاج (production mode) لتحسين الكود وتحقيق أفضل أداء
  mode: "production",

  // إعدادات التحسين (optimization) لتقليص حجم الملفات
  optimization: {
    minimizer: [
      // تقليص حجم ملفات JavaScript باستخدام TerserPlugin
      new TerserPlugin({}),
      
      // تقليص حجم ملفات CSS باستخدام OptimizeCSSAssetsPlugin
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  // قواعد معالجة الملفات
  module: {
    rules: [
      {
        // معالجة ملفات JavaScript باستخدام babel-loader
        test: /\.js$/, // تحديد جميع ملفات .js
        exclude: /node_modules/, // استبعاد مجلد node_modules
        use: {
          loader: "babel-loader", // استخدام babel لتحويل الكود إلى JavaScript متوافق مع المتصفحات
        },
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
      {
        // معالجة ملفات SCSS و CSS باستخدام MiniCssExtractPlugin و css-loader و sass-loader
        test: /\.(scss|css)$/, // تحديد جميع ملفات .scss و .css
        use: [
          MiniCssExtractPlugin.loader, // استخراج CSS في ملف منفصل
          "css-loader", // تحميل CSS
          "sass-loader", // تحويل SCSS إلى CSS
        ],
      },
    ],
  },

  // إضافة Plugins لتحسين الكود وتحقيق أفضل أداء
  plugins: [
    // استخدام HtmlWebpackPlugin لتوليد HTML تلقائيًا
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html", // استخدام قالب HTML من المصدر
      filename: "./index.html", // إنشاء الملف الناتج باسم index.html في المجلد dist
    }),

    // استخدام MiniCssExtractPlugin لاستخراج CSS في ملف منفصل
    new MiniCssExtractPlugin({ filename: "[name].css" }),

    // استخدام WorkboxPlugin لإنشاء Service Worker يدير التخزين المؤقت للأصول
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // مطالبة العملاء باستخدام الـ Service Worker بعد تثبيته
      skipWaiting: true, // تخطي الانتظار بعد التثبيت مباشرة
    }),
  ],
};

