Desarrollo de Aplicaciones Cliente-Servidor
==

Microservices
--------------------------

  `mvn clean install && docker-compose up --build`

  - Eureka Server: `http://localhost:8761`
  - Edge Server: `http://localhost:8765`
  - Service A: `http://localhost:8083/greeting-a`
  - Service B: `http://localhost:8084/greeting-b`
  - Greeting Service: `http://localhost:8085/greeting`
  - Greeting Service from Gateway: `http://localhost:8765/api/greeting/greeting`
