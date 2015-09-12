// the following variable counts player's moves
var move = 0;
// array that hold all images, including an empty image
var tiles = new Array(16);
tiles[0] = "<img src='1.png' />";
tiles[1] = "<img src='2.png' />";
tiles[2] = "<img src='3.png' />";
tiles[3] = "<img src='4.png' />";
tiles[4] = "<img src='5.png' />";
tiles[5] = "<img src='6.png' />";
tiles[6] = "<img src='7.png' />";
tiles[7] = "<img src='8.png' />";
tiles[8] = "<img src='9.png' />";
tiles[9] = "<img src='10.png' />";
tiles[10] = "<img src='11.png' />";
tiles[11] = "<img src='12.png' />";
tiles[12] = "<img src='13.png' />";
tiles[13] = "<img src='14.png' />";
tiles[14] = "<img src='15.png' />";
tiles[15] = "<img src='' />";

// this function displays elements of the array
// on the game field
function displayTiles() {
    for (var i = 0; i < tiles.length; i++) {
        document.getElementById('game').innerHTML += tiles[i];
    }
}

// this function rearranges elements in array
// by taking a random element from the array and pushing
// it in the biginning of the array
function rearrangeTiles() {
    for (var i = tiles.length; i > 0; i--) {
        var number = parseInt(Math.random() * (i - 0) + 0);
        tiles.push(String(tiles.splice(number, 1)));
    }
}

// this function clears the field after the rearrangement 
// of array elements and before displaying them again
function clearField() {
    document.getElementById('game').innerHTML = '';
}

// this function checks if the elements in the array are 
// in correct order. If true, it show the number of moves
// made by the player and prompt user to play again. if
// true, the page reloads and game starts again. If false,
// the message appears saying 'Thank you for playing!'.
function checkForWin() {
    if ((tiles[0] == "<img src='1.png' />") && (tiles[1] == "<img src='2.png' />") &&
        (tiles[2] == "<img src='3.png' />") && (tiles[3] == "<img src='4.png' />") &&
        (tiles[4] == "<img src='5.png' />") && (tiles[5] == "<img src='6.png' />") &&
        (tiles[6] == "<img src='7.png' />") && (tiles[7] == "<img src='8.png' />") &&
        (tiles[8] == "<img src='9.png' />") && (tiles[9] == "<img src='10.png' />") &&
        (tiles[10] == "<img src='11.png' />") && (tiles[11] == "<img src='12.png' />") &&
        (tiles[12] == "<img src='13.png' />") && (tiles[13] == "<img src='14.png' />") &&
        (tiles[14] == "<img src='15.png' />")) {

        if (confirm("You won! You made " + move + " move(s) in total! Do you want to play again?")) {
            window.location.reload();
        } else {
            document.write("<h1>Thank you for playing!</h1>");
        }
    }
}

// this function switches the empty and occupied tiles
function switchTiles(num, emptyTile) {
    var temp = tiles[tiles.indexOf("<img src='" + num + ".png' />")];
    tiles[tiles.indexOf("<img src='" + num + ".png' />")] = tiles[emptyTile];
    tiles[emptyTile] = temp;
}

// this function returns an index of the empty tile
function getEmptyTile() {
    return tiles.indexOf("<img src='' />");
}

// the following function returns an array of active tiles.
// It has a switch statement which uses an empty tile
// as an argument. We search for the index of the empty
// tile and look at the indexes of the elements around it
// i.e the empty tile is on the 4th position,then the  
// active tiles will be on positions 0, 5 and 8
//  -  -  -  -
// |0  1  2  3 |
// |4  5  6  7 |
// |8  9  10 11|
// |12 13 14 15|
//  -  -  -  -     
function getActiveTiles() {
    switch (getEmptyTile()) {
    case 4:
    case 8:
        return new Array((getEmptyTile() + 1), (getEmptyTile() + 4), (getEmptyTile() - 4));
        break;

    case 7:
    case 11:
        return new Array((getEmptyTile() - 1), (getEmptyTile() + 4), (getEmptyTile() - 4));
        break;

    case 1:
    case 2:
        return new Array((getEmptyTile() - 1), (getEmptyTile() + 1), (getEmptyTile() + 4));
        break;

    case 13:
    case 14:
        return new Array((getEmptyTile() - 1), (getEmptyTile() + 1), (getEmptyTile() - 4));
        break;

    case 0:
        return new Array((getEmptyTile() + 1), (getEmptyTile() + 4));
        break;

    case 15:
        return new Array((getEmptyTile() - 1), (getEmptyTile() - 4));
        break;

    case 5:
    case 6:
    case 9:
    case 10:
        return new Array((getEmptyTile() - 1), (getEmptyTile() + 1), (getEmptyTile() + 4), (getEmptyTile() - 4));
        break;

    case 3:
        return new Array((getEmptyTile() - 1), (getEmptyTile() + 4));
        break;

    case 12:
        return new Array((getEmptyTile() + 1), (getEmptyTile() - 4));
        break;
    }
}

// this function highlights active tiles (those that we can move).
// first, it removes the flashing from previously highlighted
// tiles, and after that assigns a class to new active tiles
// In result, when a player hovers one of the active tiles, 
// it [tile] gets highlighted
function highlightElement(activeTiles) {
    for (var i = 0; i < tiles.length; i++) {
        if (document.images[i].hasAttribute('class')) {
            document.images[i].removeAttribute('class');
        }
    }
    for (tile in activeTiles) {
        document.images[activeTiles[tile]].setAttribute('class', 'pic');
    }
}

//this is the main game logic
function gameLogic(n) {
    // at the beginning of the game we just display
    // and highlight active tiles
    if (arguments.length == 0) {
        displayTiles();
        highlightElement(getActiveTiles());
    } else {
        // if the user's input corresponds to one of the active tiles
        // then we switch the empty tile with the user's choice, 
        // update the game field, higlight new active tiles and 
        // increment player's moves. A the end we check for a winner.
        if (getActiveTiles().indexOf(tiles.indexOf("<img src='" + n + ".png' />")) != -1) {
            switchTiles(n, getEmptyTile());
            clearField();
            displayTiles();
            highlightElement(getActiveTiles());
            move++;
        }
        document.getElementById('move').textContent = move;
        checkForWin();
    }
    
}