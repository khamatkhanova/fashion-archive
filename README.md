# full-stack web application

a full-stack e-commerce web application inspired by the maison margiela brand

## about

a web-based clothing store with a modern frontend and a backend api

the application provides a complete user experience for browsing and managing products, as well as additional user functionality

users can:
  browse the product catalog  
  view products by category  
  view detailed product information  
  add products to favorites  
  remove products from favorites  
  add products to the shopping cart  
  remove products from the shopping cart  
  view products in the shopping cart  
  create personal tasks  
  edit tasks  
  delete tasks  
  change task status  
  view their personal task list  

## tech stack

### frontend

  javascript  
  html  
  css  

the frontend provides the user interface and communicates with the backend through the available api endpoints

### backend

  typescript  
  nestjs  
  node.js  
  express  
  rest api  
  graphql  

the backend is responsible for business logic, request processing, data validation, authentication and communication with the database

### database

  postgresql  
  prisma orm  

postgresql is used for persistent data storage. prisma provides an abstraction layer for working with the database

### infrastructure

  render  
  yandex object storage  
  git  
  github  

## architecture

the application is divided into separate functional modules

main modules:

  products - product catalog and product management  
  cart - shopping cart management  
  favorites - favorite products management  
  todos - personal task management  

each module contains services, controllers, dto classes and graphql components
