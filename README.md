# TLDR

## Project Pitch
Our project, designated as project BBY-24, is in the process of developing 'TLDR', an innovative Artificial Intelligence-driven chatbot. Our objective is to empower air passengers by enhancing their understanding of their rights and facilitating the navigation of convoluted airline policies. By offering a sophisticated yet user-centric solution, we aim to alleviate the difficulties individuals commonly encounter while interacting with commercial airlines. This initiative is our commitment to transforming the passenger experience through advanced technology and empathetic design.

## Technologies Used

  * Front-End
    - Animation On Scroll (AOS)
    - Bootstrap
    - CSS
    - EJS
    - HTML
    - Javascript
    - THREE.JS

  * Back-End
    - Aero API
    - EJS
    - Express
    - Javascript
    - Node JS
    - OpenAI API
    - Python
    
  * Other
    - MongoDB
    - Figma
    - Trello

## File Contents

2800-202310-BBY24
|   README.md
|   
+---.idea
|   |   .gitignore
|   |   2800-202310-BBY24.iml
|   |   misc.xml
|   |   modules.xml
|   |   vcs.xml
|   |   
|   \---inspectionProfiles
|           profiles_settings.xml
|           Project_Default.xml
|           
+---Canada_Text_Files
|       Accessible.txt
|       Aeronautics.txt
|       Aircanada.txt
|       Airtransit.txt
|       Catsa.txt
|       Commercial.txt
|       Flair.txt
|       Porter.txt
|       Protection.txt
|       Sunwing.txt
|       Westjet.txt
|       
+---Canada_Web_Scrape
|       Accessible.py
|       Aeronautics.py
|       Aircanada.py
|       Airtransit.py
|       Catsa.py
|       Commercial.py
|       Flair.py
|       Porter.py
|       Protection.py
|       Sunwing.py
|       Westjet.py
|       
+---Front_End
|   |   3d.css
|   |   3d.html
|   |   3d.js
|   |   airport.jpg
|   |   airportlineup.jpg
|   |   apple.png
|   |   forgotpassword.css
|   |   forgotpassword.html
|   |   github.png
|   |   google.png
|   |   login.css
|   |   login.html
|   |   logo.png
|   |   logoW.png
|   |   rsz_airport.jpg
|   |   scrollAnimations.js
|   |   signup.css
|   |   signup.html
|   |   
|   +---airlinelogos
|   |       AAlogo.png
|   |       Air Canada.png
|   |       airportlineup.jpg
|   |       airtransat.png
|   |       Alaska-Airlines-Logo-700x394.png
|   |       Allegiant-Air-logo-500x281.png
|   |       American-Airlines-logo.png
|   |       Delta-Logo-700x394.png
|   |       Flair_Airlines-Logo.wine.png
|   |       hawaiian-airlines-vector-logo.png
|   |       JetBlue-Logo_Blue.png
|   |       porterlogo.png
|   |       porter_airlinedds_91.png
|   |       porter_airlines_91.png
|   |       scrap.png
|   |       Southwest-Airlines-Logo-700x394.png
|   |       Spirit-Airlines-logo-500x281.png
|   |       Sunwing_Airlines-Logo.wine.png
|   |       united-airline-logos-2.png
|   |       westjet.png
|   |       
|   \---assets
|       |   earthbump.jpg
|       |   earthmap.jpg
|       |   earthspec.jpg
|       |   mask.png
|       |   minion.hdr
|       |   minion1.hdr
|       |   old_room_2k.hdr
|       |   
|       \---plane
|               marmot.glb
|               marmot1.glb
|               scene.glb
|               
+---GeneralPolicies
|       IATA_MontrealConvention.txt
|       WarsawConvention.txt
|       
+---PythonScripts
|       AirCancellationDelay.py
|       AirLineCommitmentsUSA.py
|       AlaskaAirlines.py
|       AllegiantAir.py
|       AmericanAirlines.py
|       Baggage.py
|       BumpingAndOversales.py
|       BuyTicket.py
|       CharterFlights.py
|       codeOfFederalRegulations_Oversales.py
|       codeOfFederalRegulations_passengerProtections.py
|       DeltaAirLines.py
|       FlyRights.py
|       FrequentFlyer.py
|       FrontierAirlines.py
|       HawaiianAirlines.py
|       JetBlueAirways.py
|       montrealConvention.py
|       Refunds.py
|       SexualAssaultAwareness.py
|       SouthwestAirlines.py
|       SpiritAirlines.py
|       TarmacDelays.py
|       UnitedAirlines.py
|       warsawConvention.py
|       
+---USAirlinePolicies
|       Alaskaairlines.txt
|       Allegiantair.txt
|       Americanairlines.txt
|       Deltaairlines.txt
|       Frontierairlines.txt
|       Hawaiianairlines.txt
|       Jetblue.txt
|       Southwestairlines.txt
|       Spiritairlines.txt
|       Unitedairlines.txt
|       
+---USGovernmentPolicies
|       CodeOfFederalRegulations_Oversales.txt
|       CodeOfFederalRegulations_passengerProtections.txt
|       CodeOfFederalRegulation_NondiscriminationAndDisability
|       DepartmentOfTransportation_AirTravelRules.txt
|       DepartmentOfTransportation_FlyRights.txt
|       US_airlinecommitments_delaysandcancellations.txt
|       
\---Webapp
    |   .gitignore
    |   databaseConnection.js
    |   index.js
    |   nodeRequirements.txt
    |   package.json
    |   Procfile
    |   
    +---ChatBot
    |   |   .gitignore
    |   |   main.py
    |   |   Procfile
    |   |   requirements.txt
    |   |   
    |   +---AirLineJson
    |   |       Allegiant_index.json
    |   |       spiritairline_index.json
    |   |       WestJet_index.json
    |   |       
    |   +---flagged
    |   |       log.csv
    |   |       
    |   \---Knowledge
    |           Allegiant.txt
    |           Spiritairlines.txt
    |           Westjet.txt
    |           
    +---public
    |   |   airport.jpg
    |   |   airportlineup.jpg
    |   |   apple copy.png
    |   |   apple.png
    |   |   github copy.png
    |   |   github.png
    |   |   google copy.png
    |   |   google.png
    |   |   loading.gif
    |   |   logo-black.png
    |   |   logo-white.png
    |   |   logo.png
    |   |   logoW.png
    |   |   rsz_airport.jpg
    |   |   upload.png
    |   |   
    |   +---airlinelogos
    |   |       AAlogo.png
    |   |       Air Canada.png
    |   |       airportlineup.jpg
    |   |       airtransat.png
    |   |       Alaska-Airlines-Logo-700x394.png
    |   |       Allegiant-Air-logo-500x281.png
    |   |       American-Airlines-logo.png
    |   |       Delta-Logo-700x394.png
    |   |       Flair_Airlines-Logo.wine.png
    |   |       hawaiian-airlines-vector-logo.png
    |   |       JetBlue-Logo_Blue.png
    |   |       porterlogo.png
    |   |       porter_airlinedds_91.png
    |   |       porter_airlines_91.png
    |   |       scrap.png
    |   |       Southwest-Airlines-Logo-700x394.png
    |   |       Spirit-Airlines-logo-500x281.png
    |   |       Sunwing_Airlines-Logo.wine.png
    |   |       united-airline-logos-2.png
    |   |       westjet.png
    |   |       
    |   +---assets
    |   |   |   earthbump.jpg
    |   |   |   earthmap.jpg
    |   |   |   earthspec.jpg
    |   |   |   mask.png
    |   |   |   minion.hdr
    |   |   |   minion1.hdr
    |   |   |   old_room_2k.hdr
    |   |   |   
    |   |   \---plane
    |   |           marmot.glb
    |   |           marmot1.glb
    |   |           scene.glb
    |   |           
    |   +---JS
    |   |       3d.js
    |   |       background.js
    |   |       chatbot.js
    |   |       favourites.js
    |   |       profile.js
    |   |       scrollAnimations.js
    |   |       star.js
    |   |       
    |   +---profile_images
    |   |       cat.png
    |   |       front-plane.png
    |   |       lebron.png
    |   |       minions.png
    |   |       pilot-black.png
    |   |       pilot-blue.png
    |   |       pilot-pink.png
    |   |       side-plane.png
    |   |       
    |   \---styles
    |           3d.css
    |           forgotpassword.css
    |           index.css
    |           login.css
    |           profile.css
    |           signup.css
    |           star.css
    |           
    \---views
        |   404.ejs
        |   chatbot.ejs
        |   favourites.ejs
        |   forgot-password.ejs
        |   index.ejs
        |   login.ejs
        |   profile.ejs
        |   reset-password.ejs
        |   signup.ejs
        |   
        \---templates
                footer.ejs
                header.ejs
                
