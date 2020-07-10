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
<!--Div into which the plot is inserted -->
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

  selectAllThatApply: function (choice, letter) {
    return `
  <div class="w3-container">
  <div class="w3-left">
  <input type="checkbox" class="checkbox" id="q${choice.number + letter}">
  <label id = "l${choice.number + letter}" for="q${choice.number + letter}">${
      choice.options[letter]
    }</label>
</div>
</div>
  <br />
  `;
  },

  fillInTheBlank: function (question) {
    return `<div class="container">
    <input type="text" class = "w3-large numberAnswer" type="number" id="fitb-${question.number}" placeholder="Enter your answer..." required="required" />
</div>
`;
  },

  quizContainer: function (question, choices, contentID, submitID) {
    return `<div id=${contentID} class="tab" style="display:none">
                    <div class="w3-row">
                        <div class='w3-col m1 l2 w3-container'></div>
                        <div class='w3-col m10 l8 s12'  id="pkQuizQuestionColumn">
                            <div class="w3-card-2 w3-white mainCard">
                                <header class="w3-container" style="padding-right: 5%; padding-left: 5%; padding-top:5%">
                                <div class="number-flex">
                                <div style="width:10%">
                                  <span class="w3-round-small number-padding w3-amber">${1}</span>
                                  </div>
                                  <div style="width:90%">
                                  ${question.question}
                                <div>
                              </div>
                                </header>
                                <div class="w3-container">
                                    <hr width="100%" />
                                </div>
                                <div class="w3-container" style="padding-bottom:10px;">
                                    <div class="answers"> ${choices.join(
                                      ""
                                    )} </div>
                                    <hr />
                                    <div style="padding-left: 20px; padding-right: 20px" class="w3-center"id="feedbackTitle${
                                      question.number
                                    }"></div> 
                                    <div style="padding-left: 20px; padding-right: 20px" id="feedback${
                                      question.number
                                    }"></div>
                                    
                                </div>
                                <footer class="w3-container w3-center"
                                    style="padding-bottom: 2.0em; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px; ">
                                        <button id='${submitID}'; class="w3-center submit"  >Submit</button>
                                </footer>
                            </div>
                        </div>
                        <div class='w3-col m1 l2 w3-container'></div>
                    </div>
                </div>`;
  },
  plotContainer: function (question, plot, contentID, submitID) {
    return `      
    <div id="${contentID}" class="tab" style="display:none">
        <div class="w3-row">
          <div class="w3-col m1 l2 w3-container"></div>
          <div class="w3-col m10 l8 s12" id="pkQuizQuestionColumn">
            <div
              class="w3-card-2 w3-white mainCard w3-center"
              style="margin-left: auto; margin-right: auto; min-height: 800px'">
              <header class="w3-container" style="padding-right: 5%; padding-left: 5%; padding-top:5%">
              <div class="number-flex">
              <div style="width:10%">
                <span class="w3-round-small number-padding w3-amber">${1}</span>
                </div>
                <div style="width:90%">
                ${question.question}
              <div>
            </div>
              </header>
              <div class="w3-container w3-center">
                <hr width="100%" />
              </div>
              <div class="w3-container" style="padding-bottom:10px;">
                <div class="answers"> ${plot} </div>
          
                <div
                  style="padding-left: 20px; padding-right: 20px"
                  id="feedbackTitle${question.number}"
                ></div>
            
                <h5>
                  <div
                    style="padding-left: 20px; padding-right: 20px"
                    id="feedback${question.number}"
                  ></div>
               </h5>
              </div>

              <footer
                class="w3-container w3-center"
                style="padding-top: 8px; padding-bottom: 20px; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;"
              >
              <button id='${submitID}'; class="w3-center submit">Continue</button>
              </footer>
            </div>
          </div>
          <div class="w3-col m1 l2 w3-container"></div>
        </div>
      </div>`;
  },
  smallNavBar: function (question, tabID, contentID, disable) {
    return `<button href="#" class="navButton w3-large tablink" id = ${String(
      tabID
    )} onclick="tabHover(event,'${contentID}')" ${disable}>Question ${
      question.number
    }</button>`;
  },

  largeNavBar: function (question, tabID, contentID, disable) {
    return `<button class = "nav-button-large" id = ${String(
      tabID
    )}  onclick="tabHover(event,'${contentID}')" ${disable}> ${
      question.number
    }</button>`;
  },

  resultsContainer: function (results) {
    return `
    <div id="Results" class="tab" style="display:none">
  
  <div class = "w3-row">

  <div class = 'w3-col m1 l2 w3-container'></div>
  <div class='w3-col m10 l8 s12'>
                        <div class="w3-white w3-card-2  w3-round-medium">
                            <header class="w3-container" style="padding-top: 20px;">
                            </header>
                        <div class="w3-container w3-center">
                        </div>
                        <div class="w3-container w3-center" style="padding-bottom:10px;">
                        <p>
                        <table id="results-table" class = "w3-hoverable">
                        <tr style="background: orange">
                        <th>Question</th>
                        <th>Correct Answer</th>
                        <th>Your Answer</th>
                        <th>Feedback</th>
                        </tr>
                           ${results}
                        </table>
                        </p>
                        </div>
                        <footer class="w3-container w3-center" style="padding-top: 8px; padding-bottom: 8px; border-bottom-left-radius: 3px; border-bottom-right-radius: 3px;">
                        </footer>
                      </div>
                      </div>
             </div>
         
          <div class = 'w3-col m1 l2 w3-container'></div>
</div>
        </div>
        `;
  },
  resultsDiv: function () {
    return `
          <div id="resultsContainer"></div>
              `;
  },
  resultsMobileNav: function () {
    return `
    <button class="navButton w3-large tablink" style="display:none" id = "resultsMobileNav" onclick="tabHover(event,'Results')">Results</button>`;
  },
  resultsDesktopNav: function () {
    return `
      <button class="nav-button-large" style="display:none" id = "resultsDesktopNav" onclick="tabHover(event,'Results')">Results</button>`;
  },
};
