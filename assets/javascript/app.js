var Trivia = Trivia || {};
Trivia = (function () {
    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var currentQuestionIndex = 0;
    var disabled = false;
    var x;
    var data = [];
    // HTML template using strings
    function getTemplate(item) {
        // console.log(item)
        return '<div class="row">' +
            '<div class="col-xs-12">' +
            '<div class="question">' + item.question + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-xs-12 text-center">' +
            '<div class="answers">' +
            '<ol>' +
            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[0] + '</button>' + '</li>' +
            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[1] + '</button>' + '</li>' +
            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[2] + '</button>' + '</li>' +
            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[3] + '</button>' + '</li>' +
            '</ol>' +

            '</div>' +
            '</div>' +
            '</div>';
    }

    function next() {
        currentQuestionIndex++;
        if (currentQuestionIndex < data.length) {
            $("#gameScreen").html(getTemplate(data[currentQuestionIndex]));
        }
        else {
            clearInterval(x);
            $("#gameScreen").hide();
            $(".game-over").show();
            $('#clock').hide();
            $("#score").html("Correct answers: " + correctCount + " &nbsp; &nbsp; Incorrect answers: " + wrongCount + " &nbsp; &nbsp; Unanswered: " + unansweredCount);
        };
        disabled = false;
    }

    function registerClick() {
                
        var correct = "Correct!";
        $(document).on("click", ".answers li", function () {
                
            if (!disabled) {
                
                clearInterval(x);
                // console.log(x);
                var index = $(this).index();
                    console.log(index);
                    // console.log(data);
                    // console.log(currentQuestionIndex);
                    // console.log(data[currentQuestionIndex]);

                var correctAnswerIndex = data[currentQuestionIndex].correctAnswer;
                // console.log(correctAnswerIndex);
               
                if (index === correctAnswerIndex) {
                    correctCount++;
                    document.getElementById('clock').style.fontSize = "45px";
                    document.getElementById('clock').style.color = "#00fd2d";
                    showMessage(correct);
                }
                else {
                    wrongCount++;
                    document.getElementById('clock').style.fontSize = "45px";
                    document.getElementById('clock').style.color = "red";
                    showMessage("Wrong! " + data[currentQuestionIndex].answers[correctAnswerIndex]);
                }
                disabled = true;
            }
        });
    }

    function play(data) {
        this.data = data;
        $("#gameScreen").html(getTemplate(data[0]));
        registerClick();
        $(".game-over, #gameScreen").hide()
        $("#start-btn").click(function () {
            // $("#music")[0].play();
            $("#mute").show();
            $("#gameScreen").show();
            $(this).hide();
            timer();

        });
        $("#play-again-btn").click(function () {
            correctCount = 0;
            wrongCount = 0;
            unansweredCount = 0;
            currentQuestionIndex = 0;
            disabled = false;
            data = [];


            // window.location.reload();
        });

    }

    function timer() {
        document.getElementById('clock').style.fontSize = "90px";
        document.getElementById('clock').style.color = "#00c1c2";
        var seconds = 15;
        $("#clock").html((seconds < 10 ? ":0" : ":") + seconds)
        seconds--;
        x = setInterval(function () {
            if (seconds > -1) {
                $("#clock").html((seconds < 10 ? ":0" : ":") + seconds)
                seconds--;
            }

            else {
                document.getElementById('clock').style.fontSize = "45px";
                document.getElementById('clock').style.color = "#fcdd00";
                showMessage("You took too long...");
                unansweredCount++;
            }
        }, 1000);
    }

    function showMessage(message) {
        clearInterval(x);
        $("#clock").text(message);
        var y = setTimeout(function () {
            timer();
            next();
        }, 4000);
    }
    return {
        play: play
    };
})();



$(document).ready(function () {
    $.get("/api/questions", function (questions) {
        Trivia.play(questions);
        // console.log(questions[0].correctAnswer);
    });
    
    $("#mute").hide();
    $("#mute").click(function (e) {
        e.preventDefault();
        var song = $('audio')[0]
        if (song.paused) {
            song.play();
            document.getElementById("mute").src = "http://franriavilla.in/images/mute.png";
        } else {
            song.pause();
            document.getElementById("mute").src = "http://franriavilla.in/images/unmute.png";
        }
    });
});























// {
    //     question: "What actor played the main character, Kevin Flynn/Clu, in the film?",
    //     answers:[
    //         "Beau Bridges",
    //         "Jeff Bridges",
    //         "London Bridges",
    //         "Harrison Ford"
    //     ],
    //     correctAnswer: 1
    // },
    // {
    //     question: "The star of TRON, Jeff Bridges, also played what other classic cult hit character?",
    //     answers:[
    //         "Flash Gordon",
    //         "Han Solo",
    //         "Mad Max",
    //         "The Dude"
    //     ],
    //     correctAnswer: 3
    // },
    // {
    //     question: "In What year did TRON hit theaters?",
    //     answers:[
    //         "1982",
    //         "1978",
    //         "1984",
    //         "1999"
    //     ],
    //     correctAnswer: 0
    // },
    // {
    //     question: "The sequel to the film was named...?",
    //     answers:[
    //         "TRON: Play Again",
    //         "TRON: Game Over",
    //         "TRON: Legacy",
    //         "TRONS"  
    //     ],
    //     correctAnswer: 2
    // }