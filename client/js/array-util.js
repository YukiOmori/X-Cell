const getRange = function(fromNum, toNum) {
  return Array.from({ length: toNum - fromNum + 1　},
  	(unused, i)  => i + fromNum);
};

module.exports = {
	getRange: getRange
};