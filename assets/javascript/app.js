var correctCount = 0;
var wrongCount = 0;
var unansweredCount = 0;
var currentQuestionIndex = 0;

var x;

var data = [
    {
        question: "Why was TRON disqualified from receiving an Academy Award nomination for special effects?",
        answers:[
            "The producer was involved in a money laundering scandal.",
            "The Academy felt at the time that using computers was cheating.",
            "The film was released a few days too late to qualify.",
            "It didn't gross enough at the box office."
        ],
        correctAnswer: 1
    },
    {
        question: "Why did many Disney animators refuse to work on the film?",
        answers:[
            "They wanted to work on projects for the new Disney Channel.",
            "The Animator's Guild was planning a strike.",
            "They hated working with actors.",
            "They feared that computers would one day take their jobs."
        ],
        correctAnswer: 3
    },
    {
        question: "Flynn's game program is named CLU, which is an acronym for?",
        answers:[
            "Crispy Lightly-breaded Unicorns",
            "Computed Life-like Uni-code",
            "Codified Likeness Utility",
            "Computer Life Unity"
        ],
        correctAnswer: 2
    },
    {
        question: "Ram's light cycle in the book is green, but in the movie it rezzes up as what color?",
        answers:[
            "A lovely shade of Chartreuse.",
            "Blue",
            "Gold",
            "Red"
        ],
        correctAnswer: 3
    },
    {
        question: "Who was the film's director?",
        answers:[
            "Steven Speilberg",
            "George Lucas",
            "Steven Lisberger",
            "Ron Howard"
        ],
        correctAnswer: 2
    },
    {
        question: "Who wrote the novelitization of TRON?",
        answers:[
            "Ernest Hemmingway",
            "Brian Daley",
            "Gregory Benford",
            "J. K. Rowling"
        ],
        correctAnswer: 1
    }
];



// HTML template using strings
function getTemplate(item) {
    return '<div class="row">' +
                '<div class="col-xs-12">' +
                    '<div class="question">'+ item.question +'</div>'+
                '</div>'+
            '</div>'+

            '<div class="row">'+
                '<div class="col-xs-12 text-center">'+
                    '<div class="answers">'+
                        
                        '<ol>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[0] + '</button>' + '</li>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[1] + '</button>' + '</li>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[2] + '</button>' + '</li>'+
                            '<li>' + '<button type="button" id="btn" class="btn btn-lg btn-block" >' + item.answers[3] + '</button>' + '</li>'+
                        '</ol>'+

                    '</div>'+
                '</div>'+
            '</div>';
}

function next() {
    currentQuestionIndex++;
    if(currentQuestionIndex < data.length) {
        $("#gameScreen").html(getTemplate(data[currentQuestionIndex]));
        registerClick();
    }
    else {
        clearInterval(x);
        $("#gameScreen").hide()
        $(".game-over").show()
        $('#clock').hide()
        $("#score").html("Correct answers: " + correctCount + " &nbsp; &nbsp; Incorrect answers: " + wrongCount + " &nbsp; &nbsp; Unanswered: " + unansweredCount);
    };
}

function registerClick(){
    $(document).one("click",".answers li", function() {
        clearInterval(x);
        var index = $(this).index();
        var correctAnswerIndex = data[currentQuestionIndex].correctAnswer;
        if(index === correctAnswerIndex){
            correctCount++;
            showMessage("Correct!");
        }
        else{
            wrongCount++;
            showMessage("Wrong! " + data[currentQuestionIndex].answers[correctAnswerIndex]);
        }
    });
}

function play() {
    $("#gameScreen").html(getTemplate(data[0]));
    registerClick();
    $(".game-over, #gameScreen").hide()
    $("#start-btn").click(function() {
        $("#gameScreen").show()
        $(this).hide()
        timer();
    });

    $("#play-again-btn").click(function() {
        window.location.reload();
    });
 
}

function timer() {
    var seconds = 15;
    $("#clock").html((seconds < 10 ? ":0" : ":") + seconds)
    seconds--
    x = setInterval(function() {
        if(seconds > -1){
            $("#clock").html((seconds < 10 ? ":0" : ":") + seconds)
            seconds--
        }

        else{
            showMessage("You took too long...");
            unansweredCount++;
        }
    }, 1000);
}

function showMessage(message) {
    clearInterval(x);
    $("#clock").text(message);
    var y = setTimeout(function() {
        timer();
        next();  
    }, 4000);
}

$(document).ready(function() {
    play();
});


