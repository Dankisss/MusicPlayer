const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune

const playTune = (key) => {
audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed 
audio.play(); // playing audio

const clickedKey = document.querySelector(`[data-note="${key}"]`); // getting clicked key element
if (clickedKey) {
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);
}
};

pianoKeys.forEach(key => {
allKeys.push(key.getAttribute('data-note')); // adding data-note value to the allKeys array
// calling playTune function with passing data-note value as an argument
key.addEventListener("click", () => playTune(key.getAttribute('data-note')));
});

const handleVolume = (e) => {
audio.volume = e.target.value; // passing the range slider value as an audio volume
};

const showHideKeys = () => {
// toggling hide class from each key on the checkbox click
pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
// if the pressed key is in the allKeys array, only call the playTune function
if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

//
const arrayKeys = [
    'C1',
    'D1',
    'E1',
    'F1',
    'G1',
    'A1',
    'B1',
    'C2',
    'D2',
    'E2',
    'F2',
    'G2',
    'A2',
    'B2',
];

const keyBoard = {
    a: 'C1',
    s: 'D1',
    d: 'E1',
    f: 'F1',
    g: 'G1',
    h: 'A1',
    j: 'B1',
};

const keys = document.querySelectorAll(".key");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const destination = audioContext.createMediaStreamDestination();
const mediaRecorder = new MediaRecorder(destination.stream);
let recordedChunks = [];

keys.forEach((div) => {
    div.addEventListener('click', (event) => {
        console.log(div.getAttribute('data-note'))
        playSound(div.getAttribute('data-note'));
    });
});

document.addEventListener('keydown', (ev) => {
    if(ev.repeat) 
        return;

    console.log(`${ev.key} pressed`);

    const key = keyBoard[ev.key];
    if(key) 
        playSound(key);
});

function playSound(note) {
    const audio = new Audio(`../music_sounds/${note}.mp3`);
    const sound = audioContext.createMediaElementSource(audio);
    sound.connect(audioContext.destination);
    sound.connect(destination);
    audio.play();
}

document.querySelector('#startRecording').onclick = () => {
    mediaRecorder.start();
    console.log('Recording started');
}


document.querySelector('#stopRecording').onclick = () => {
    mediaRecorder.stop();
    console.log('Recording stopped');
}

mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
    }
}

mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });
    recordedChunks = [];
    const audioURL = URL.createObjectURL(blob);
    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = audioURL;
    document.body.appendChild(audioElement);
}

let id = 1;
document.getElementById(`piano-${id}`).classList.add('active');

const next = document.getElementById('next');
const prev = document.getElementById('prev');

next.addEventListener('click', (ev) => {
    
    document.getElementById(`piano-${id}`).classList.remove('active');

    id = id == 7 ? 1 : ++id;

    changePiano(id);
})

prev.addEventListener('click', (ev) => {
    
    document.getElementById(`piano-${id}`).classList.remove('active');

    id = id == 1 ? 7 : --id;

    changePiano(id);
})

function changePiano(pos) {
    
    document.getElementById(`piano-${pos}`).classList.add('active');

    const visibleArr = Array.from(document.querySelectorAll(`#piano-${id} div`));

    Object.keys(keyBoard).forEach((key, index) => {
        keyBoard[key] = visibleArr[index].getAttribute('data-note');
    });
}


