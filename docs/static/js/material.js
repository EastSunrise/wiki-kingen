let as = document.getElementsByTagName('a');
for (let a of as) {
  let href = a.getAttribute('href');
  if (typeof (href) != "undefined" && href.startsWith('http')) {
    a.setAttribute('target', '_blank');
  }
}