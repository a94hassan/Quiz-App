let questions = [
    {
        'question': 'Was ist die Bedeutung von "WWW" in einer Webadresse (URL)?',
        'answer_1': 'Web World Wonders',
        'answer_2': 'World Wide Web',
        'answer_3': 'Wireless Web Wizards',
        'answer_4': 'Webpage Wallpapers',
        'right_answer': '2'
    },
    {
        'question': 'Wer ist bekannt als der "Vater des World Wide Web"?',
        'answer_1': 'Elon Musk',
        'answer_2': 'Jeff Bezos',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Mark Zuckerberg',
        'right_answer': '3'
    },
    {
        'question': 'Was bedeutet die Abkürzung URL in Bezug auf Webseiten?',
        'answer_1': 'Universal Rendering Language',
        'answer_2': 'Uniform Resource Locator',
        'answer_3': 'User Revision Log',
        'answer_4': 'Underline and Rotate Letters',
        'right_answer': '2'
    },
    {
        'question': 'Was ist das Standard-Attribut in HTML für den Hyperlink?',
        'answer_1': 'url',
        'answer_2': 'href',
        'answer_3': 'link',
        'answer_4': 'target',
        'right_answer': '2'
    },
    {
        'question': 'Was ist der Zweck des HTML-Attributs "alt" in Bezug auf Bilder?',
        'answer_1': 'Alternative Beschreibung des Bildes',
        'answer_2': 'Änderung der Bildgröße',
        'answer_3': 'Hinzufügen eines Rahmens zum Bild',
        'answer_4': 'Beschreibung des Bildes für den Druck',
        'right_answer': '1'
    },
    {
        'question': 'Was charakterisiert das Konzept von "Responsive Design"?',
        'answer_1': 'Design mit vielen Farben',
        'answer_2': 'Anpassung an verschiedene Bildschirmgrößen',
        'answer_3': 'Kunstvolles Design',
        'answer_4': 'Design mit Animationen',
        'right_answer': '2'
    },
    {
        'question': 'Welche Dateiendung wird für Stylesheets verwendet?',
        'answer_1': '.exe',
        'answer_2': '.js',
        'answer_3': '.html',
        'answer_4': '.css',
        'right_answer': '4'
    }
];

let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('./audio/success.wav');
let AUDIO_FAILURE = new Audio('./audio/failure.mp3');
    
function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('all-questions-end-screen').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    showCurrentQuestionNumber();
    calcProgress();
}

function answer(selection) {
    let question = questions[currentQuestion];
    let rightAnswer = question['right_answer'];
    if (rightAnswerSelected(question, rightAnswer)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightAnswers++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(`answer_${rightAnswer}`).parentNode.classList.add('bg-success');
        AUDIO_FAILURE.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(question, rightAnswer) {
    return question[selection] == question[`answer_${rightAnswer}`]
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        reset(); 
        showQuestion();
    } else {
        currentQuestion++;
        calcProgress();
        showEndScreen();
        replaceImage();
        document.getElementById('rightAnswers-end-screen').innerHTML = rightAnswers;
    }
}

function reset() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('next-button').disabled = true;
}

function showCurrentQuestionNumber() {
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
}

function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('card-body').style = 'display: none';
}

function replaceImage() {
    document.getElementById('header-image').src = './img/trophy.png';
}

function calcProgress() {
    let percentage = Math.round((currentQuestion/questions.length)*100);
    document.getElementById('progress-bar').innerHTML = `${percentage}%`;
    document.getElementById('progress-bar').style = `width: ${percentage}%`;
}

function restartGame() {
    document.getElementById('header-image').src = './img/pencil.jpg';
    document.getElementById('card-body').style = '';
    document.getElementById('end-screen').style = 'display: none';
    currentQuestion = 0;
    rightAnswers = 0;
    init();
    reset();
}