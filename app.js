const tagLabels = { hist: 'Історизм', arch: 'Архаїзм', neo: 'Неологізм' }
const tagClass = { hist: 'tag-hist', arch: 'tag-arch', neo: 'tag-neo' }
const barClass = { hist: 'bar-hist', arch: 'bar-arch', neo: 'bar-neo' }

let currentCat = 'all'

function render () {
  const filtered = words.filter(item => {
    return currentCat === 'all' || item.cat === currentCat
  })

  const grid = document.getElementById('grid')
  const empty = document.getElementById('empty')

  if (!filtered.length) {
    grid.innerHTML = ''
    empty.style.display = ''
    return
  }

  empty.style.display = 'none'
  grid.innerHTML = filtered
    .map(
      item => `
        <div class="word-card" onclick="this.classList.toggle('expanded')">
          <div class="accent-bar ${barClass[item.cat]}"></div>
          <span class="tag ${tagClass[item.cat]}">${tagLabels[item.cat]}</span>
          <div class="word-title">${item.w}</div>
          <div class="word-def">${item.d}</div>
        </div>
      `
    )
    .join('')
}

function updateCounts () {
  ;['all', 'hist', 'arch', 'neo'].forEach(cat => {
    const n = words.filter(item => {
      return cat === 'all' || item.cat === cat
    }).length
    document.getElementById('cnt-' + cat).textContent = n
  })
}

// Tab switching
document.getElementById('tabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn')
  if (!btn) return
  document
    .querySelectorAll('.tab-btn')
    .forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  currentCat = btn.dataset.cat
  render()
  updateCounts()
})

// Init
render()
updateCounts()
