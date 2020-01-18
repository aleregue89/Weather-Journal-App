import { url } from "inspector";
import { application } from "express";

/* Global Variables */
let apiKey = '6fefc928bdbf770a432498e19746e0ef';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// ** Async function that uses FETCH() to make a GET request to the API ** //
const getWeatherInfo = async(baseURL, newZip, apiKey) => {
    const res = await fetch(baseURL + newZip + apiKey);
    try {
        const userdata = await res.json();
        //console.log(userdata);
        return userdata;
    } catch (error) {
        console.log('error', error)
    }
}

// ** Create an event listener - element => id = generate ** //
document.getElementById('generate').addEventListener('click', performAction);
// ** callback function called by event listener ** //
function performAction(event) {
    //event.preventDefault();
    const newZip = document.getElementById('zip').value;
    const newContent = document.getElementById('feelings').value;

    getWeatherInfo(baseURL, newZip, apiKey)
        .then(function (data) {
            postData('/add', {date: newDate, temp: data.temp, content: content})
        }) .then(
            updateUI()
        )

}

// ** Creating another PROMISE - POST request to add API data as well data from user ** //
const postData = async (url='', data = {}) => {
    //console.log(data) - debugging
    //const res = await fetch(url, )
    const req = await fetch(url, {
        method: "POST", // GET, POST, DELETE, etc
        credentials: "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            date: data.date,
            temp: data.temp,
            content: data.content,
        })
    })
    try {
        const updatededData = await req.json();
        return updatededData;
    } catch (error) {
        // console.log("error,"); debugging
        console.log(error);
    }
}

// ** Promise for updating the UI dynamically ** //
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json()
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].content;    
    } catch (error) {
        console.log('error', error);
    }
}
