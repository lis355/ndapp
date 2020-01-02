/* eslint-disable no-undef */

const Enum = require("../tools/enum");

test("test", () => {
	const t1 = new Enum([
		"a", "b", "c"
	]);

	expect(t1.all).toStrictEqual(["a", "b", "c"]);
	expect(t1.keys).toStrictEqual(["a", "b", "c"]);
	expect(t1.c).toBe("c");

	const t2 = new Enum({
		"a": "q", "b": "w", "c": "e"
	});

	expect(t2.all).toStrictEqual(["q", "w", "e"]);
	expect(t2.keys).toStrictEqual(["a", "b", "c"]);
	expect(t2.b).toBe("w");
});
