//Menu created will allow user to provide Game Development Studios, some of their most popular games, and the genre of game that it is

class Game {                                        //Creates the game class that will contain the names of the games from the studio as well as the genre of the game
    constructor(name, genre){
        this.name = name;
        this.genre = genre;
    }
    describe() {
        return `${this.name} - ${this.genre}`
    }
}


class Studio {                                      // Creates the studio class that will contain the names of the studio as well as an array of games from that studio
    constructor(studio) {
        this.studio = studio
        this.games = [] 
    }

    addGame(game) {                                 //adds function to add a game to the studios game array
        if (game instanceof Game) {
            this.games.push(game)
        }else {
            throw new Error(`You can only add an instance of Game. Current input is not a game: ${game}`)
        }
    }
    describe() {                                    //informs user as to how many games the current studio has on file
        return `The studio ${this.studio} currently has ${this.games.length} games on file`
    }
}

class Menu {                            //Begins Menu Class
    constructor() {
        this.studios = [];                      //Sets up the studios array and the selected studio variable within the menu class
        this.selectedStudio = null;
    }
    startMenu(){                                //Using a switch this section of code provides the first page of the menu that the user will see and gives them 5 options
        let selection = this.showMenuOptions();
        while (selection !=0) {
            switch (selection){
                case '1':
                    this.addStudio();
                    break;
                case '2':
                    this.viewStudios();
                    break;
                case '3':
                    this.deleteStudio();
                    break;
                case '4':
                    this.viewStudiosGames();
                    break;
                default :
                    selection = 0
                   
            }
            selection = this.showMenuOptions();
        

        }

        alert(`Goodbye!`);                        //If the selection from the user is 0, the while loop is skipped and the alert goodbye is sent to the user
    }

    showMenuOptions(){   //This is the functions that provides the user with the physical menu and then transmits the information receved from the user and sends it to the start menu 
        return prompt (`                          
        0) Exit
        1) Add Studio
        2) View Studios
        3) Delete Studio
        4) View Studios Games
        `);
    }

    showStudioMenuOptions(studioInfo) {  // This created the physical menu for the user while they are in the studio games menu and sends the information to the viewstudiosgames function
        return prompt(`
        0) Back
        1) Create Game
        2) Delete Game
        -----------------
        ${studioInfo}
        `)
    }

    viewStudios(){                    //Creates a string of all the current studios 
        let studioString = '';
        for (let i = 0; i < this.studios.length; i++) {
            studioString += i + ') ' + `${this.studios[i].studio}` + '\n';
        }
        alert(studioString);
    }

    addStudio(){                     //Prompts the user to input a new studio and then adds it to the studio array
        let studio = prompt('Enter Studio Name');
        this.studios.push(new Studio(studio));
    }
 
    viewStudiosGames(){             // Creates the function for the user to view the games within the studio
        let index = prompt('Enter index for studio you wish to view');
        if (index > -1 && index < this.studios.length) {              //Prevents the user from entering an index that does not exist
            this.selectedStudio = this.studios[index];
            let studioName = this.selectedStudio.describe() + '\n' ;     //Creates a variable to be called later that informs the user of the current studio and how many games there are
            
            for (let i = 0; i < this.selectedStudio.games.length; i++) {
            studioName += i + ') ' + this.selectedStudio.games[i].describe();   //Displays the game name and genre of game
            }
            let selection = this.showStudioMenuOptions(studioName); //provides the user the option to create or delete a game in the current studio
            switch (selection) {
                case '1':
                    this.createGame();
                    break;
                case '2':
                    this.deleteGame();

            }
        }
    }
    
    createGame() {
        let name = prompt('Enter new game.')
        let genre = prompt('Enter the genre of the game')
        this.selectedStudio.games.push(new Game (name, genre));
    }

    deleteGame(){
        let index = prompt('Enter the number of the game you wish to delete.')
        if (index > -1 && index < this.selectedStudio.games.length) {
            this.selectedStudio.games.splice(index, 1);
        }
    }

    deleteStudio(){
        let index = prompt('Enter the number of the studio you wish to delete.')
        if (index > -1 && index < this.studios.length) {
            this.studios.splice(index, 1);
        }
    }

}

let menu = new Menu();
menu.startMenu();

