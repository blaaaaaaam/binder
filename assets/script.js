let siteData, draggable
let menu = document.querySelector('#menu')
let navigation = document.querySelector('#navigation')
let body = document.body
let mobile = false

fetch('info.json').then(function(response){
  return response.json()
}).then(function(data){

  siteData = data

  // create title
  document.title = data.title

  // create navigation
  let links = document.querySelector('#navigation')
  data.menu.forEach(element => {
    let url = element.link
    let title = element.title
    let titleSafe = title.replace(/ /gi, '-')
    let item = document.createElement('li')
    item.setAttribute('data-url', url)
    item.setAttribute('data-title', titleSafe)
    item.classList.add('menu-item')
    item.innerHTML = '<a href="#' + titleSafe + '">' + title + '</a>'
    links.appendChild(item)
  })

  // create about section
  let about = document.querySelector('.about')
  about.innerHTML = data.about

  // load first link
  locationHashChanged()

  document.querySelector('#hamburger').addEventListener('click', (e) => {
    e.preventDefault()

    if (window.getComputedStyle(navigation).display == 'block') {
      navigation.style.display = 'none'
    } else {
      navigation.style.display = 'block'
    }
    menu.classList.toggle('border')
  })

  // create google analytics
  const analytics = data.analytics;
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')
  ga('create', analytics, 'auto')
  ga('send', 'pageview')

}).catch(function(err){
  console.warn('Something went wrong', err)
})

function locationHashChanged() {
  let hash = window.location.hash.replace('#', '')
  let item = document.querySelectorAll('.menu-item')
  let background = document.querySelector('#backgrnd')
  document.querySelectorAll('a').forEach(e => { e.classList.remove('active') })

  if (hash == '') {
    background.src = item[0].getAttribute('data-url')
    item[0].querySelector('a').classList.add('active')
  } else {
    item.forEach(element => {
      if (element.getAttribute('data-title') == hash) {
        background.src = element.getAttribute('data-url')
        element.querySelector('a').classList.add('active')
      }
    })
  }
}

function resize() {
  if (window.innerWidth <= 768) {
    navigation.style.display = 'none'
    menu.style.transform = ''
    draggable = false
  } else if (window.innerWidth > 768 && mobile != true) {
    navigation.style.display = 'block'
    draggable = true
  }
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  mobile = true
  body.classList.add('touch-device')
}

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

window.onhashchange = locationHashChanged
window.onresize = resize
resize()

// menu drag
let active = false
let currentX, currentY, initialX, initialY
let xOffset = 0
let yOffset = 0

if (draggable == true) {
  body.addEventListener('touchstart', dragStart, false)
  body.addEventListener('touchend', dragEnd, false)
  body.addEventListener('touchmove', drag, false)
  body.addEventListener('mousedown', dragStart, false)
  body.addEventListener('mouseup', dragEnd, false)
  body.addEventListener('mousemove', drag, false)
}

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset
    initialY = e.touches[0].clientY - yOffset
  } else {
    initialX = e.clientX - xOffset
    initialY = e.clientY - yOffset
  }

  if (e.target === menu) {
    active = true
    document.querySelector('iframe').style.pointerEvents = 'none'
  }
}
function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
  document.querySelector('iframe').style.pointerEvents = 'auto'
}
function drag(e) {
  if (active) {
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX
      currentY = e.touches[0].clientY - initialY
    } else {
      currentX = e.clientX - initialX
      currentY = e.clientY - initialY
    }

    xOffset = currentX
    yOffset = currentY

    setTranslate(currentX, currentY, menu)
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
