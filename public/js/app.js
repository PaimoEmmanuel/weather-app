const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

messageOne.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Checking weather forecast...'
    messageTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            return messageOne.textContent = data.error;
        }
        messageOne.textContent = 'Location: ' + data.location;
        messageTwo.textContent = `Forecast: The temperature is ${data.forecast.temperature} degree celsius, with a relative humidity of ${data.forecast.humidity}%.` ;
    });
});
    //search.value = "";
});