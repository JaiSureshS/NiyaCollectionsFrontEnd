export const apiUrl = document.location.href.startsWith('http://localhost')
? 'http://localhost:5000'
: 'https://niyacollections.herokuapp.com';