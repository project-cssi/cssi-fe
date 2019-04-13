String.prototype.format = function () {
  let i = 0;
  const args = arguments;
  return this.replace(/{}/g, function () {
    return args[i] !== 'undefined' ? args[i++] : '';
  });
};

Number.prototype.format = function() {
  return parseFloat(Math.round(this * 100) / 100).toFixed(2);
};
