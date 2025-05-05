// const express = require("express");
// const router = express.Router();
// const SerialPort = require("serialport");
// const Readline = require("@serialport/parser-readline");

// // UPDATE this to match your port (you already found it earlier)
// // const port = new SerialPort("/dev/tty.usbmodem1442301", { baudRate: 9600 });
// const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

// let weatherData = {
//   temperature: null,
//   humidity: null,
// };

// parser.on("data", (line) => {
//   const match = line.match(/T:(\d+(\.\d+)?),H:(\d+(\.\d+)?)/);
//   if (match) {
//     weatherData.temperature = parseFloat(match[1]);
//     weatherData.humidity = parseFloat(match[3]);
//     console.log("Updated:", weatherData);
//     console.log("Temperature:", weatherData.temperature);
//     console.log("Humidity:", weatherData.humidity);
//   }
// });

// router.get("/room", (req, res) => {
//   res.json(weatherData);
// });

// module.exports = router;





const express = require("express");
const router = express.Router();

// Fake weather data object
let weatherData = {
  temperature: null,
  humidity: null,
};

// Generate fake data every 2 seconds
setInterval(() => {
  const fakeTemp = (20 + Math.random() * 10).toFixed(1); // 20°C to 30°C
  const fakeHum = (40 + Math.random() * 20).toFixed(1);  // 40% to 60%

  weatherData.temperature = parseFloat(fakeTemp);
  weatherData.humidity = parseFloat(fakeHum);

  console.log("Fake data generated:", weatherData);
}, 2000);

// Route to get current (fake) weather data
router.get("/room", (req, res) => {
  res.json(weatherData);
});

module.exports = router;
