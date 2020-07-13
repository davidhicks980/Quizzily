var State = (function () {
  /* This object controls the state of the quiz by arming 
  1. submit buttons (handle submitting quiz questions)
  2. continue buttons (handle non-quiz material such as plot or educational information)   

  The "listenForStateChanges" function takes in the attemptsObject from the quiz generator, which contains a collection of QuestionInstances. Variables from the QuestionInstance are defined below

  class QuestionInstance {
    constructor(
      activeIndex, 
      index, 
      type,
      tries,
      submissionCount,
      completion,
      elementSelectors,
      disabled
    ) {
      1. this.activeIndex = activeIndex 
      2. this.index = index; 
      3. this.type = type;
      4. this.tries = tries;
      5. this.submissionCount = submissionCount;
      6. this.completion = completion;
      7. this.elementSelectors = elementSelectors;
      8. this.disabled = disabled;
    }
  }

  1. Index of quiz questions relative to other quiz questions. 
  >>Non-quiz questions are given a null value**
  2. Index of page with regard to all other pages, including non-quiz questions
  3. Type of question (e.g. fill-in-the-blank or select-all-that-apply)
  4. Attempts the user is given to answer the question
  5. Times the user has submitted the question
  6. Whether the user has answered the question correctly (this is irrelevant to non-quiz questions)
  7. All HTML element IDs relevant to the question
    htmlIDs = {
        tabID: tabID >>name of numerical desktop navigation button
        smallTabID: smallTabID, >> ID of numerical mobile navigation button
        contentID: contentID, >> ID of all quiz content
        submitButtonID: submitID, >> ID of the submit button
      };
  8. Whether or not the question is disabled. All quiz questions are disabled at startup EXCEPT FOR THE FIRST. Non-quiz questions are not disabled.
    

  */

  let state = {};
  state.attempts = [];
  state.activeIndices = [];
  state.quizComplete = false;
  state.quizLength = 0;
  function getAttemptContext(index) {
    let attempt = state.attempts[index];
    attempt.previous = {};
    attempt.next = {};
    attempt.nextActive = {};
    if (attempt.activeIndex != null) {
      attempt.requiresAnswer = true;
      if (state.activeIndices.includes(attempt.activeIndex + 1)) {
        attempt.nextActive = state.attempts.filter((att) => {
          return att.activeIndex === attempt.activeIndex + 1;
        })[0];
      }
    }
    attempt.previous.attempt = index > 0 ? state.attempts[index - 1] : false;
    attempt.next =
      index < state.quizLength - 1 ? state.attempts[index + 1] : false;
    if (attempt.next) {
      attempt.next.activeQuestion =
        attempt.next.activeIndex === null ? true : false;
    }
    if (attempt.previous.attempt) {
      attempt.previous.content = $id(
        attempt.previous.attempt.elementSelectors.content
      );
    }
    return attempt;
  }

  state.listenForStateChanges = (questions, attemptsObject) => {
    state.attempts = attemptsObject;
    state.quizLength = questions.length;
    let i;
    attemptsObject.forEach((att) => {
      if (att.activeIndex != null) {
        state.activeIndices.push(att.activeIndex);
      }
    });
    for (i = 0; i < state.quizLength; i++) {
      let attempt = getAttemptContext(i);
      let button = attempt.accessDOM("submitButton");
      attempt.requiresAnswer
        ? button.addEventListener("click", function () {
            submitLogic(questions, attempt);
          })
        : button.addEventListener("click", function () {
            continueLogic(attempt);
          });
    }
  };

  function continueLogic(attempt) {
    let button = attempt.accessDOM("submitButton");

    if (
      attempt.next.accessDOM("desktopMenuButton").disabled &&
      button.innerHTML != "Previous"
    ) {
      alert("You need to finish all previous questions before moving on!");
      button.innerHTML = "Previous";
    } else if (attempt.index === quiz.length && state.quizComplete === true) {
      button.innerHTML = "Results";
      state.setActivePage("Results");
    } else if (!attempt.next.accessDOM("desktopMenuButton").disabled) {
      state.setActivePage(attempt.next.index);
    } else {
      state.setActivePage(attempt.previous.attempt.index);
      button.innerHTML = "Continue";
    }
  }

  function submitLogic(questions, attempt) {
    const index = attempt.index;
    const answers = [];
    let question = questions[index];
    let submission = {
      index: index,
      question: question,
      questions: questions,
      attempt: attempt,
    };

    filterQuestionType();

    function filterQuestionType() {
      switch (attempt.type) {
        case "select-all-that-apply":
          checkSelectAllThatApply();
          break;
        case "fill-in-the-blank":
          checkFillInTheBlank();
          break;
        case "sc-pk-graph":
          null;
          break;
        case "md-pk-graph":
          null;
          break;
      }
    }

    function checkSelectAllThatApply() {
      for (letter in question.options) {
        if ($id(`q${question.number + letter}`).checked) {
          answers.push(letter);
        }
      }
      submission.studentAnswer = answers.sort().join(",");
      submission.correctAnswer = question.correctAnswer.sort().join(",");
      checkAnswer(submission);
      if (submission.attempt.completion) {
        attempt.complete = true;
        attempt.studentAnswer = submission.studentAnswer;
        attempt.correctAnswer = submission.correctAnswer;
        disableSelectAllThatApply(question);
        checkForQuizCompletion(state.attempts, questions);
      }
    }

    function checkFillInTheBlank() {
      submission.studentAnswer = $id(`fitb-${question.number}`).value;
      submission.correctAnswer = question.correctAnswer;
      checkAnswer(submission);
      if (submission.attempt.completion) {
        attempt.complete = true;
        attempt.studentAnswer = submission.studentAnswer;
        attempt.correctAnswer = submission.correctAnswer;
        submission.attempt.correct
          ? correctFillInTheBlankAnimation(question)
          : incorrectFillInTheBlankAnimation(question);
        checkForQuizCompletion(state.attempts, questions);
      }
    }
  }

  function checkForQuizCompletion(attempts, questions) {
    let completeCount = 0;
    for (const attempt of attempts) {
      if (attempt.completion) {
        completeCount++;
      }
    }
    if (completeCount === Math.max(state.activeIndices) - 1) {
      drawResultsPage(attempts, questions);
    }
  }

  function checkAnswer(submission) {
    let { studentAnswer, correctAnswer, question, attempt } = submission;
    let button = attempt.accessDOM("submitButton");
    if (studentAnswer == correctAnswer) {
      attempt.completion = true;
      attempt.correct = true;
      button.innerHTML = "Next Question";
    } else if (studentAnswer == "") {
      blankAnswerFeedback(question);
    } else if (attempt.submissionCount === attempt.tries - 1) {
      attempt.completion = true;
      attempt.correct = false;
      button.innerHTML = "Next Question";
    } else if (attempt.submissionCount === 0) {
      tryAgainFeedback(question);
      attempt.submissionCount++;
      button.innerHTML = "Try Again";
    } else {
      attempt.submissionCount++;
    }
    if (attempt.completion === true) {
      completedQuestionFeedback(question, attempt.correct);
      summonContinueButton(attempt);
      button.innerHTML = "Next Question";
    }
  }

  function blankAnswerFeedback(question) {
    $id(
      `feedback${question.number}`
    ).innerHTML = `<h5 style="color: orange"> Please try to answer the question &#9785 </h5>`;
  }
  /////*****Disabling user input******/////

  /*
   * Disables fill-in-the-blank inputs. A separate function is used for correct and incorrect because correct * styling places a checkmark in the
   * input while incorrect places a red X in the input
   */
  function correctFillInTheBlankAnimation(question) {
    $id(`fitb-${question.number}`).className = "fitb-text-input--correct";
    $id(`fitb-${question.number}`).disabled = true;
  }
  function incorrectFillInTheBlankAnimation(question) {
    $id(`fitb-${question.number}`).className = "fitb-text-input--incorrect";
    $id(`fitb-${question.number}`).disabled = true;
  }
  /* Disables all-that-apply check boxes */
  function disableSelectAllThatApply(question) {
    //interates through answer choice (defined as letter) and disables
    for (letter in question.options) {
      $id(`q${question.number + letter}`).disabled = true;
    }
  }
  function tryAgainFeedback(question) {
    /* Displays incorrect feedback after first incorrect answer. Subsequent incorrect answers use the same feedback, and the feedback is not
     * erased on subsequent submits unless the user is correct, so this function only needs to be called on the first incorrect submission as
     * opposed to subsequent submissions.
     */
    let feedback = `<h5> ${question.incorrectFeedback} </h5>`;
    $id(`feedback${question.number}`).innerHTML = feedback;
  }
  function completedQuestionFeedback(question, correct) {
    //Called whenever the user runs out of tries and submit button is clicked. correct is a bool defining whether the user was correct. If they are correct, a header prints "Great Job"!, otherwise the header prints "Good Try!"
    let header =
      correct === true ? `<h4>Great Job!</h4>` : `<h4>Good Try!</h4>`;
    let feedback = `<h5> ${question.correctFeedback} </h5>`;
    $id(`feedbackTitle${question.number}`).innerHTML = header;
    $id(`feedback${question.number}`).innerHTML = feedback;
  }
  function summonContinueButton(attempt) {
    if (attempt.activeIndex < Math.max(...state.activeIndices)) {
      showNextQuestion(attempt);
    } else {
      drawResultsPage(state.attempts);
      showResultsPage(attempt);
    }
  }
  //Handles methods occurring after quiz completion
  function drawResultsPage(attempts) {
    state.quizComplete = true;
    let results = [],
      correct = 0,
      total = 0,
      display = [],
      header = [],
      feedback;

    for (attempt of attempts) {
      if (attempt.activeIndex != null) {
        if (attempt.correct) {
          correct++;
        }
        if (attempt.completion) {
          total++;
        }
        feedback = attempt.correct ? "&#10003" : "&#10005";
        results.push(
          `<tr>
              <td>${attempt.activeIndex + 1}</td>
              <td>${attempt.correctAnswer}</td>
              <td>${attempt.studentAnswer}</td>
              <td>${feedback}</td>
            </tr>`
        );
      }
    }
    header = `<h2>Score: <sup>${correct}</sup>/<sub>${total}</sub></h2><br />`;

    display.push(templates.resultsContainer(header, results.join("")));
    appendResultsToDOM(display);
  }
  function appendResultsToDOM(display) {
    const resultsContainer = $id("resultsContainer");
    const resultsDesktopNav = $id("resultsDesktopNav");
    const resultsMobileNav = $id("resultsMobileNav");
    resultsDesktopNav.style.display = "";
    resultsMobileNav.style.display = "";
    resultsContainer.innerHTML = display.join("");
  }
  function showNextQuestion(attempt) {
    console.log(attempt.nextActive);
    attempt.nextActive.accessDOM("desktopMenuButton").disabled = false;
    attempt.nextActive.accessDOM("mobileMenuButton").disabled = false;
    attempt.nextActive.disabled = false;
    attempt.accessDOM("submitButton").innerHTML = "Continue";
    attempt.accessDOM("submitButton").addEventListener("click", function () {
      state.setActivePage(attempt.next.index);
    });
  }
  function showResultsPage(attempt) {
    state.quizComplete = true;
    submit = attempt.accessDOM("submitButton");
    submit.innerHTML = "Results";
    submit.addEventListener("click", function () {
      state.setActivePage("Results");
    });
  }

  state.setActivePage = (index) => {
    const tabs = $class("card-col-flexbox");
    let content, mobileNav, desktopNav;
    if (index === "Results") {
      content = $id(index);
      mobileNav = $id("resultsMobileNav");
      desktopNav = $id("resultsDesktopNav");
    } else {
      let page = state.attempts[index];
      content = page.accessDOM("content");
      desktopNav = page.accessDOM("desktopMenuButton");
      mobileNav = page.accessDOM("mobileMenuButton");
    }
    displaySelectedTab(tabs, content);
    setTabName(index);
    highlightNavButtons(mobileNav, desktopNav);
  };
  return state;
})();
