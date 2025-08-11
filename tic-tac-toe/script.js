const GameBoard = (function () {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => [...board];

    const update = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            render();
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        render();
    };
    
  const render = () => {
    const cells = document.querySelectorAll(".cell");
    getBoard().forEach((mark, index) => {
        const cell = cells[index];
        cell.textContent = mark;
        cell.dataset.index = index;
        cell.classList.remove('x', 'o'); // Always remove both
        if (mark) {
            cell.classList.add(mark); // Add 'x' or 'o' based on mark
        }
    });
};


    return { getBoard, update, resetBoard ,render };
})();

const player = (name, mark) => {
    return { name, mark };
};

const GameFlow = (() => {
    let player1 = player("aathi", 'x');
    let player2 = player("chow", 'o');
    let currentplayer = player1;
    let gameover = false;

    const switchPlayer = () => {
        currentplayer = currentplayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const board = GameBoard.getBoard();
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of wins) {
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                gameover = true;
                //   alert(`Winner: ${currentplayer.name} (${board[a]})`);
                  document.getElementById("message").innerHTML=`winner is player ${currentplayer.mark}`
                return true;
            }
        }
        if (!board.includes("")) {
            gameover = true;
             alert("It's a tie!");
            return "It's a tie!";
        }
        return null;
    };

    const play = (index) => {
        
        if (gameover) {
            console.log("Game is over. Please reset.");
            return;
        }

        if (GameBoard.update(index, currentplayer.mark)) {
            const result = checkWin();
            console.log(GameBoard.getBoard()); // Show board after each move
            if (result) {
                console.log(result);
            } else {
                switchPlayer();
                console.log(`Next Turn: ${currentplayer.name}`);
            }
        } else {
            console.log("Invalid move! Try another spot.");
        }
    };

    function reset() {
        GameBoard.resetBoard();
        currentplayer = player1;
        gameover = false;
        console.log("Game reset. Let's play!");
        console.log(GameBoard.getBoard());
        console.log(`First Turn: ${currentplayer.name}`);
    }

    return { play, reset };
})();

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        GameFlow.play(index);
    });
});
document.getElementById("restart")?.addEventListener("click", () => {
    GameFlow.reset();
});
GameBoard.render();