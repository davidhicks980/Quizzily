var State = (function () {
  let logic = {};
  let activeQuestionIndices = [];
  let attempts;
  let quizComplete = false;
  console.log($id("Results"));
  logic.armSubmitButton = (questions, attemptsObject) => {
    attempts = attemptsObject;
    let i;
    let len = questions.length;
    attemptsObject.forEach((att) => {
      if (att.activeIndex != null) {
        activeQuestionIndices.push(att.activeIndex);
      }
    });
    for (i = 0; i < len; i++) {
      let attempt = attemptsObject[i];
      let button = $id(attempt.htmlElementIDs.submitButtonID);
      if (attempt.activeIndex != null) {
        button.addEventListener("click", function () {
          questionButton(questions, attempt);
        });
      } else {
        nonQuestionButton(i, len);
      }
    }
  };
  function nonQuestionButton(i, len) {
    let button = $id(attempts[i].htmlElementIDs.submitButtonID);
    button.value = "Next Question";
    let current, previous, next;
    previous = i > 0 ? attempts[i - 1] : attempts[i];
    current = attempts[i];
    next = i < len - 1 ? attempts[i + 1] : attempts[i];
    button.addEventListener("click", function () {
      nonQuestionButtonListener(next, current, previous, button);
    });
  }
  function questionButton(questions, attempt) {
    let buttonID = attempt.htmlElementIDs.submitButtonID;
    const questionType = attempt.type;
    const index = attempt.index;
    const answers = [];
    let question = questions[index];
    let studentAnswer, correctAnswer;
    let submission = {
      buttonObject: $id(buttonID),
      index: index,
      question: question,
      questions: questions,
      attempt: attempt,
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
          attempt.complete = true;
          attempt.studentAnswer = studentAnswer;
          attempt.correctAnswer = correctAnswer;
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
          attempt.studentAnswer = studentAnswer;
          attempt.correctAnswer = correctAnswer;
          attempt.complete = true;
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
  function nonQuestionButtonListener(next, current, previous, button) {
    currContent = $id(current.htmlElementIDs.contentID);
    prevContent = $id(previous.htmlElementIDs.contentID);
    nextContent = $id(next.htmlElementIDs.contentID);
    let nextActiveNavButton = $id(next.htmlElementIDs.smallTabID);
    if (
      typeof nextActiveNavButton != "undefined" &&
      !nextActiveNavButton.disabled
    ) {
      nextContent.style.display = "";
      currContent.style.display = "none";
    } else if (current === next && quizComplete === true) {
      button.value = "Results";
      currContent.style.display = "none";
      $id("Results").style.display = "";
    } else if (button.value != "Previous") {
      alert("You need to finish all previous questions before moving on!");
      button.value = "Previous";
    } else {
      prevContent.style.display = "";
      currContent.style.display = "none";
      button.value = "Next Question";
    }
  }
  function checkForQuizCompletion(attempts, questions) {
    let completeCount = 0;
    for (const attempt of attempts) {
      if (attempt.completion) {
        completeCount++;
      }
    }
    if (completeCount === Math.max(activeQuestionIndices) - 1) {
      getResults(attempts, questions);
    }
  }

  function checkAnswer(submission) {
    let { studentAnswer, rightAnswer, question, attempt } = submission;
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
      summonContinueButton(attempt);
    }
  }

  function answerLeftBlank(question) {
    $id(
      `feedback${question.number}`
    ).innerHTML = `<h5 style="color: orange"> Please try to answer the question &#9785 </h5>`;
  }
  /////*****Disabling user input******/////

  /*
   * Disables fill-in-the-blank inputs. A separate function is used for correct and incorrect because correct * styling places a checkmark in the
   * input while incorrect places a red X in the input
   */
  function disableCorrectFITBInput(question) {
    $id(`fitb-${question.number}`).className = "fitb-text-input--correct";
    $id(`fitb-${question.number}`).disabled = true;
  }
  function disableIncorrectFITBInput(question) {
    $id(`fitb-${question.number}`).className = "fitb-text-input--incorrect";
    $id(`fitb-${question.number}`).disabled = true;
  }
  /* Disables all-that-apply check boxes */
  function disableAnswersAllThatApply(question) {
    //interates through answer choice (defined as letter) and disables
    for (letter in question.options) {
      $id(`q${question.number + letter}`).disabled = true;
    }
  }
  function firstIncorrectSubmission(question) {
    /* Displays incorrect feedback after first incorrect answer. Subsequent incorrect answers use the same feedback, and the feedback is not
     * erased on subsequent submits unless the user is correct, so this function only needs to be called on the first incorrect submission as
     * opposed to subsequent submissions.
     */
    let feedback = `<h5> ${question.incorrectFeedback} </h5>`;
    $id(`feedback${question.number}`).innerHTML = feedback;
  }
  function submissionFeedback(question, attempt, correct) {
    //Called whenever the user runs out of tries and submit button is clicked. correct is a bool defining whether the user was correct. If they are correct, a header prints "Great Job"!, otherwise the header prints "Good Try!"
    let header =
      correct === true ? `<h4>Great Job!</h4>` : `<h4>Good Try!</h4>`;
    let feedback = `<h5> ${question.correctFeedback} </h5>`;
    $id(`feedbackTitle${question.number}`).innerHTML = header;
    $id(`feedback${question.number}`).innerHTML = feedback;
  }
  function summonContinueButton(attempt) {
    if (attempt.activeIndex < Math.max(...activeQuestionIndices)) {
      submitButtonQuizNotComplete(attempt);
    } else {
      getResults(attempts);
      submitButtonQuizComplete(attempt);
    }
  }
  //Handles methods occurring after quiz completion
  function getResults(attempts) {
    quizComplete = true;
    console.log("finished");
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
  function submitButtonQuizNotComplete(attempt) {
    let nextAttempt = attempts.filter((att) => {
      return att.activeIndex === attempt.activeIndex + 1;
    });
    let nextIDs = nextAttempt[0].htmlElementIDs;
    let currentIDs = attempt.htmlElementIDs;
    console.log(currentIDs);
    $id(nextIDs.tabID).disabled = false;
    $id(nextIDs.smallTabID).disabled = false;
    $id(currentIDs.submitButtonID).innerHTML = "Continue";
    $id(currentIDs.submitButtonID).addEventListener("click", function () {
      $id(nextIDs.contentID).style.display = "";
      $id(currentIDs.contentID).style.display = "none";
    });
  }
  function submitButtonQuizComplete(attempt) {
    let attemptHTML = attempt.htmlElementIDs;
    $id(attemptHTML.submitButtonID).innerHTML = "Results";
    $id(attemptHTML.submitButtonID).addEventListener("click", function () {
      $id("Results").style.display = "";
      $id(attemptHTML.contentID).style.display = "none";
    });
  }
  return logic;
})();

function w3_close() {
  $id("pkMobileMenu").style.display = "none";
}
function tabHover(e, contentID) {
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
