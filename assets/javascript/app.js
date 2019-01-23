var Trivia = Trivia || {};
Trivia = (function () {
    "use strict";
    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var currentQuestionIndex = 0;
    var disabled = false;
    var x;
    var _questions = [];

    function getTemplate(item) {
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
        if (currentQuestionIndex < _questions.length) {
            $("#gameScreen").html(getTemplate(_questions[currentQuestionIndex]));
        }
        else {
            clearInterval(x);
            $("#gameScreen").hide();
            $(".game-over").show();
            $('#clock').hide();
            $("#score").show();
            $("#score").html("Correct answers: " + correctCount + " &nbsp; &nbsp; Incorrect answers: " + wrongCount + " &nbsp; &nbsp; Unanswered: " + unansweredCount);
        }
        disabled = false;
    }

    function registerClick() {        
        var correct = "Correct!";
        $(document).on("click", ".answers li", function () {    
            if (!disabled) {
                
                clearInterval(x);
                var index = $(this).index();
                var correctAnswerIndex = _questions[currentQuestionIndex].correctAnswer;
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
                    showMessage("Wrong! " + _questions[currentQuestionIndex].answers[correctAnswerIndex]);
                }
                disabled = true;
            }
        });
    }

    function registerEvents() {
        registerClick();
        $("#start-btn").click(function () {
            $("#music")[0].play();
            $("#music")[0].volume = 0.3;
            // audio.volume = 0.1;

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
            play(_questions);
            $("#score").hide();
            $("#gameScreen").show();
            $("#clock").show();
            timer();

        });
    }

    function init (questions) {
        _questions = questions;
        registerEvents();
    }

    function play(questions) {
        $("#gameScreen").html(getTemplate(questions[0]));
        $(".game-over, #gameScreen").hide();


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
        play: play,
        init: init
    };
})();

$(document).ready(function () {
    $.get("/api/questions", function (questions) {
        Trivia.init(questions);
        Trivia.play(questions);
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