## How to Set-up

  * Installations
    - Languages
      - Javascript
      - Python

    - IDEs
      - Visual Studio Code
    
    - Database
      - MongoDB

    - Front-End Packages
      - Bootstrap

    - Back-End Packages
      - npm i express
      - npm i express-session
      - npm i connect-mongo
      - npm i bcrypt
      - npm i joi
      - npm i dotenv
      - npm i nodemon
      - npm i nodemailer
      - npm i ejs
      - npm i mongodb
      
      - Chatbot Packages
        - pip install llama-index==0.5.27
        - pip install langchain==0.0.142
        - pip install gradio~=3.29.0
        - pip install os
        - pip install sentence_transformers
        - pip install numpy~=1.24.3
        - pip install python-dotenv==1.0.0
        - pip install Flask~=2.3.2
        - pip install nltk~=3.8.1
        - pip install requests~=2.30.0
        - pip install flask-cors==3.0.10

    - Other Software and Libraries
      - THREE JS
      - EJS
      - Animation On Scroll (AOS)
      
      - Web Scraping with Python (Custom Data set)
        - BeautifulSoup 
        - Selenium
        - pdfplumber
        - requests

    - 3rd-Party APIs
      - OpenAI API
      - Aero API

    - Order of Installation
      - Javascript
      - Python
      - Back-End Packages (Install within the Webapp folder)
      - Other Software and Libraries 

  * Configuration Instructions
    - Clone the repository
    - Get your own OpenAI API key from the OpenAI website
      - in your account, create your own secret key
    - Get your own Aero API key from https://flightaware.com/commercial/aeroapi
    - Follow the order of installation
    - Set up the Python server
      - cd Webapp/Chatbot
        - Insert your OpenAI API key in main.py on line 44
        - Insert your Aero API key in main.py on line 112
        - Run main.py
          - The python code will interact with the Node back-end server
    - Launch the Node server
      - Navigate to the javascript files
        - cd Webapp/JS
          - Change the host variable in chatbot.js to http://localhost:5001
        - cd Webapp/JS
          - launch the server
            - nodemon index.js
   

    ## Testing Plan
      * Link: https://docs.google.com/document/d/1MqygYhmEfEDc0olPcQyo6toKUy6h4QqTRKTw2gzI-Qk/edit?usp=sharing
      

