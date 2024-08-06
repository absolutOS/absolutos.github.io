function popen(elmnt) {
    var num = parseInt(window.localStorage.getItem('windowsID')) + 1;
    window.localStorage.setItem('windowsID', num);

    var props = `?windowID=${num}`
    if (typeof(elmnt) == 'object' && elmnt.length == 2){
        props = `?windowID=${num}&msg=${elmnt[1]}`;
        elmnt = elmnt[0];
    }

    document.querySelector('.windows').insertAdjacentHTML('beforeend', `
        <div class="window ${elmnt.resizable ? "resizable" : ""}" id="window${num}" isMaximized="false" style="top: 15px; left: 15px; z-index: 990; width: ${elmnt.width}; height: ${elmnt.height}; min-width: ${elmnt.width}; min-height: ${elmnt.height};">
            <div class="windowtitle" id="window${num}title">
              <div class="windowheader" id="window${num}header">
                  ${elmnt.title}
              </div>
              <div class="buttons">
                  <div class="button ${elmnt.buttons.minimize ? "" : "inactive"}" id="minimize"><img id="window${num}minimize" src="/src/icons/minimize.svg"></div>
                  <div class="button ${elmnt.buttons.resize ? "" : "inactive"}" onclick="maximize(document.getElementById('window${num}'))" id="maximize"><img id="window${num}maximize" src="/src/icons/maximize.svg"></div>
                  <div class="button ${elmnt.buttons.close ? "" : "inactive"}" onclick="closewindow(document.getElementById('window${num}'))" id="close"><img id="window${num}close" src="/src/icons/close.svg"></div>
              </div>
            </div>
            <div class="content">
              <iframe id="window${num}iframe" src="${elmnt.src}${props}" width="100%" height="100%">
            </div>
        </div>
    `)

    document.getElementById('window'+num+'iframe').onload = function(){
        document.getElementById('window'+num+'iframe').contentDocument.querySelectorAll('.API_CLOSEAPP').forEach(function(e){e.onclick = function(){element.close(document.getElementById('window'+num))}})
        document.getElementById('window'+num+'iframe').contentDocument.querySelectorAll('.API_RUNAPP').forEach(function(e){e.onclick = function(){element.close(document.getElementById('window'+num)); popen(searchprograms(document.getElementById('window'+num+'iframe').contentDocument.getElementById('API_PROMPTOPENAPP').value));}})
    }

    element.drag(document.getElementById('window'+num))

    document.querySelector('.icons').insertAdjacentHTML('beforeend', `
        <div class="icon" id="iconwindow${num}">
            <img src="${elmnt.iconsrc}" width="25px"/>
        </div>
    `)

    document.querySelector('.box').insertAdjacentHTML('beforeend', `
        <div class="icon" winID="${num}" onclick="switchertoggle(); element.active(document.getElementById('window${num}')); taskbar.active(document.getElementById('window${num}').id.replace('window', ''));">
            <img src="${elmnt.iconsrc}" width="70px">
            <p>${elmnt.title}</p>
        </div>
    `)

    taskbar.active(num);
    element.active(document.getElementById('window'+num));
}


const process = {
    open: (e) => {popen(e)}
}