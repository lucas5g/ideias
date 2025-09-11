const API = 'http://[::1]:3002'

document.addEventListener('DOMContentLoaded', () => {
  fetch(API + '/phrases')
    .then(response => response.json())
    .then(data => {

      const tbody = document.querySelector('tbody')
      
      for(const phrase of data) {
        
        const tr = tbody.insertRow()
        tr.className = 'border-b border-gray-400 h-14 last:border-b-0'
        tr.insertCell().textContent = phrase.id
        tr.insertCell().textContent = phrase.portuguese
        tr.insertCell().textContent = phrase.english

      }

    })
})

document.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const button = document.querySelector('#button-submit')
  button.disabled = true
  button.textContent = 'Loading...'


  fetch(API + '/phrases', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      button.disabled = false
      button.textContent = 'Submit'
      // e.target.reset()
    })
})