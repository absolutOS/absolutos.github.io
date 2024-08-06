var audio = document.createElement('audio');

const sound = {
    play: (e) => {audio.src = e; audio.play();},
    get: {
        error: '/src/media/error.wav',
        login: '/src/media/login.wav',
        exit: '/src/media/exit.wav'
    }
}