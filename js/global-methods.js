const $id = function (id) {
  return document.getElementById(id);
};
const $class = function (id) {
  return document.getElementsByClassName(id);
};

function setTabName(index) {
  $id("title-div").innerHTML = (function () {
    tabIndex =
      index === "Results"
        ? `<h2>${index}</h2>`
        : `<h2>Question ${index + 1}</h2>`;
    return tabIndex;
  })();
}

function highlightNavButtons(smallNav, largeNav) {
  const desktopNavButton = document.querySelectorAll(".nav-button-large");
  const mobileNavButton = document.querySelectorAll(".nav-button-small");
  const largeHighlight = "nav-button-large--highlight";
  const smallHighlight = "nav-button-small--highlight";

  desktopNavButton.forEach((button) => {
    button.classList.remove(largeHighlight);
  });
  mobileNavButton.forEach((button) => {
    button.classList.remove(smallHighlight);
  });
  smallNav.classList.add(smallHighlight);
  largeNav.classList.add(largeHighlight);
}

function displaySelectedTab(tabs, content) {
  for (let tab of tabs) {
    tab.style.display = "none";
  }
  content.style.display = "";
}

function pageTwo() {
  $id("Introduction").style.display = "none";
  $id("content_1").style.display = "";
}
