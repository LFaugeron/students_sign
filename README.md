To launch the script

-> npm install <br/>
-> create .env following the .env.sample <br/>
-> npm install pm2 -g (to execute the process in background) <br/>
-> pm2 start index.js --name signatures


Please remember to halt the script execution on weekdays when school is closed. The script can automatically detect weekends but does not account for public holidays. <br/>
To stop it -> pm2 stop signatures <br/>
To restart it -> pm2 start signatures