const programs = {
    system: {
        runbox: {
            src: '/pages/apps/runbox.html',
            iconsrc: '/src/icons/exe.svg',
            width: '430px',
            height: '205px',
            title: 'Run',
            resizable: false,
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
            resizable: false,
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
            resizable: false,
            buttons: {
                close: true,
                resize: false,
                minimize: false
            }
        },
        design: {
            src: '/pages/apps/design.html',
            iconsrc: '/src/icons/exe.svg',
            width: '560px',
            height: '508px',
            title: 'Design test',
            resizable: true,
            buttons: {
                close: true,
                resize: true,
                minimize: true
            }
        }
    },
    other: {
        welcome: {
            src: '/pages/apps/welcome.html',
            iconsrc: '/src/icons/exe.svg',
            width: '800px',
            height: '624px',
            title: 'Welcome',
            resizable: true,
            buttons: {
                close: true,
                resize: true,
                minimize: true
            }
        }
    }
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
        case 'design':
            return programs.system.design;
        break;
        default:
            return [programs.system.msgbox, `Program '${input}' not found`];
        break;
    }
}