function getSavedItems() {
  return JSON.parse(localStorage.getItem('items')) || []
}

function setSavedItems(savedItems) {
  localStorage.setItem('items', JSON.stringify(savedItems))
}

function toggleChecked(index) {
  return function() {
    this.classList.toggle('checked')
    const savedItems = getSavedItems()
    savedItems[index].checked = !savedItems[index].checked
    setSavedItems(savedItems)
  }
}

const items = document.getElementById('list')
const savedItems = getSavedItems()

Object.keys(items.children).forEach((key, index) => {
  const item = items.children[key]
  item.onclick = toggleChecked(index)
  if (!savedItems[index]) savedItems[index] = { checked: false }
  if (savedItems[index].checked) item.classList.add('checked')
})
setSavedItems(savedItems)

savedItems.forEach((savedItem, index) => {
  if (savedItem.value) {  
    const li = document.createElement('li')
    li.innerHTML = savedItem.value
    li.onclick = toggleChecked(index)
    if (savedItem.checked) li.classList.add('checked')

    items.appendChild(li)
  }
})

function newElement() {
  const item = document.getElementById('task')
  const value = item.value.trim()
  if (!value) return $('#liveToast.error').toast('show');
  
  const savedItems = getSavedItems()
  savedItems[savedItems.length] = { checked: false, value }
  setSavedItems(savedItems)

  const li = document.createElement('li')
  li.innerHTML = value
  li.onclick = toggleChecked(savedItems.length)
  items.appendChild(li)

  item.value = ''
  item.focus()

  $('#liveToast.success').toast('show')
}
