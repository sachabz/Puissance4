const p4 = {
    initp4: function () {
        this.COL = 8;
        this.ROW = 6;
        this.selector = "#Game";
        this.player = 'red';

        this.drawGame();
        this.listen();
        this.checkwin();
    },

    drawGame: function () {
        const $game = $(this.selector);
        console.log("game", $game);

        for (let row = 0; row < this.ROW; row++) {
            const $row = $('<div>').addClass('row');
            for (let col = 0; col < this.COL; col++) {
                const $col = $('<div>').addClass('col empty').attr("data-col", col).attr("data-row", row);
                $row.append($col);
            }
            $game.append($row);
        }
    },

    listen: function () {
        //search for the last empty cell
        const $game = $(this.selector);
        const that = this;
        function lastCase(col) {
            const $cells = $(`.col[data-col='${col}']`);
            for (let i = $cells.length - 1; i >= 0; i--) {
                const $cell = $($cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }
        $game.on('mouseenter', '.col.empty', function () {
            const $col = $(this).data('col');
            const $last = lastCase($col);
            if ($last != null) {
                $last.addClass(`p${that.player}`);
            }
        });

        $game.on('mouseleave', '.col', function () {
            $('.col').removeClass(`p${that.player}`);
        });

        $game.on('click', '.col.empty', function () {
            var score = 0;
            const col = $(this).data('col');
            const $last = lastCase(col);
            $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', `${that.player}`);
            const winner = that.checkwin($last.data('row'), $last.data('col'));

            that.player = (that.player === 'red') ? 'yellow' : 'red';
            $(".player").html(`${that.player} : your turn`).css('color', `${that.player}`);

            if (winner) {
                console.log(`la cousleur ${winner} a gagné`);
                $('#restart').css('visibility', 'visible');
                $(".Win").html(`${winner} : You Win !`).css('color', `${winner}`);
                rotate.play();
                $('#Game').unbind('click');
                $('.player').remove();
                score++;
                gameLoop();
                return;
            }
        });

    },

    checkwin: function (row, col) {
        const that = this;
        function $getCell(i, j) {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }
        function checkdirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 && i < that.ROW && j >= 0 && j < that.COL && $next.data('player') === that.player) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }
        function checkWin(directionA, directionB) {
            const total = 1 + checkdirection(directionA) + checkdirection(directionB);
            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        function checkHori() {
            return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
        }

        function checkVerti() {
            return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
        }

        function checkDiag1() {
            return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
        }

        function checkDiag2() {
            return checkWin({ i: 1, j: -1 }, { i: -1, j: 1 });
        }

        return checkHori() || checkVerti() || checkDiag1() || checkDiag2();

    }

}