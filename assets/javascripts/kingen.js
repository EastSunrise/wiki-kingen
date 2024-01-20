// open a http/https link in a new label
for (let a of document.getElementsByTagName("a")) {
  let href = a.getAttribute("href") || "";
  if (href.startsWith("http://") || href.startsWith("https://")) {
    a.setAttribute("target", "_blank");
  }
}

// replace link to other language to stay on the current page
let currentRoot = null;
for (let a of document.getElementsByClassName("md-select__link")) {
  if (a.getAttribute("hreflang") === document.documentElement.lang) {
    currentRoot = a.getAttribute("href");
  }
}
let currentPath = window.location.pathname;
if (currentRoot != null) {
  for (let a of document.getElementsByClassName("md-select__link")) {
    if (a.getAttribute("hreflang") === document.documentElement.lang) {
      a.setAttribute("href", "#");
    } else {
      let path = currentPath.replace(currentRoot, a.getAttribute("href"));
      let port = window.location.port;
      if (window.location.hostname == "127.0.0.1") {
        let lang = a.getAttribute("hreflang");
        if (lang === "zh") {
          port = "4000";
        } else if (lang === "en") {
          port = "4001";
        }
      }
      let href = "//" + window.location.hostname + ":" + port + path;
      a.setAttribute("href", href);
    }
  }
}
