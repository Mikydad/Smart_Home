for clarity reasons, here is how the code is working now

1. backend. 
handlers.js is emeiting data to the frontend. 
2. main.js is listening to data from frontend.


Frontend.
Socket.js is emiting data to backend and also listening for data from the backend too.

Each component is import socket and is passing data to it or seting the data and the
data are passed to backend.