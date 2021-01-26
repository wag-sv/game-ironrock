const song = "../songs/Queen/Killer Queen/song.ogg"
const guitar = "../songs/Queen/Killer Queen/guitar.ogg"
const notes = "../songs/Queen/Killer Queen/notes.mid"

const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

window.onload = () => {
    
    document.getElementById("startBtn").onclick = () => {
        const welcomeScreen = document.getElementById("welcomeScreen");
        welcomeScreen.style.display = "none";        
        canvas.style.display = "block";
        const game = new Game(song, guitar, notes);
        game.startGame();
    }
}


class Game {
    constructor (song, guitar, notes) {
        this.song = new Audio(song);
        this.guitar = new Audio(guitar);
        this.notes = this.organizeNotes(notes);
        this.frames = 0;
        this.score = 0;
    }

    organizeNotes() {
        
    }

    startGame() {

    }
    
}










// const start = document.getElementById("start");
// const playBtn = document.createElement("button");
// const pauseBtn = document.createElement("button");
// const volumeBtn = document.createElement("button");
// playBtn.innerText = "Play";
// pauseBtn.innerText = "Pause";
// volumeBtn.innerText = "Volume";


// canvas.appendChild(playBtn);
// canvas.appendChild(pauseBtn);
// canvas.appendChild(volumeBtn);
// playBtn.addEventListener("click", event => {
//     song.play();
//     guitar.play();
// });
// pauseBtn.addEventListener("click", event => {
//     guitar.volume = 0.0;
// });
// volumeBtn.addEventListener("click", event => {
//     guitar.volume = 1.0;
// });


// start.addEventListener("click", event => { 
//     body.appendChild(playBtn);
//     body.appendChild(pauseBtn);
//     body.appendChild(volumeBtn);
//     playBtn.addEventListener("click", event => {
//         song.play();
//         guitar.play();
//         rhythm.play();
//     });
//     pauseBtn.addEventListener("click", event => {
//         guitar.volume = 0.0;
//     });
//     volumeBtn.addEventListener("click", event => {
//         guitar.volume = 1.0;
//     });

//     // song.addEventListener("canplay", event => {
//     //     guitar.addEventListener("canplay", event => {
//     //         rhythm.addEventListener("canplay", event => {
//     //             body.appendChild(playBtn);
//     //             body.appendChild(pauseBtn);
//     //             body.appendChild(volumeBtn);
//     //             playBtn.addEventListener("click", event => {
//     //                 song.play();
//     //                 guitar.play();
//     //                 rhythm.play();
//     //             });
//     //             pauseBtn.addEventListener("click", event => {
//     //                 guitar.volume = 0.0;
//     //             });
//     //             volumeBtn.addEventListener("click", event => {
//     //                 guitar.volume = 1.0;
//     //             });
//     //         });
//     //     });
//     // });
// });



document.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.key) {
        case "F1":
            console.log("F1")
            break;
        case "F2":
            console.log("F2")
            break;
        case "F3":
            console.log("F3");
            break;
        case "F4":
            console.log("F4");
            break;
        case "Enter":
            console.log("Enter");
            break;
        case "Escape":
            console.log("Escape");
            break;
    }
  });