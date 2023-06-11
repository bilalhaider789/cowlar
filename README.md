# cowlar
Full Stack Todo List App for Cowlar

This repository contains 2 folders. Frontend and backend of todo app.
Both the apps are containerzed and can be run using docker.

Procedure for Manually running the apps:
For backend just open the command line terminal in backend folder. Run "npm install" and after that "npm start". This will install all the packages and run the server.
For running the test cases run "npm test". There are 4 testcases and all will start running.

For frontend, open the command line terminal in frontend folder. Run "npm install" and after that "npm run dev". This will install all the packages and run the app on localhost:3000 url.
Local mongo db url is added in docker compose file. If it fails then database connecting will be made with mongoatlas.
