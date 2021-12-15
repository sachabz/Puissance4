$("#Game").ready(function () {
    const p4game = Object.create(p4);
    p4game.initp4();
    $('#restart').on('click', function(){
        $('#game').empty();
        p4.drawGame();
        $('#restart').css('visibility', 'hidden');

    })
});