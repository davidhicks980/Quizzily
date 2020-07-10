/* IDEAS
>hover annotations on equations
*/

const $id = function (id) {
  return document.getElementById(id);
};
const $class = function (id) {
  return document.getElementsByClassName(id);
};

function w3_close() {
  $id("pkMobileMenu").style.display = "none";
}

function tabHover(event, contentID) {
  let i;
  let x;
  let tablinks;
  x = $class("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = $class("tablink");

  $id(contentID).style.display = "";
}

function loadQuiz() {
  // ////////////////Enter your quiz name here!///////////////////////
  window.quizName = $id("QuizID").value;
  // ///////////////////////////////////////////////////////////////

  // Get quiz container and navigation bar in order to append nav items and quiz questions
  const quizContainer = $id("pkQuizContainer");
  const desktopNav = $id("pkDesktopNavbar");
  const mobileNav = $id("pkMobileMenu");
  const navBar = { small: [], large: [] };
  const containers = [];
  // Creates the home page with instructions.
  const plotList = [];
  const quiz = quizList.filter((quizList) => quizList.name === quizName)[0];
  // small q is quiz, big Q is question
  const introduction = templates.introHTML(quiz);
  const questions = quiz.questions;
  let score = [];
  // Sets the name of the quiz on the Instructions page
  let attempts = [];
  let activeIndex = 0;
  let nav = [];

  function getResults(attempts) {
    let resultsNavButton = {
      small: [],
      large: [],
    };
    attempts.quizComplete = true;
    let results = [],
      correct = 0,
      total = 0,
      display = [],
      feedback;

    for (attempt of attempts) {
      if (attempt.correct) {
        correct++;
      }
      if (attempt.completion) {
        total++;
      }
      feedback = attempt.correct ? "&#10003" : "&#10005";
      results.push(
        //question # | correct answer | your answer | result | feedback
        `<tr>
          <td>${attempt.activeIndex + 1}</td>
          <td>${attempt.correctAnswer}</td>
          <td>${attempt.studentAnswer}</td>
          <td>${feedback}</td>
        </tr>`
      );
    }

    results.push(
      `<h2>Score: <sup>${correct}</sup>/<sub>${total}</sub></h2><br />`
    );

    display.push(templates.resultsContainer(results.join("")));
    appendResultsToDOM(resultsNavButton, display);
  }

  function buildQuiz(attempts) {
    navBar.large.push(
      `<button class="navButton w3-large tablink" onclick="tabHover(event,'Introduction')">Introduction</button>`
    );
    navBar.small.push(
      `<button class="navButton w3-large tablink" onclick="tabHover(event,'Introduction')">Introduction</button>`
    );
    containers.push(introduction);
    $id("titleDiv").innerText = quizName;
    class Attempt {
      constructor(
        activeIndex,
        index,
        type,
        tries,
        attempts,
        completion,
        tabID,
        disabled
      ) {
        this.activeIndex = activeIndex;
        this.index = index;
        this.type = type;
        this.tries = tries;
        this.submissionCount = attempts;
        this.completion = completion;
        this.tabID = tabID;
        this.disabled = disabled;
      }
    }
    class Navigation {
      constructor(
        index,
        questionType,
        mobileButton,
        desktopButton,
        content,
        submit,
        activeIndex
      ) {
        this.index = index;
        this.questionType = questionType;
        this.mobileButton = mobileButton;
        this.desktopButton = desktopButton;
        this.content = content;
        this.submit = submit;
        this.activeIndex = activeIndex;
      }
    }

    // Iterates and tabulates each question on the page
    for (i = 0; i < questions.length; i++) {
      let question = questions[i];
      let tabID = "questions" + JSON.stringify(questions[i].number);
      let smallTabID =
        "small" + "questions" + JSON.stringify(questions[i].number);
      let contentID = tabID + "container";
      let submitID = `submit_${question.type}_q_${question.number}`;
      let content = [];
      const choices = [];
      let disabled = activeIndex > 0 ? "disabled" : null;
      let navObjects = new Navigation(
        i,
        questions[i].type,
        smallTabID,
        tabID,
        contentID,
        submitID,
        activeIndex
      );
      nav.push(navObjects);
      switch (question.type) {
        case "select-all-that-apply":
          for (letter in question.options) {
            choices.push([templates.selectAllThatApply(question, letter)]);
          }
          let sataAttempt = new Attempt(
            activeIndex,
            i,
            "sata",
            question.tries,
            0,
            false,
            tabID,
            disabled
          );
          activeIndex++;
          attempts.push(sataAttempt);
          content = templates.quizContainer(
            question,
            choices,
            contentID,
            submitID
          );
          break;
        case "fill-in-the-blank":
          choices.push([templates.fillInTheBlank(question)]);
          let fitbAttempt = new Attempt(
            activeIndex,
            i,
            "fitb",
            question.tries,
            0,
            false,
            tabID,
            disabled
          );
          content = templates.quizContainer(
            question,
            choices,
            contentID,
            submitID
          );
          activeIndex++;
          attempts.push(fitbAttempt);
          break;
        case "sc-pk-graph":
          disabled = null;
          activeQuestion = "sc-pk-graph";
          plotName = question.id;
          content = templates.plotContainer(
            question,
            templates.plot(plotName),
            contentID,
            submitID
          );
          plotList.push(plotName);
          break;
        case "md-pk-graph":
          disabled = null;
          activeQuestion = "md-pk-graph";
          plotName = question.id;
          content = templates.plotContainer(
            question,
            templates.plot(plotName),
            contentID,
            submitID
          );
          plotList.push(plotName);
          break;
      }
      containers.push(content);
      navBar.small.push(
        templates.navigationBar(question, smallTabID, contentID, disabled)
      );
      navBar.large.push(
        templates.navigationBar(question, tabID, contentID, disabled)
      );
    }
    console.log(navBar);
    navBar.small.push(templates.resultsMobileNav());
    navBar.large.push(templates.resultsDesktopNav());
    containers.push(templates.resultsDiv());

    appendQuizToDOM(desktopNav, navBar, mobileNav, quizContainer, containers);
    generatePlots(plotList);
  }
  function armSubmitButton(questions, attempts) {
    let i;
    let len = questions.length;
    for (i = 0; i < len; i++) {
      let submit = nav[i].submitIDsubmit;
      let button = $id(submit);
      if (!submit.includes("pk-graph")) {
        button.addEventListener("click", function () {
          submitAnswer(this.id, questions, attempts);
        });
      } else {
        button.value = "Next Question";
        let current, previous, next;
        previous = i > 0 ? nav[i - 1] : nav[i];
        current = nav[i];
        next = i < len - 1 ? nav[i + 1] : nav[i];
        currContent = $id(current.content);
        prevContent = $id(previous.content);
        nextContent = $id(next.content);

        button.addEventListener("click", function () {
          let nextActiveNavButton = $id(next.mobileButton);
          console.log(nextActiveNavButton);
          if (
            typeof nextActiveNavButton != "undefined" &&
            !nextActiveNavButton.disabled
          ) {
            nextContent.style.display = "";
            currContent.style.display = "none";
          } else if (current === next && attempts.quizComplete === true) {
            button.value = "Results";
            currContent.style.display = "none";
            $id("Results").style.display = "";
          } else if (button.value != "Previous") {
            alert(
              "You need to finish all previous questions before moving on!"
            );
            button.value = "Previous";
          } else {
            prevContent.style.display = "";
            currContent.style.display = "none";
            button.value = "Next Question";
          }
        });
      }
    }
  }
  buildQuiz(attempts);
  armSubmitButton(questions, attempts);

  function checkForQuizCompletion(attempts, questions) {
    let completeCount = 0;
    for (const attempt of attempts) {
      if (attempt.completion) {
        completeCount++;
      }
    }
    if (completeCount === attempts.length) {
      getResults(attempts, questions);
    }
  }

  function submitAnswer(button, questions, attempts) {
    const buttonInfo = button.split("_");
    const questionType = String(buttonInfo[1]);
    const index = Number(buttonInfo[3] - 1);
    const answers = [];
    let activeAttempt = attempts.filter(function (att) {
      return att.index == index;
    })[0];
    let activeIndex = activeAttempt.activeIndex;
    let question = questions[index];
    let studentAnswer, correctAnswer;
    let submission = {
      buttonObject: $id(button),
      index: index,
      question: question,
      questions: questions,
      attempt: activeAttempt,
      attempts: attempts,
    };
    switch (questionType) {
      case "select-all-that-apply":
        for (letter in question.options) {
          if ($id(`q${question.number + letter}`).checked) {
            answers.push(letter);
          }
        }
        studentAnswer = answers.sort().join(",");
        correctAnswer = question.correctAnswer.sort().join(",");
        submission.studentAnswer = studentAnswer;
        submission.rightAnswer = correctAnswer;

        checkAnswer(submission);
        if (submission.attempt.completion) {
          attempts.complete = true;
          attempts[activeIndex].studentAnswer = studentAnswer;
          attempts[activeIndex].correctAnswer = correctAnswer;
          disableAnswersAllThatApply(question);
          checkForQuizCompletion(attempts, questions);
        }
        break;
      case "fill-in-the-blank":
        studentAnswer = $id(`fitb-${question.number}`).value;
        correctAnswer = question.correctAnswer;
        submission.studentAnswer = studentAnswer;
        submission.rightAnswer = correctAnswer;
        checkAnswer(submission);
        if (submission.attempt.completion) {
          attempts[activeIndex].studentAnswer = studentAnswer;
          attempts[activeIndex].correctAnswer = correctAnswer;
          attempts.complete = true;
          submission.attempt.correct
            ? disableCorrectFITBInput(question)
            : disableIncorrectFITBInput(question);
          checkForQuizCompletion(attempts, questions);
        }
        break;
      case "sc-pk-graph":
        null;
        break;
      case "md-pk-graph":
        null;
        break;
    }
  }
  function checkAnswer(submission) {
    let {
      studentAnswer,
      rightAnswer,
      index,
      buttonObject,
      question,
      questions,
      attempt,
      attempts,
    } = submission;
    if (studentAnswer == rightAnswer) {
      attempt.completion = true;
      attempt.correct = true;
    } else if (studentAnswer == "") {
      answerLeftBlank(question);
    } else if (attempt.submissionCount === attempt.tries - 1) {
      attempt.completion = true;
      attempt.correct = false;
    } else if (attempt.submissionCount === 0) {
      firstIncorrectSubmission(question);
      attempt.submissionCount++;
    } else {
      attempt.submissionCount++;
    }
    if (attempt.completion === true) {
      submissionFeedback(question, attempt, attempt.correct);
      summonContinueButton(
        buttonObject,
        questions,
        question,
        index,
        attempt,
        attempts
      );
    }
  }

  function disableCorrectFITBInput(question) {
    $id(`fitb-${question.number}`).className = "fitb-text-input--correct";
    $id(`fitb-${question.number}`).disabled = true;
  }

  function answerLeftBlank(question) {
    $id(
      `feedback${question.number}`
    ).innerHTML = `<p> Please try to answer the question &#9785 </p>`;
  }

  function disableIncorrectFITBInput(question) {
    $id(`fitb-${question.number}`).className = "fitb-text-input--incorrect";
    $id(`fitb-${question.number}`).disabled = true;
  }

  function firstIncorrectSubmission(question) {
    let feedback = `<h5> ${question.incorrectFeedback} </h5>`;
    $id(`feedback${question.number}`).innerHTML = feedback;
  }

  function submissionFeedback(question, attempt, correct) {
    let header =
      correct === true ? `<h4>Great Job!</h4>` : `<h4>Good Try!</h4>`;
    let feedback = `<h5> ${question.correctFeedback} </h5>`;
    $id(`feedbackTitle${question.number}`).innerHTML = header;
    $id(`feedback${question.number}`).innerHTML = feedback;
    attempt.feedback = question.correctFeedback;
  }

  function summonContinueButton(
    buttonObject,
    questions,
    question,
    index,
    attempt,
    attempts
  ) {
    if (attempt.activeIndex < attempts.length - 1) {
      nextAttempt = attempts.filter(
        (att) => att.activeIndex === attempt.activeIndex + 1
      )[0];
      nextMenuItem = nav[nextAttempt.index];
      $id(nextMenuItem.desktopButton).disabled = false;
      $id(nextMenuItem.mobileButton).disabled = false;

      buttonObject.value = "Continue";
      buttonObject.addEventListener("click", function () {
        $id(nav[index + 1].content).style.display = "";
        $id(nav[index].content).style.display = "none";
      });
    } else {
      buttonObject.value = "Results";
      buttonObject.addEventListener("click", function () {
        $id("Results").style.display = "";
        $id(nav[index].content).style.display = "none";
      });
    }
  }
  function disableAnswersAllThatApply(question) {
    for (letter in question.options) {
      $id(`q${question.number + letter}`).disabled = true;
    }
  }
}

loadQuiz();

function appendQuizToDOM(
  large_nav,
  nav_bar,
  small_nav,
  quiz_container,
  containers
) {
  large_nav.innerHTML = nav_bar.large.join("");
  small_nav.innerHTML = nav_bar.small
    .join("")
    .replace(/w3-bar-item/g, "w3-block");
  quiz_container.innerHTML = containers.join("");
}

function appendResultsToDOM(nav_bar, display) {
  const resultsContainer = $id("resultsContainer");
  const resultsDesktopNav = $id("resultsDesktopNav");
  const resultsMobileNav = $id("resultsMobileNav");
  resultsDesktopNav.style.display = "";
  resultsMobileNav.style.display = "";
  resultsContainer.innerHTML = display.join("");
}

function generatePlots(plotList) {
  len = plotList.length;
  for (i = 0; i < len; ) {
    try {
      i = renderPlot(plotList[i], i) + 1;
    } catch (err) {
      console.log(err);
    }
  }
}
