const programs = {
    system: {
        runbox: {
            src: '/pages/apps/runbox.html',
            iconsrc: '/src/icons/exe.svg',
            width: '430px',
            height: '205px',
            title: 'Run',
            buttons: {
                close: true,
                resize: false,
                minimize: true
            }
        },
        ver: {
            src: '/pages/apps/ver.html',
            iconsrc: '/src/icons/exe.svg',
            width: '460px',
            height: '210px',
            title: 'absolutOS version',
            buttons: {
                close: true,
                resize: false,
                minimize: true
            }
        },
        msgbox: {
            src: '/pages/apps/msgbox.html',
            iconsrc: '/src/icons/error.svg',
            width: '560px',
            height: '150px',
            title: 'Error',
            buttons: {
                close: true,
                resize: false,
                minimize: false
            }
        }
    },
    other: {}
}

// TEST RUN APP

function searchprograms(input){
    switch(input){
        case 'ver':
            return programs.system.ver;
        break;
        case 'runbox':
            return programs.system.runbox;
        break;
        default:
            return [programs.system.msgbox, `Program '${input}' not found`];
        break;
    }
}