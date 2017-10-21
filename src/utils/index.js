function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

/*eslint-disable */
function validUrl (str) {
  var a  = document.createElement('a');
  a.href = str;
  return (a.host && a.host != window.location.host);
}
/*eslint-enable */

export { guid, validUrl }
