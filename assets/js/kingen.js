// open a http/https link in a new label
for (let a of document.getElementsByTagName("a")) {
  let href = a.getAttribute("href") || "";
  if (href.startsWith("http://") || href.startsWith("https://")) {
    a.setAttribute("target", "_blank");
  }
}

let currentRoot = null;
for (let a of document.getElementsByClassName("md-select__link")) {
  if (a.getAttribute("hreflang") === document.documentElement.lang) {
    currentRoot = a.getAttribute("href");
  }
}
let currentPath = window.location.pathname;
if (currentRoot != null) {
  for (let a of document.getElementsByClassName("md-select__link")) {
    let path = currentPath.replace(currentRoot, a.getAttribute("href"));
    a.setAttribute("href", path);
  }
}
