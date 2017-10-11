if (typeof browser !== 'undefined') {
  chrome = browser
}

function requestAddScript (name) {
  chrome.runtime.sendMessage({
    method: 'addScript',
    data: `dist/js/${name}.js`
  })
}
window.addEventListener('message', function (event) {
  if (event.source !== window) {
    return
  }

  if (event.data.type === 'yunData') {
    window.yunData = event.data.data
    if (window.location.href.includes('/disk/home')) {
      requestAddScript('home')
    } else if (window.location.href.includes('/pcloud/album/')) {
      requestAddScript('album')
    } else {
      requestAddScript('share')
    }
  }
})

function addBaiduJS () {
  let script = document.createElement('script')
  script.src = chrome.runtime.getURL('dist/js/baidu.js')
  document.body.appendChild(script)
}

if (document.readyState === 'complete') {
  addBaiduJS()
} else {
  window.addEventListener('load', addBaiduJS)
}
