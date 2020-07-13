const templates = {
  plot: function (id) {
    return `<!--Div into which Latex is inserted-->
<div class = "w3-center" id = "div_latex-${id}"> </div> 
<!--Describes all items in the main grid-->

<ul id="pkPlotFlex">
<li class = "flexOne_pkSliders">
<div class = "wrapper" id = "slider_wrapper-${id}">

<ul id = pkToggleFlex>

</li>

<li class="flexThree_pkLogToggle">
<!--This handles the logarithmic toggle. I only styled the switch based on what I could find online, so I'm not too certain how it works-->
<div id ="toggle-log-div" class="toggle-div">
log axis 
  <label class="toggle-check">
    <input id = "toggle-track-${id}-log"
    type="checkbox" class="toggleInput" unchecked>
    <span class="toggle-touch round"></span>
  </label>
</div> 
</li>
<li class = "flexFour_pkFixToggle"> 
<div id = "toggle-axis-div" class="toggle-div">
fix axis 
  <label class="toggle-check">
    <input id = "toggle-track-${id}-fix" type="checkbox" class="toggleInput" unchecked>
    <span class="toggle-touch round"></span>
  </label>
</li>

</ul>
<!--End of wrapper div-->

</div>
</li>

<li class="flexTwo_pkPlot">

<div class="div-plot" id="div_plot-${id}"></div>


</ul>
`;
  },
  introHTML: function (id) {
    return `
  <div id = 'Introduction' class= "w3-container tab">
  
  <div class = "w3-row">

  <div class = 'w3-col m1 l2 w3-container'></div>
  <div class='w3-col m10 l8 s12'>
                        <div class="w3-white w3-card-2 w3-round-medium">
                            <header class="w3-container" style="padding-top: 20px;">
                            </header>
                        <div class="w3-container w3-center">
                        </div>
                        <div class="w3-container" style="padding-bottom:10px;">
                        <h3>Use this quiz to supplement your studies. Take some time with each visual to help solidify the concepts we learn in class.</h3>
                        </div>
                        <hr />
                        <footer class="w3-container w3-center" style=" padding-bottom: 1em; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;">
                        <input id='next'; class="w3-center button" type="button" onclick="pageTwo()" value="START" />
                        </footer>
                      </div>
                      </div>
             </div>
         
          <div class = 'w3-col m1 l2 w3-container'></div>
</div>
        </div>
        `;
  },

  selectAllThatApply: function (question, letter) {
    return `
  <div class="w3-container">
  <div class="w3-left">
  <input type="checkbox" class="checkbox" id="q${question.number + letter}">
  <label id = "l${question.number + letter}" for="q${
      question.number + letter
    }">${question.options[letter]}</label>
</div>
</div>
  <br />
  `;
  },

  fillInTheBlank: function (question) {
    return `<div class="fill-in-the-blank--container">
    <input type="text" class = "w3-large numberAnswer" type="number" id="fitb-${question.number}" placeholder="Enter your answer..." required="required" />
   
</div>
`;
  },

  quizContainer: function (question, choices, contentID, submitID) {
    let header = `  
    <div class="number-flex">
      <div style="flex-basis:10%">
          <span class="w3-round-small number-padding w3-amber">${question.number}</span>
        </div>
      <div style="flex-basis:90%">
        ${question.question}
      </div>
    </div>`;

    let body = ` <div class="answers"> ${choices.join("")} </div>
                  <div id="feedbackTitle${question.number}"></div> 
                  <div id="feedback${question.number}"></div>`;
    let footer = `<button id="${submitID}" class="submit">Submit</button>`;

    return this.interpolateContent(header, body, footer, contentID);
  },

  interpolateContent: function (
    headContent,
    bodyContent,
    footerContent,
    contentID
  ) {
    let header = `<div id="pk-quiz-card-header" >
                    ${headContent}
                  </div>`;
    let body = ` <div id = "pk-quiz-card-body">
                 
                      ${bodyContent}
              
                  </div>`;
    let footer = `<div id="pk-quiz-card-footer"
                  class="card-footer"
                >
    
    ${footerContent}
    </div>`;
    let container = `<div id="${contentID}" class="card-col-flexbox" style="display:none">${header} <hr class="hr-no-margin"/>  <br/>${body} <hr class="hr-no-margin"/> ${footer}
    </div>`;
    return container;
  },

  plotContainer: function (question, plot, contentID, submitID) {
    let header = `  
    <div class="number-flex">
      <div style="flex-basis:10%">
          <span class="w3-round-small number-padding w3-amber">${question.number}</span>
        </div>
      <div style="flex-basis:90%">
        ${question.question}
      </div>
    </div>`;

    let body = ` <div class="answers"> ${plot} </div>`;
    let footer = `<button id="${submitID}" class="submit non-question-button">Continue</button>`;

    return this.interpolateContent(header, body, footer, contentID);
  },

  smallNavBar: function (question, tabID, disable) {
    return `<button href="#" class="navButton w3-large nav-button-small" id = ${String(
      tabID
    )} onclick="State.setActivePage(${
      question.number - 1
    })" ${disable}>Question ${question.number}</button>`;
  },

  largeNavBar: function (question, tabID, disable) {
    return `<button class = "nav-button-large" id = ${String(
      tabID
    )}  onclick="State.setActivePage(${question.number - 1})" ${disable}> ${
      question.number
    }</button>`;
  },

  resultsContainer: function (headerContent, results) {
    let header = `<div class="results--center-title">${headerContent}</div>`;
    let body = `  <table class = "results-table w3-hoverable">
    <tr style="background: orange">
    <th>Question</th>
    <th>Correct Answer</th>
    <th>Your Answer</th>
    <th>Feedback</th>
    </tr>
       ${results}
    </table>`;
    let footer = "";
    return this.interpolateContent(header, body, footer, "Results");
  },
  resultsDiv: function () {
    return `
          <div id="resultsContainer"></div>
              `;
  },
  resultsMobileNav: function (index) {
    return `
    <button class="navButton w3-large nav-button-small" style="display:none" id = "resultsMobileNav" onclick="State.setActivePage(Results)">Results</button>`;
  },
  resultsDesktopNav: function (index) {
    return `
      <button class="nav-button-large" style="display:none" id = "resultsDesktopNav" onclick="State.setActivePage('Results')">Results</button>`;
  },
};
