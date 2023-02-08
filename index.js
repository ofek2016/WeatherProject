const express = require('express');
const https = require('https');
require('dotenv').config()
const PORT = 3000;
const app = express();

app.listen(PORT, () => {console.log("Server is runnimg on " + PORT);});

app.use(express.urlencoded());

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/");
});

app.post("/",(req,res)=>{
    console.log(req.body.cityName);
    let cityName=req.body.cityName
let query=cityName;
let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&appid=${process.env.KEY}`
https.get(url, (response) => {
    console.log(response.statusCode);

    response.on('data', (data) => {
       const weatherDate = JSON.parse(data);
       console.log(weatherDate);
       const mydate={
        temp: weatherDate.main.temp,
        description:weatherDate.weather[0].description,
        feels_like:weatherDate.main.feels_like,
        icon:weatherDate.weather[0].icon
       } 
    //    res.write(<h1> the temp in Or Akiva is ${mydate.temp} degrees celcics.</h1>);
       res.send(`
       <div>
       <h1> the temp in ${cityName} is ${mydate.temp} degrees celcics.</h1>
       <h2> the weather is currently ${mydate.description}</h2>
       <h3>the temp in ${cityName}  feels like ${mydate.feels_like}</h3>
       <img src="http://openweathermap.org/img/wn/${mydate.icon}@2x.png"
       </div>`);
      console.log(mydate);
      });
}).on('error', (e) => {
    console.error(e);
  });
})