## Putting TLDR to Use
  * Launch the website in your browser
    - https://tldr-node.onrender.com/
  
  * Login/Sign up for an account 
    - Click the "Get Started" button
    
    - Current Users
      - Enter your login information
        - Click the "Log In" button to access the site
    
    - New Users
      - Click the "Don't have an account" button
        - Enter your username, email, phone number and password
          - Click the "Sign Up" button to access the site
  
  * Option 1: Input your flight number
    - Click "Enter flight number"
      - Enter your flight number into the dialog box and click "Send"
        - The Aero API will search for your flight 
        - You will then be given the status of your current flight
          - Interact with the chatbot to learn about policy and potential compensation
            - If you would like to save a chatbot message, click the heart button in order
              to save it to your favorites page

  * Option 2: Go directly to the chatbot page
    - Click "Go to Chat"
      - At the top of the page, click the "Select airline name..." drop down menu and pick your airline
        - You can either select a pre-made question or enter a custom question in the dialog box
          - Click the "Ask" button
            - If you would like to save a chatbot message, click the heart button in order
              to save it to your favorites page

  * Using the Profile page
    - Click the "Profile" icon in the footer
      - You will be able to see your username, profile picture, email and phone number
      - If you would like to modify this information, click "Change your information"
         - You can then modify your information   
            - Click "save" to save your changes


  * Using the Favourites page
    - Click the "Favourites" icon in the footer
      - You will be able to see all of your favorited conversations 
      - Click on a message to expand the message and see its contents
      - If you would like to unfavorite a conversation
        - Click the heart image
        - Your changes will be saved automatically

  * Using the Settings menu
    - Click the "Settings" icon in the footer
      - You can choose between two themes
        - Light Mode
        - Dark Mode
          - Click the desired theme in order for it to be applied to the page

  * Logging Out
    - Click the "Settings" icon in the footer
      - Click the "Logout" button


   

