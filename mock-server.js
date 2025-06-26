// mock-server.js
const io = require("socket.io")(3001, { cors: { origin: "*" } });

let lat = 12.9716;
let lng = 77.5946;

setInterval(() => {
  lat += 0.0001;
  lng += 0.0001;

  io.emit("driverLocationUpdate", {
    orderId: "test123", // Match with URL param for testing
    lat,
    lng,
  });

  console.log("Emitted new driver location:", lat, lng);
}, 3000);

console.log("Mock server running at port 3001");
