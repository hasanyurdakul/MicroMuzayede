# Micro Muzayede
![Header](https://raw.githubusercontent.com/hasanyurdakul/hasanyurdakul.com.tr/5624e03582d69873c2f271df0d8682f7939c85f7/public/images/work/micro-muzayede-sc-1.png)
 1. Micro Muzayed project is a Microservices proof of concept project developed using technologies such as ASP.NET Core, Entity Framework Core, Identity Server, PostgreSQL, MongoDB, MassTransit, RabbitMQ, YARP, SignalR, xUnit, NextJS and so on.
 2. The application is designed to support scalable web APIs using ASP.NET Core. This represents an approach that adopts microservices architecture to enable functionality to be distributed and scaled in a modular manner.
 3. Data persistence was addressed by diversifying across different database technologies. Using Entity Framework Core, PostgreSQL and MongoDB, the application was integrated into different data storage solutions. This provided flexibility and performance in data management.
 4. Reliable messaging and event-driven architecture were implemented using RabbitMQ and MassTransit. These technologies increased the durability of the application, ensuring that messages were delivered reliably and events were managed effectively.
 5. Authentication and authorization processes were effectively managed using Identity Server.
 6. Used YARP in Gateway Service for flexible API routing. This enabled the application to dynamically manage API routes and change redirects as needed, creating a more flexible and scalable API infrastructure.
 7. Created a notification service utilizing SignalR. This enabled real time updates to be pushed to clients efficiently. The service improved user engagement by providing real time alerts and notifications.
   8. Handled synchronous service-to-service communications with gRPC. This ensured efficient, low-latency communication between microservices. Additionally, it facilitated better error handling.
 9. Wrote unit tests with xUnit. This guaranteed the code's reliability and correctness by systematically verifying individual components

## Installation
You can run this app locally on your computer by following these instructions:

1. Clone the repository

    ```
    git clone https://github.com/hasanyurdakul/MicroMuzayede.git
    ```

2. Change directory into the MicroMuzayede 
	```
	cd MicroMuzayede
	```
3. Make sure Docker Desktop is installed on your computer. If you don't have it, install from Docker following their instructions for your OS [here](https://docs.docker.com/desktop/).
4. Build the services locally on your computer by running command below ( Because the images are being downloaded for the first time, this may take several minutes to complete )
	```
	docker compose build
	```
5. Once build completes, run following command to run the services:
	```
	docker compose up -d
	```
6. Change into the frontend/web-app directory
	```
	cd frontend\web-app
	```
7. Install required packages by running
	```
	npm install
	```
8. After installing packages, run command below to run app
	```
	npm run dev
	```
9. You should now be able to browse to the app on http://localhost:3000/
10. Try to register or sign-in with built-in test users
	``` 
	ID: bob   	Password: Pass123$
	ID: alice 	Password: Pass123$
	```
