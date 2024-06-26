const keyBoard = {
    q: 'C1',
    '2': 'Db1',
    w: 'D1',
    3: 'Eb1',   
    e: 'E1',
    r: 'F1',
    5: 'Gb1',
    t: 'G1',
    6: 'Ab1',
    y: 'A1',
    7: 'Bb1',
    u: 'B1',
};

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");
importMusicFile = document.getElementById('importMusicFile');

const keys = document.querySelectorAll(".key");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const destination = audioContext.createMediaStreamDestination();
const mediaRecorder = new MediaRecorder(destination.stream);

//TESTING
const history = document.querySelector('#history');

let recordedChunks = [];
let recordedKeys = [];
let startTime = 0;
let allKeys = [];

pianoKeys.forEach(key => {
    allKeys.push(key.getAttribute('data-note')); // adding data-note value to the allKeys array
    key.addEventListener("click", () => playSound(key.getAttribute('data-note')));
});
let audio;


//TO FIX
const handleVolume = (e) => {
    //window.sound = 0;
    console.log(e.target.value)
};

const showHideKeys = () => {
pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
    if (allKeys.includes(e.key))  {
        playSound(keyBoard[e.key]);
        history.innerText += ` ${keyBoard[e.key]} `;
    }

};

const replayRecordedKeys = (recordedKeys) => {

    if(recordedKeys.length === 0) return;

    recordedKeys.forEach(key => {
        setTimeout(() => {
            playSound(key.note)
        }, key.time * 1000);
    });
}

const importRecordedKeys = (file) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
        const recordedKeys = JSON.parse(ev.target.result);
        replayRecordedKeys(recordedKeys);
    }

    reader.readAsText(file);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("click", handleVolume);
document.addEventListener("keydown", pressedKey);
importMusicFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        importRecordedKeys(file);
    }
});
//

keys.forEach((div) => {
    div.addEventListener('click', (event) => {
        console.log(div.getAttribute('data-note'));

        recordedKeys.push({
            note: `${div.getAttribute('data-note')}`,
            time: (audioContext.currentTime - startTime),
        })

        console.log(audioContext.currentTime - startTime);

        //ADDED recently
        history.innerText += ` ${div.getAttribute('data-note')} `;

        playSound(div.getAttribute('data-note'));
    });
});


const playSound = (note) => {
    audio = new Audio(`../music_sounds/${note}.mp3`); 

    const clickedKey = document.querySelector(`[data-note="${note}"]`); 
    if (clickedKey) {
        clickedKey.classList.add("active"); 
        setTimeout(() => { 
            clickedKey.classList.remove("active");
        }, 150);
    }

    const sound = audioContext.createMediaElementSource(audio);
    sound.connect(audioContext.destination);
    sound.connect(destination);
    audio.play();
}

document.addEventListener('keydown', (ev) => {
    if(ev.repeat) 
        return;
    
    console.log(`${ev.key} pressed`);

    const key = keyBoard[ev.key];
    if(key)  {
        playSound(key);

        recordedKeys.push({
            note: keyBoard[ev.key],
            time: audioContext.currentTime - startTime,
        })
    }
});

document.querySelector('#preview').onclick = () => {
    // recordedChunks = [];
    // recordedKeys = [];
    // startTime = audioContext.currentTime;
    // console.log(audioContext.currentTime);
    // mediaRecorder.start();
    // console.log('Recording started');

    startTime = recordedKeys[0].time;
    
    recordedKeys.forEach(key => {
        key.time -= startTime;
        setTimeout(() => {
            playSound(key.note)
        }, key.time * 1000);
    });

}

document.querySelector('#export').onclick = () => {
    mediaRecorder.stop();
    console.log('Recording stopped');
    exportRecordedKeys();

    recordedKeys.forEach((key) => {
        key.time = recordedKeys[0].time;
    });

    startTime = 0;
}

function exportRecordedKeys() {
    const blob = new Blob([JSON.stringify(recordedKeys)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const newElement = document.createElement('a');
   
    newElement.style.display = "none";
    newElement.href = url;

    const fileName = window.prompt('Save file as:');
    newElement.download = fileName;
   
    document.body.appendChild(newElement);
    newElement.click();
    window.URL.revokeObjectURL(url);

    recordedKeys = [];
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

    id = id == 4 ? 1 : ++id;

    changePiano(id);
})

prev.addEventListener('click', (ev) => {
    const previous =  document.getElementById(`piano-${id}`);
    previous.classList.remove('active');

    id = id == 1 ? 4 : --id;

    document.getElementById(`piano-${id}`).classList.add('active');
    changePiano(id);
})

function changePiano(pos) {
    
    document.getElementById(`piano-${pos}`).classList.add('active');

    const visibleArr = Array.from(document.querySelectorAll(`#piano-${id} div`));

    console.log(visibleArr);

    console.log(Object.keys(keyBoard));//.forEach((key, index) => {
    //     //keyBoard[key] = visibleArr[index].getAttribute('data-note');
    //     console.log(key);
    // });
}


document.querySelector('#share').addEventListener('click', (ev) => {
    const blob = new Blob([JSON.stringify(recordedKeys)], {'type': 'application/json'});
   
    const url = URL.createObjectURL(blob);

    const element = document.createElement('a');

    element.href = url;
    element.textContent = "daka";
    element.onclick = () => {
        element.download = element.textContent;
    }
    document.body.appendChild(element);

})