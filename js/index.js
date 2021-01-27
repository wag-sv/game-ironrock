const song = "../songs/song.ogg"
const guitar = "../songs/guitar.ogg"
const jsonNotes = "../songs/notesStart.json"

const canvas = document.getElementById("gameArea");
const context = canvas.getContext("2d");

class Game {
    constructor (song, guitar, jsonNotes) {
        this.song = new Audio(song);
        this.guitar = new Audio(guitar);
        this.jsonNotes = jsonNotes;
        this.notes = [];
        this.frames = 0;
        this.score = 0;
        this.intervalId = 0;
        
        this.whiteBtn = new Image();
        this.whiteBtn.src = "../images/whiteBtn.png";
        this.blueBtn = new Image();
        this.blueBtn.src = "../images/blueBtn.png";
        this.greenBtn = new Image();
        this.greenBtn.src = "../images/greenBtn.png";
        this.yellowBtn = new Image();
        this.yellowBtn.src = "../images/yellowBtn.png";
        this.orangeBtn = new Image();
        this.orangeBtn.src = "../images/orangeBtn.png";
        this.redBtn = new Image();
        this.redBtn.src = "../images/redBtn.png";
        
        this.blueBtnPress = false;
        this.greenBtnPress = false;
        this.yellowBtnPress = false;
        this.orangeBtnPress = false;
        this.redBtnPress = false;

        this.blueNote = new Image();
        this.blueNote.src = "../images/blueNote.png";
        this.greenNote = new Image();
        this.greenNote.src = "../images/greenNote.png";
        this.yellowNote = new Image();
        this.yellowNote.src = "../images/yellowNote.png";
        this.orangeNote = new Image();
        this.orangeNote.src = "../images/orangeNote.png";
        this.redNote = new Image();
        this.redNote.src = "../images/redNote.png";
        
        this.blueNoteStartPositionX = 340;        
        this.greenNoteStartPositionX = 365;        
        this.yellowNoteStartPositionX = 390;        
        this.orangeNoteStartPositionX = 415;        
        this.redNoteStartPositionX = 440;
        
    }

    startGame = () => {
        this.drawFrets();
        // this.song.play();
        // this.guitar.play();
        // this.intervalId = setInterval(this.updateGame, 10); 

        this.song.addEventListener("canplay", event => {
            console.log("song loaded")
            this.guitar.addEventListener("canplay", event => {
                console.log("guitar loaded")
                this.song.play();
                this.guitar.play();
                this.intervalId = setInterval(this.updateGame, 10); 
            });
        });
    }    

    getNotes = () =>  {        
        const readJson = async () => {
            const request = await fetch(this.jsonNotes);
            const notes = await request.json();
            

            return notes;
        }
        readJson()
        .then(notes => {
            notes.map(note => {
                this.notes.push(note)
                if(note.color === 'b') note.x = this.blueNoteStartPositionX = 340;
                if(note.color === 'g') note.x = this.greenNoteStartPositionX = 365;
                if(note.color === 'y') note.x = this.yellowNoteStartPositionX = 390;
                if(note.color === 'o') note.x = this.orangeNoteStartPositionX = 415;
                if(note.color === 'r') note.x = this.redNoteStartPositionX = 440;
            });
            console.log(notes);
            this.startGame();
        }) 
        .catch(error => console.log(error));    
    }

    drawFrets = () => {
        if (this.blueBtnPress) context.drawImage(this.blueBtn, 70, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 70, 420, 100, 50);

        if (this.greenBtnPress) context.drawImage(this.greenBtn, 210, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 210, 420, 100, 50);
        
        if (this.yellowBtnPress) context.drawImage(this.yellowBtn, 350, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 350, 420, 100, 50);
        
        if (this.orangeBtnPress) context.drawImage(this.orangeBtn, 490, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 490, 420, 100, 50);

        if (this.redBtnPress) context.drawImage(this.redBtn, 630, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 630, 420, 100, 50);
    }

    updateNotes = () => {
        for (let i = 0; i < this.notes.length; i++){
            this.notes[i].time -= 0.01;

            if (this.notes[i].time <= 4.2 && this.notes[i].time >= 0) {
                this.notes[i].y += 0.952;
                this.notes[i].w += 0.1;
                this.notes[i].h += 0.05;
                if (this.notes[i].color === 'b') {
                    this.notes[i].x -= 0.57;
                }
                if (this.notes[i].color === 'g') {
                    this.notes[i].x -= 0.31;
                }
                if (this.notes[i].color === 'y') {
                    this.notes[i].x -= 0.05;
                }
                if (this.notes[i].color === 'o') {
                    this.notes[i].x += 0.23;
                }
                if (this.notes[i].color === 'r') {
                    this.notes[i].x += 0.48;
                }
                this.drawNote(this.notes[i]);
            }
            
        }

    }

    drawNote = (note) => {
        if (note.color === 'b') {                      
            context.drawImage(this.blueNote, note.x, note.y, note.w, note.h);
        }

        if (note.color === 'g') {      
            context.drawImage(this.greenNote, note.x, note.y, note.w, note.h);
        }

        if (note.color === 'y') {          
            context.drawImage(this.yellowNote, note.x, note.y, note.w, note.h);
        }

        if (note.color === 'o') {         
            context.drawImage(this.orangeNote, note.x, note.y, note.w, note.h);
        }

        if (note.color === 'r') {          
            context.drawImage(this.redNote, note.x, note.y, note.w, note.h);
        }


    }

    clear = () =>  {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    updateGame = () =>  {
        this.clear();  
        this.drawFrets();    
        // this.moveNotes();
        this.updateNotes();
        // this.drawFrets();
        // this.updateScore();
        // this.checkGameEnd();
    }    
    
}

window.onload = () => {
    
    document.getElementById("startBtn").onclick = () => {
        const welcomeScreen = document.getElementById("welcomeScreen");
        welcomeScreen.style.display = "none";        
        canvas.style.display = "block";

        const game = new Game(song, guitar, jsonNotes);
        game.getNotes();

        document.addEventListener("keydown", (e) => {
            e.preventDefault();
            switch (e.key) {
                case "F1":
                    game.blueBtnPress = true;
                    break;
                case "F2":
                    game.greenBtnPress = true;
                    break;
                case "F3":
                    game.yellowBtnPress = true;
                    break;
                case "F4":
                    game.orangeBtnPress = true;
                    break;
                case "F5":
                    game.redBtnPress = true;
                    break;
                case "Enter":
                    console.log("Enter");
                    break;
                case "Escape":
                    console.log("Escape");
                    break;
            }
          });
        
          document.addEventListener("keyup", (e) => {
            e.preventDefault();
            switch (e.key) {
                case "F1":
                    game.blueBtnPress = false;
                    break;
                case "F2":
                    game.greenBtnPress = false;
                    break;
                case "F3":
                    game.yellowBtnPress = false;
                    break;
                case "F4":
                    game.orangeBtnPress = false;
                    break;
                case "F5":
                    game.redBtnPress = false;
                    break;
                case "Enter":
                    console.log("Enter");
                    break;
                case "Escape":
                    console.log("Escape");
                    break;
            }
          });
    }
    
}
