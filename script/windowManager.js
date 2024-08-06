var lastactive = document.getElementById('window0');

try {
  window.localStorage.getItem('windowsID')
} catch (e) {
  window.localStorage.setItem('windowsID', 0);
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (!tisactive(elmnt.id.replace('window', ''))){
        tactive(elmnt.id.replace('window', ''));
        activeElement(elmnt);
    }
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    var attr = elmnt.getAttribute('isMaximized');
    if (attr == 'true') {
        var props = window.localStorage.getItem(`_TEMP_${elmnt.id}pos`).split('_');
        elmnt.style.width = props[2] + 'px';
        elmnt.style.height = props[3] + 'px';
        elmnt.style.left = Math.floor(e.clientX / 2) + 'px';
        elmnt.setAttribute('isMaximized', 'false');
        try {
            document.getElementById(elmnt.id+'maximize').src = attr == 'true' ? '/src/icons/maximize.svg' : '/src/icons/unmaximize.svg'; 
        } catch (e) {
            console.error(e)
        }
    }
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function maximizeElement(elmnt){
    if (!tisactive(elmnt.id.replace('window', ''))){
      activeElement(elmnt);
      tactive(elmnt.id.replace('window', ''))
    }
    var attr = elmnt.getAttribute('isMaximized');
    if (attr == 'true'){
        var props = window.localStorage.getItem(`_TEMP_${elmnt.id}pos`).split('_');
        elmnt.style.width = props[2] + 'px';
        elmnt.style.height = props[3] + 'px';
        elmnt.style.top = props[0];
        elmnt.style.left = props[1];
        elmnt.setAttribute('isMaximized', 'false');
        window.localStorage.removeItem(`_TEMP_${elmnt.id}pos`);
    } else {
        window.localStorage.setItem(`_TEMP_${elmnt.id}pos`, `${elmnt.style.top}_${elmnt.style.left}_${elmnt.offsetWidth}_${elmnt.offsetHeight}`)
        elmnt.style.width = window.innerWidth + 'px';
        elmnt.style.height = (window.innerHeight - 40) + 'px';
        elmnt.style.top = 0;
        elmnt.style.left = 0;
        elmnt.setAttribute('isMaximized', 'true');
    }
    try {
        document.getElementById(elmnt.id+'maximize').src = attr == 'true' ? '/src/icons/maximize.svg' : '/src/icons/unmaximize.svg'; 
    } catch (e) {
        console.error(e)
    }
}

function closeElement(elmnt){
  elmnt.classList.add('closed');
  if (document.getElementById('icon'+elmnt.id).classList.contains('appactive'))
    document.getElementById('icon'+elmnt.id).classList.remove('appactive');
  document.getElementById('icon'+elmnt.id).classList.add('closedicon');
  document.getElementById('switcher').querySelector(`.icon[winID="${elmnt.id.replace('window', '')}"]`).remove();
  setTimeout(function(){
    document.getElementById('icon'+elmnt.id).remove();
    elmnt.remove();
  }, 500);
  if (document.querySelectorAll('.window')[document.querySelectorAll('.window').length - 2]) {
    tactive(document.querySelectorAll('.window')[document.querySelectorAll('.window').length - 2].id.replace('window', ''));
    activeElement(document.querySelectorAll('.window')[document.querySelectorAll('.window').length - 2]);
  }
}

function activeElement(elmnt){
  try {
    inactiveElement();
    elmnt.classList.add('active');
    lastactive = elmnt;
    document.getElementById('switcher').querySelector(`.icon[winID="${elmnt.id.replace('window', '')}"]`).classList.add('active');
  } catch (e) {
    console.log('Non-critical error.', e)
  }
}

function inactiveElement(){
  document.getElementById('switcher').querySelectorAll('.icon').forEach(function(e){e.classList.remove('active')});
  document.querySelectorAll('.window').forEach(function(e){e.classList.remove('active')});
}

function tinactive(){
  document.querySelectorAll('.icon').forEach(function(e){e.classList.remove('appactive')});
}

function tactive(elmntID){
  try {
    tinactive();
    document.getElementById('iconwindow'+elmntID).classList.add('appactive');
  } catch (e){
    console.log('Non-critical error.')
  }
}

function tisactive(elmntID){
  return document.getElementById('iconwindow'+elmntID).classList.contains('appactive');
}


const element = {
    maximize: (e) => {maximizeElement(e)},
    drag: (e) => {dragElement(e)},
    close: (e) => {closeElement(e)},
    active: (e) => {activeElement(e)},
    inactiveall: () => {inactiveElement()},
    last: () => {return lastactive}
}

const taskbar = {
    inactiveall: () => {tinactive()},
    active: (e) => {tactive(e)}
}