// const API = 'http://[::1]:3002'
const API = location.href.includes('127.0.0.1') ? 'http://localhost:3000' : 'https://ideias.dizelequefez.com.br'

async function getPhrases(params) {
  try {
    const res = await fetch(API + `/phrases?${new URLSearchParams(params)}`)
    const data = await res.json()

    const tbody = document.querySelector('tbody')

    tbody.innerHTML = ''

    data.forEach((phrase, index) => {
      const tr = tbody.insertRow()
      tr.className = 'border-b border-gray-400 h-14 last:border-b-0'
      tr.insertCell().textContent = index + 1
      tr.insertCell().textContent = phrase.portuguese
      tr.insertCell().textContent = phrase.english

      // Cria a célula com o botão
      const cell = tr.insertCell()
      const button = document.createElement('button')
      button.className = 'w-10 h-10 pt-1 bg-gray-500 rounded-full hover:bg-gray-400'
      button.innerHTML = `<i class="ph ph-play"></i>`

      cell.appendChild(button)

      // Cria o player de áudio
      const audio = new Audio(phrase.audio)

      // Ao clicar no botão, toca o áudio
      button.addEventListener('click', () => {
        if (audio.paused) {
          audio.play()
          button.innerHTML = `<i class="ph ph-pause"></i>`
          return
        }
        audio.pause()
        button.innerHTML = `<i class="ph ph-play"></i>`
      })

      // Quando o áudio terminar, volta para play
      audio.addEventListener('ended', () => {
        button.innerHTML = `<i class="ph ph-play"></i>`
      })
    })

  } catch (error) {
    console.error(error)
    alert(error)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await getPhrases()
})

document.querySelector('#form-search').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData);

  await getPhrases(payload)

})

document.querySelector('#form-create').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData);

  const button = document.querySelector('#button-submit')
  button.disabled = true
  button.textContent = 'Loading...'

  try {

    await fetch(API + '/phrases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    await getPhrases()

  } catch (error) {
    console.error(error)
    alert(error)
  } finally {
    button.disabled = false
    button.textContent = 'Save'
    // e.target.reset()
  }
})