//Include Credits, References, and Licenses
## Credits, References, and Licenses
  
  * Credits
    - Gathrean Dela Cruz - UX/UI Consultant 
  
  * Lincenses
    - Figma

    - Trello

  
## How We Used AI

  ## Chatbot and OpenAI API
      - Our chatbot  leverages the advanced OpenAI API, complemented by state-of-the-art technologies such as Lambda Index, Sentence Transformers, and LLM Predictor. These technological components are supplied with a query and an airline designation as inputs.
      
      - The airline identifier and the inquiry are integrated into a function named 'isRelated'. This function utilizes the Cosine Similarity measure to juxtapose the user's question with data exclusive to the specified airline, thereby ensuring a high degree of relevance and precision.
      
      - Subsequently, a cogent response is generated utilizing the LLM Predictor, specifically employing the 'textDinvci003' module. This creates a dynamically tailored response that aligns    with the nature of the user's question and the context provided by the airline data.
      
      - Following the response generation, a POST request is executed. The resultant response is then converted into a JSON format via the 'jsonify' function. This JSON response is finally relayed to the user interface, ensuring seamless communication of the chatbot's output to the front-end application.

  ## ChatGPT
    - Debugging
    - Educational AI Resources
    - AI-related questions

  ## Limitations
    * Speed
      - Due to the lack of datasets on airline policy and passenger rights, we had to create our own custom dataset, consisting of a set of text files. This caused delays up to 30 seconds in order for a user to get a response.
      - When you first ask the chatbot a question about a specific airline, we used python to create JSON file of that airline's data, reducing the response-time drastically.

    * Cost
      - OpenAI API charges users based on the number of tokens used per interaction (question and response). As our text files were of considerable size, each interaction was costing roughly 25 cents. 

      - After implementing the aforemention python code, we were able to drop the cost to roughly 8 cents per interaction.

      - Ideally, we would've liked to organize all of our data into MongoDB, create a script to query our database for a response, which would then be passed to the OpenAI API. This would reduce the cost per interaction significantly, and improve the scalability of our product.

## Contact Information

  * Jayden Baek
      Email: baekjinho0522@gmail.com
      GitHub: chino0522

  * James Langille
      Email: langillejames11@gmail.com
      GitHub: jamesnll
    
  * Bardia Timouri
      Email: bardia_il@yahoo.ca
      GitHub: bardiaTim
   
  * Will Ondrik
      Email: willondrik@gmail.com
      GitHub: slickwilfred
