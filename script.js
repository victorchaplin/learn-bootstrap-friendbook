let profiles = []
let searchTerm = ''

function searchChanged() {
  const searchField = document.querySelector('#search-field')
  searchTerm = searchField.value
  addUserCards()
}

async function findFriends() {
  const profilesUrl = 'https://jsonplaceholder.typicode.com/users'

  profiles = await fetch(profilesUrl).then(response => response.json())

  addUserCards()
}

function clearFriends() {
  const friendContainer = document.querySelector('#friend-container')
  friendContainer.innerHTML = ''
}

function addUserCards() {
  clearFriends()

  const filteredProfiles = profiles.filter(profile => 
    profile.name.includes(searchTerm) || profile.company.name.includes(searchTerm)
  )

  const cards = filteredProfiles.map(profile =>
    `
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="https://i.pravatar.cc/300?img=${profile.id}" class="img-fluid rounded-start" alt="${profile.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${profile.name}</h5>
            <p class="card-text">${profile.company.name}</p>
            <p class="card-text"><small class="text-muted">${profile.company.catchPhrase}</small></p>
          </div>
        </div>
      </div>
    </div>
    `
    )

  const friendContainer = document.querySelector('#friend-container')

  cards.forEach(card => friendContainer.innerHTML += card)
}