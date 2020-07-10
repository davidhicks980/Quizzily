<!DOCTYPE html>

<html>
  <head>
    <meta chartset="UTF-8" name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="./css/dh-quiz-main.css" />


    <script  src="./js/libs/charting-library__chartist.min.js"></script>
    <script src="./js/libs/chartist-plugin__axistitle.min.js"></script>
    <script src= 
    "../../node_modules/chartist-logaxis/dist/index.umd.js"></script>
    <script src="./js/libs/equation-notation-converter__ascii-to-tex.js"></script>
    <script src="./js/libs/latex-renderer__katex.min.js"></script>
    <script src="./js/equation-list.js"></script>
    <script src="./js/quiz-list.js"></script>
    <script src="./js/html-quiz-templates.js"></script>
    <script src="./js/global-methods.js"></script>
    <script src="./js/quiz-logic.js"></script>
    <script src="./js/unfactored.js"></script>

  </head>

  <body
    class="bg"
    onresize=""
    style="
      background-image: linear-gradient(rgb(139, 207, 13), white);
      z-index: -1;
    "
    onload="setActiveTabTitle(); tabHover(event,'content_1');setActiveTabTitle()"
  >
    <br class="pkShowWhenSmall" id="pkSmallBreak" />
    <!-- Tabs -->
    <div id="pkMobileMenuContainer">
      <button class="pkShowWhenSmall" id="pkMobileMenuButton">
        <span class="arrowSideBtn"></span>
      </button>

      <div class="pkShowWhenSmall" id="pkMobileMenu">
      </div>
    </div>
    <div id="titleDiv" class="w3-center">Question 1</div>

    
    <div class = "flex pkShowWhenLarge"
      id="pkDesktopNavbar"
    >
  </div>

    <br />

    <div class="pkQuizContainer" id="pkQuizContainer">
    </div>

    </div>
    <button type="menu" id="QuizID" style="display:none" value="pkOCSC"></button>

    <script defer src="./js/quiz-generator.js"></script>

  </body>
</html>