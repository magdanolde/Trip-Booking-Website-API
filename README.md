
## TRIP BOOKING WEBSITE API

## :shell: PROJECT IN A NUTSHELL
 
This program has both client site and admin site. The client site allows you to order trips, which are added to the database. Admin site allows you to add and manage trips.

### :unlock: FEATURES 

As a client, you can:

* add trips to the basket
* preview basket
* remove trips from the basket
* place an order (incl. form validation)

As a admin, you can:

* view trips saved in the database
* add new trips
* edit trips
* remove trips

###  SOLUTIONS APPLIED IN THE PROJECT

* Semantic HTML (BEM)
* The css styles (client.css and admin.css) are loaded into <head> section thanks to webpack, using the appropriate loader in webpack.config.js for files     with the extension .css
* Webpack
* To store all communication with the API in one place, the class ExcursionsAPI was created (in the separated file ExcursionsAPI.js)
* Communication with API is based on fetch() method
* To run the project using browsers that do not support fetch() method, package whatwg-fetch was used


### :boom: PROJECT LIVE 

### :mag: HOW TO OPEN THE PROJECT

 1. Clone git repository and open file on your local device in Code editor.
 2. Run npm install command to install all npm packages.
 3. Run npm start command to open developers mode.
 4. Run json-server --watch ./data/excursions.json command.

    Client panel: http://localhost:8080/index.html

    Admin panel: http://localhost:8080/admin.html

    Excursions data: http://localost:3000/excursions

    Basket data: http://localost:3000/basket

    Orders data: http://localost:3000/orders

![User_View](https://github.com/magdanolde/Trip-Booking-Website-API/assets/83141358/56bf646d-935e-4e64-8972-c17bdc45bdb7)

### 💻 TECHNOLOGIES

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Other tools: 

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

### 🤝 SPECIALTHANKS
Thanks to my Mentor - [devmentor.pl](https://devmentor.pl/) - for providing me with this task and for code review.

If you have any questions feel free to get in touch with me (contact in the profile [readme](https://github.com/magdanolde)).
