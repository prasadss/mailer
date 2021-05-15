# RabbitMQ-mailer

Node JS project with rabbit mq implementation

## Description

This project take msg from an endpoint and then pushed the data in rabbitmq. Rabbitmq is listned by the rabbit-listner.js file and responsbole to send emails.

Note - Once we send email using the endpoint in console a url will be displayed which can be used to review the email as we ae using nodemailer test server

## Prerequisite

- Node
- Docker

## Installaton

- npm install
- docker-compose up -d

## Running

- Open two consoles and run below command in each.
  #### `npm start`
  #### `npm listener`

## curl to send email

`curl --location --request POST 'http://localhost:3000/api/mail/send-mail' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=aaaa' \
--data-urlencode 'toEmail=aasd@gmail.com' \
--data-urlencode 'content=Hello' \
--data-urlencode 'fromEmail=prasd@gmail.com' \
--data-urlencode 'subject=test'`