let elFrorm = document.querySelector(`.js-form`);
let elInput = document.querySelector(`.js-input`);
let elContentList = document.querySelector(`.js-content-list`);
let elMoreBtn = document.querySelector(`.js-more-btn`);
let elCardTemplet = document.querySelector(`.card-template`).content;


function displayCardNotInnerHtml (arr){
  
  let elCradFragment = document.createDocumentFragment();
  
  arr.forEach( item => {
    let elCardItem = elCardTemplet.cloneNode(true);
    
    elCardItem.querySelector(`.js-card-item`).style.background = item.color
    elCardItem.querySelector(`.js-card-link`).href = item.urls.full
    elCardItem.querySelector(`.js-card-img`).src = item.urls.full
    elCardItem.querySelector(`.js-card-img`).alt = item.alt_description
    elCardItem.querySelector(`.js-card-time`).textContent = item.updated_at
    elCardItem.querySelector(`.js-card-desc`).textContent = item.description
    elCardItem.querySelector(`.js-card-owner`).textContent = item.user.first_name
    
    elCradFragment.appendChild(elCardItem);
  })
  
  elContentList.appendChild(elCradFragment);
}
function displayCard (arr){
  
  elContentList.innerHTML
  
  let elCradFragment = document.createDocumentFragment();
  
  arr.forEach( item => {
    let elCardItem = elCardTemplet.cloneNode(true);
    
    elCardItem.querySelector(`.js-card-item`).style.background = item.color
    elCardItem.querySelector(`.js-card-link`).href = item.urls.full
    elCardItem.querySelector(`.js-card-img`).src = item.urls.full
    elCardItem.querySelector(`.js-card-img`).alt = item.alt_description
    elCardItem.querySelector(`.js-card-time`).textContent = item.updated_at
    elCardItem.querySelector(`.js-card-desc`).textContent = item.description
    elCardItem.querySelector(`.js-card-owner`).textContent = item.user.first_name
    
    elCradFragment.appendChild(elCardItem);
  })
  
  elContentList.appendChild(elCradFragment);
}

let count = 1

  fetch(`https://api.unsplash.com/search/photos?page=${count}&per_page=12&order_by=popular&query=islam&client_id=Lhzh7VdA_qlNPmVhNJG15Z-kP_tsUcr-Ja_meCTWHKY`)
  .then(response => {
    if(response.status === 200) {
      return response.json()
    }
  }).then(data => {
    if(data.total > 0) {
      displayCard(data.results);
    }
  })

elFrorm.addEventListener(`submit`, evt => {
  evt.preventDefault()
  
  fetch(`https://api.unsplash.com/search/photos?page=${count}&per_page=12&order_by=popular&query=${elInput.value}&client_id=Lhzh7VdA_qlNPmVhNJG15Z-kP_tsUcr-Ja_meCTWHKY`)
  .then(response => {
    if(response.status === 200) {
      return response.json()
    }
  }).then(data => {
    if(data.total > 0) {
      displayCard(data.results);
    }
  })
  
  
  elMoreBtn.addEventListener( `click`, evt => {
    evt.preventDefault()
    count++
    fetch(`https://api.unsplash.com/search/photos?page=${count}&per_page=12&order_by=popular&query=${elInput.value}&client_id=Lhzh7VdA_qlNPmVhNJG15Z-kP_tsUcr-Ja_meCTWHKY`)
    .then(response => {
      if(response.status === 200) {
        return response.json()
      }
    }).then(data => {
      if(data.total > 0) {
        displayCardNotInnerHtml(data.results);
      }
    });
  });
  elInput.value = ``
});

