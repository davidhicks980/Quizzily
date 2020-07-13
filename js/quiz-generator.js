var quiz = (function () {
  var builder = {};
  //////////////////Enter your quiz name here!///////////////////////
  window.quizName = $id("QuizID").value;
  /////////////////////////////////////////////////////////////////

  const navBar = { small: [], large: [] };
  const containers = [];
  const plotList = [];
  const quiz = quizList.filter((quiz) => quiz.name === quizName)[0];
  //const introduction = templates.introHTML(quiz);
  let questions = {};
  questions = quiz.questions;
  class QuestionInstance {
    constructor(
      activeIndex, //index with regard to questions that can be answered (as opposed to plot questions)
      index, //index with regard to all questions, including plot questions
      type,
      tries,
      submissionCount,
      completion,
      elementSelectors,
      disabled
    ) {
      this.activeIndex = activeIndex;
      this.index = index;
      this.type = type;
      this.tries = tries;
      this.submissionCount = submissionCount;
      this.completion = completion;
      this.elementSelectors = elementSelectors;
      this.disabled = disabled;
    }
    accessDOM(type) {
      return document.getElementById(this.elementSelectors[type]);
    }
  }

  builder.buildQuiz = () => {
    /*navBar.large.push(
      `<button class="navButton w3-large tablink" onclick="tabHover(event,'Introduction')">Introduction</button>`
    );
    navBar.small.push(
      `<button class="navButton w3-large tablink" onclick="tabHover(event,'Introduction')">Introduction</button>`
    );
    containers.push(introduction);*/

    // Iterates and tabulates each question on the page
    let attempts = []; //object containing state variables -- an instance of QuestionInstance
    let index = 0;
    let activeIndex = 0;

    for (let question of questions) {
      let tabID = "questions" + JSON.stringify(question.number);
      let smallTabID = "small" + "questions" + JSON.stringify(question.number);
      let contentID = `content_${String(question.number)}`;
      let submitID = `submit_${question.type}_q_${question.number}`;
      let htmlIDs = {
        desktopMenuButton: tabID,
        mobileMenuButton: smallTabID,
        content: contentID,
        submitButton: submitID,
      };
      let content = [];
      const choices = [];
      let disabled = activeIndex > 0 ? "disabled" : null;

      // iterates through json to draw questions
      switch (question.type) {
        case "select-all-that-apply":
          for (letter in question.options) {
            choices.push([templates.selectAllThatApply(question, letter)]);
          }
          attempts.push(
            new QuestionInstance(
              activeIndex,
              index,
              "select-all-that-apply",
              question.tries,
              0,
              false,
              htmlIDs,
              disabled
            )
          );
          activeIndex++;
          content = templates.quizContainer(
            question,
            choices,
            contentID,
            submitID
          );
          break;
        case "fill-in-the-blank":
          choices.push([templates.fillInTheBlank(question)]);
          attempts.push(
            new QuestionInstance(
              activeIndex,
              index,
              "fill-in-the-blank",
              question.tries,
              0,
              false,
              htmlIDs,
              disabled
            )
          );
          content = templates.quizContainer(
            question,
            choices,
            contentID,
            submitID
          );
          activeIndex++;
          break;
        case "sc-pk-graph":
          disabled = false;
          plotName = question.id;
          attempts.push(
            new QuestionInstance(
              null,
              index,
              "sc-pk-graph",
              1,
              0,
              false,
              htmlIDs,
              disabled
            )
          );
          content = templates.plotContainer(
            question,
            templates.plot(plotName),
            contentID,
            submitID
          );
          plotList.push(plotName);
          break;
        case "md-pk-graph":
          disabled = false;
          plotName = question.id;
          content = templates.plotContainer(
            question,
            templates.plot(plotName),
            contentID,
            submitID
          );
          attempts.push(
            new QuestionInstance(
              null,
              index,
              "md-pk-graph",
              1,
              0,
              false,
              htmlIDs,
              disabled
            )
          );
          plotList.push(plotName);
          break;
      }

      containers.push(content);
      //inserts route and question info into a mobile navigation button
      let mobileTab = templates.smallNavBar(question, smallTabID, disabled);
      let desktopTab = templates.largeNavBar(question, tabID, disabled);
      navBar.small.push(mobileTab);

      //inserts route and question info into a desktop navigation button
      navBar.large.push(desktopTab);
      index++;
    }
    //creates results button for mobile navigation
    navBar.small.push(templates.resultsMobileNav(index));
    //creates results button for desktop navigation
    navBar.large.push(templates.resultsDesktopNav(index));
    //
    containers.push(templates.resultsDiv());
    appendQuizToDOM(navBar, containers);
    generatePlots(plotList);
    return attempts; //attempts object manages state for the quiz
  };

  function appendQuizToDOM(nav_bar, containers) {
    const quizContainer = $id("pkContainerQuiz");
    const desktopNav = $id("pkDesktopNavbar");
    const mobileNav = $id("pkMobileMenu");
    desktopNav.innerHTML = nav_bar.large.join("");
    mobileNav.innerHTML = nav_bar.small
      .join("")
      .replace(/w3-bar-item/g, "w3-block");
    quizContainer.innerHTML = containers.join("");
  }
  function generatePlots(plot_list) {
    len = plot_list.length;
    for (i = 0; i < len; ) {
      try {
        i = renderPlot(plot_list[i], i) + 1;
      } catch (err) {
        console.log(err);
      }
    }
  }

  let attempts = builder.buildQuiz();
  State.listenForStateChanges(questions, attempts);
  return builder;
})();
