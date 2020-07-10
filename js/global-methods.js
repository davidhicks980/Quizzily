const $id = function (id) {
  return document.getElementById(id);
};
const $class = function (id) {
  return document.getElementsByClassName(id);
};

window.addEventListener("click", () => {
  setActiveTabTitle();
});

function setActiveTabTitle() {
  let tabs = document.getElementsByClassName("tab");
  let tab;
  $id("titleDiv").innerHTML = (function () {
    for (tab of tabs) {
      if (tab.style.display != "none") {
        let tabIDString = tab.id.toString();
        tabIDString = tabIDString.replace("content_", "");
        tabIDString = isNaN(tabIDString)
          ? `<h2>${tabIDString}</h2>`
          : `<h2>Question ${tabIDString}</h2>`;
        return tabIDString;
      }
    }
  })();
}

function pageTwo() {
  $id("Introduction").style.display = "none";
  $id("content_1").style.display = "";
}
