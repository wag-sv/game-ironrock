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

        this.pick = false;
        
        this.whiteBtn = new Image();
        this.whiteBtn.src = "../images/whiteBtn.png";
        this.greenBtn = new Image();
        this.greenBtn.src = "../images/greenBtn.png";
        this.redBtn = new Image();
        this.redBtn.src = "../images/redBtn.png";        
        this.yellowBtn = new Image();
        this.yellowBtn.src = "../images/yellowBtn.png";
        this.blueBtn = new Image();
        this.blueBtn.src = "../images/blueBtn.png";
        this.pinkBtn = new Image();
        this.pinkBtn.src = "../images/pinkBtn.png";
        
        this.greenBtnPress = false;
        this.redBtnPress = false;
        this.yellowBtnPress = false;
        this.blueBtnPress = false;
        this.pinkBtnPress = false;        

        this.greenNote = new Image();
        this.greenNote.src = "../images/greenNote.png";
        this.redNote = new Image();
        this.redNote.src = "../images/redNote.png";        
        this.yellowNote = new Image();
        this.yellowNote.src = "../images/yellowNote.png";
        this.blueNote = new Image();
        this.blueNote.src = "../images/blueNote.png";
        this.pinkNote = new Image();
        this.pinkNote.src = "../images/pinkNote.png";        
                
        this.greenNoteStartPositionX = 340;
        this.redNoteStartPositionX = 365;      
        this.yellowNoteStartPositionX = 390;
        this.blueNoteStartPositionX = 415;        
        this.pinkNoteStartPositionX = 440;

        this.match = new Image();
        this.match.src = "../images/match.png"; 

    }

    startGame = () => {
        this.drawFrets();

        this.song.play();
        this.guitar.play();
        this.intervalId = setInterval(this.updateGame, 10);

        

        // let loaded = 0;

        // const sync = () => {

        //     loaded++;
            
        //     if (loaded == 2) {
        //         this.song.play();
        //         this.guitar.play();
        //         this.intervalId = setInterval(this.updateGame, 10);             
        //     }
        // }

        // this.song.oncanplaythrough = sync();
        // this.guitar.oncanplaythrough = sync();
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
                if(note.color === 'g') note.x = this.greenNoteStartPositionX;
                if(note.color === 'r') note.x = this.redNoteStartPositionX;
                if(note.color === 'y') note.x = this.yellowNoteStartPositionX;
                if(note.color === 'b') note.x = this.blueNoteStartPositionX;
                if(note.color === 'p') note.x = this.pinkNoteStartPositionX;                
            });
            console.log(notes);
            this.startGame();
        }) 
        .catch(error => console.log(error));    
    }

    drawFrets = () => {
        

        if (this.greenBtnPress) context.drawImage(this.greenBtn, 70, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 70, 420, 100, 50);

        if (this.redBtnPress) context.drawImage(this.redBtn, 210, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 210, 420, 100, 50);
        
        if (this.yellowBtnPress) context.drawImage(this.yellowBtn, 350, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 350, 420, 100, 50);

        if (this.blueBtnPress) context.drawImage(this.blueBtn, 490, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 490, 420, 100, 50);
        
        if (this.pinkBtnPress) context.drawImage(this.pinkBtn, 630, 420, 100, 50);
        else context.drawImage(this.whiteBtn, 630, 420, 100, 50);

        
    }

    updateNotes = () => {
        for (let i = 0; i < this.notes.length; i++){
            this.notes[i].time -= 0.01;

            if (this.notes[i].time <= 4.2 && this.notes[i].time > -1) {
                this.notes[i].y += 0.952;
                this.notes[i].w += 0.1;
                this.notes[i].h += 0.05;

                if (this.notes[i].color === 'g') {
                    this.notes[i].x -= 0.57;
                }
                if (this.notes[i].color === 'r') {
                    this.notes[i].x -= 0.31;
                }
                if (this.notes[i].color === 'y') {
                    this.notes[i].x -= 0.05;
                }
                if (this.notes[i].color === 'b') {
                    this.notes[i].x += 0.23;
                }
                if (this.notes[i].color === 'p') {
                    this.notes[i].x += 0.48;
                }
                
                this.drawNote(this.notes[i]);
                
            }
            
        }

    }

    drawNote = (note) => {    
        let matchGreen = false;
        let matchRed = false;
        let matchYellow = false;
        let matchBlue = false;
        let matchPink = false;

        if (note.color === 'g') {
            if ((note.y + note.h) >= 440) {
                matchGreen = this.checkMatch(this.greenBtnPress);

                if(matchGreen) {
                    context.drawImage(this.match, 25, 265, 200, 200);
                }  
            } else {
                context.drawImage(this.greenNote, note.x, note.y, note.w, note.h);
            }        
        }

        if (note.color === 'r') {
            if ((note.y + note.h) >= 440) {
                matchRed = this.checkMatch(this.redBtnPress);

                if(matchRed) {
                    context.drawImage(this.match, 165, 265, 200, 200);
                }  
            } else {
                context.drawImage(this.redNote, note.x, note.y, note.w, note.h);
            }       
        }

        if (note.color === 'y') {
            if ((note.y + note.h) >= 440) {
                matchYellow = this.checkMatch(this.yellowBtnPress);

                if(matchYellow) {
                    context.drawImage(this.match, 305, 265, 200, 200);
                } 
            } else {
                context.drawImage(this.yellowNote, note.x, note.y, note.w, note.h);
            }       
        }

        if (note.color === 'b') {
            if ((note.y + note.h) >= 440) {
                matchBlue = this.checkMatch(this.blueBtnPress);

                if(matchBlue) {
                    context.drawImage(this.match, 445, 265, 200, 200);
                } 
            } else {
                context.drawImage(this.blueNote, note.x, note.y, note.w, note.h);
            }           
        }

        if (note.color === 'p') { 
            if ((note.y + note.h) >= 440) {
                matchPink = this.checkMatch(this.pinkBtnPress);

                if(matchPink) {
                    context.drawImage(this.match, 585, 265, 200, 200);
                } 
            } else {
                context.drawImage(this.pinkNote, note.x, note.y, note.w, note.h);
            }             
        }

        // if(this.frames % 100 === 0) {
        //     if(matchGreen || matchRed || matchYellow || matchBlue || matchPink){
        //         this.guitar.volume = 1;
        //     } else {
        //         this.guitar.volume = 0;
        //     }
        // }        

    }

    checkMatch = (notePress) => {
        if(notePress && this.pick) {
            if(this.frames % 500 === 0) {
                this.guitar.volume = 1;
            }
            
            return true;
        } else { 
            if(this.frames % 500 === 0) {
                this.guitar.volume = 0;
            }                       
            return false;
        }

        
    }

    clear = () =>  {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


    sync = () => {
        if (this.frames === 500) {
            this.guitar.currentTime = this.song.currentTime;
        }
    }

    updateGame = () =>  {
        this.frames += 10;
        this.sync();
        this.clear();  
        this.drawFrets();  
        this.updateNotes();
        
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
                    game.greenBtnPress = true;
                    break;
                case "F2":
                    game.redBtnPress = true;
                    break;
                case "F3":
                    game.yellowBtnPress = true;
                    break;
                case "F4":
                    game.blueBtnPress = true;
                    break;
                case "F5":
                    game.pinkBtnPress = true;
                    break;
                case "Enter":
                    game.pick = true;
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
                    game.greenBtnPress = false;
                    break;
                case "F2":
                    game.redBtnPress = false;
                    break;
                case "F3":
                    game.yellowBtnPress = false;
                    break;
                case "F4":
                    game.blueBtnPress = false;
                    break;
                case "F5":
                    game.pinkBtnPress = false;
                    break;
                case "Enter":
                    game.pick = false;
                    break;
                case "Escape":
                    console.log("Escape");
                    break;
            }
          });
    }
    
}
