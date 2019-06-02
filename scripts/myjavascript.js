// JavaScript Document
(function() {
	const myQuestions = [
    {
      question: "Hvilken race kræver mest pelspleje?",
      answers: {
        a: "Staffordshire Bullterrier",
        b: "Islandsk fårehund",
        c: "Leonberger"
      },
      correctAnswer: "c"
    },
    {
      question: "Hvilke af disse 3 ting skal være klar inden hvalpen ankommer?",
      answers: {
        a: "Vand+foderskål, udvidet forsikring og et kamera",
        b: "Hvalpetræning, hundetegn og kødben",
        c: "Vand+foderskål, hundetegn og halsbånd"
      },
      correctAnswer: "c"
    },
    {
      question: "Hvor meget motion må en ny hvalp ca. få om dagen?",
      answers: {
        a: "10 minutter",
        b: "2 minutter",
        c: "2 timer",
        d: "1 time"
      },
      correctAnswer: "a"
    },
	{
      question: "Hvilke af disse produkter kan en hvalp GODT tåle",
      answers: {
        a: "Chokolade",
        b: "Agurker",
        c: "Løg",
        d: "Vindruer"
      },
      correctAnswer: "b"
    },
	{
      question: "Hvor meget sover hvalpe i gennemsnit?",
      answers: {
        a: "6-8 timer",
        b: "10-12 timer",
        c: "16-18 timer",
      },
      correctAnswer: "c"
    },
	{
      question: "Hvad gør du når din hvalp tisser indenfor?",
      answers: {
        a: "Lad hvalpen tisse og tag den så straks udenfor",
        b: "Skæld ud og tag den straks udenfor",
        c: "Tag fat og vis den uheldet og skæld ud",
      },
      correctAnswer: "a"
    },
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();