function approximatelyEquals(a, b, epsilon = 1e-5) {
	return Math.abs(a - b) < epsilon;
}

module.exports = {
	approximatelyEquals
};
