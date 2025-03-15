// ===== app.js =====

// كائن أساسي (Primary Object) يحتوي على بيانات الرحلة مع قيم افتراضية
const tripData = {
  destination: "",
  startDate: "",
  endDate: "",
  coordinates: { lat: 0, lng: 0 },
  weather: {},
  image: ""
};

// دالة لحساب عدد أيام الرحلة
const countDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate - startDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // تحويل الفرق إلى أيام
  return diffDays;
};

// دالة رئيسية لمعالجة بيانات الرحلة
const processTripData = async (destination, start, end) => {
  try {
    // جلب الإحداثيات من GeoNames API
    const coordinates = await getFromGeonamesAPI(destination);
    
    // جلب حالة الطقس من Weatherbit API
    const weather = await getFromWeatherbit(coordinates.lat, coordinates.lng);
    
    // جلب صورة الوجهة من Pixabay API
    const image = await getFromPixabayAPI(destination);
    
    // تحديث بيانات الرحلة
    tripData.destination = destination;
    tripData.startDate = start;
    tripData.endDate = end;
    tripData.coordinates = coordinates;
    tripData.weather = weather;
    tripData.image = image;
    
    // عرض البيانات في واجهة المستخدم
    tripInfo(tripData, countDays(start, end));
  } catch (error) {
    console.error("An error occurred while processing trip data:", error);
  }
};

// دالة لعرض معلومات الرحلة في الواجهة
const tripInfo = (tripData, tripLength) => {
  const tripDetailsContainer = document.getElementById("details");
  tripDetailsContainer.innerHTML = `
    <img src="${tripData.image}" alt="${tripData.destination}" class="desimg">
    <p>Departure Date: ${tripData.startDate}</p>
    <p>Return Date: ${tripData.endDate}</p>
    <p>Trip Length: ${tripLength} days</p>
    <p>Weather Forecast: The temp is ${tripData.weather.data[0].temp}°C and there is ${tripData.weather.data[0].weather.description}</p>
  `;
};

// دوال لجلب البيانات من الـ APIs الخارجية
const getFromPixabayAPI = async (destination) => {
  const pixabayApiKey = "49058868-381234f76d29243b8bfd3aa2d";
  const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(destination)}&image_type=photo`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Pixabay API encountered an issue: ${response.status}`);
  }
  const data = await response.json();
  return data.hits.length > 0 ? data.hits[0].webformatURL : "default_image_url";
};

const getFromGeonamesAPI = async (destination) => {
  const geonamesUsername = "zainab1";
  const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${geonamesUsername}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geonames API encountered an issue: ${response.status}`);
  }
  const data = await response.json();
  if (data.geonames && data.geonames.length > 0) {
    return { lat: data.geonames[0].lat, lng: data.geonames[0].lng };
  } else {
    throw new Error("Destination not Found");
  }
};

const getFromWeatherbit = async (latitude, longitude) => {
  const weatherbitApiKey = "d9d5578da6804965958cadee54342a79";
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather API encountered an issue: ${response.status}`);
  }
  return await response.json();
};

// تصدير الدوال لاستخدامها في index.js
export { processTripData, tripInfo, countDays };
