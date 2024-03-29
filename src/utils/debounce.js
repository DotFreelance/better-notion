export default function debounce(func, wait, immediate) {
  var timeout;
  var debouncedFunc = function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };

  debouncedFunc.cancel = function() {
    if (timeout) clearTimeout(timeout);
  };

  return debouncedFunc;
}
