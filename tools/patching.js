Object.defineProperties(Array.prototype, {
    isEmpty: {
        value: function () {
            return this.length === 0;
        }
    },
    mapToObject: {
        value: function (callback) { // callback(item) => item
            const result = {};
            for (let i = 0; i < this.length; i++) {
                const { key, value } = callback(this[i]);
                result[key] = value;
            }

            return result;
        }
    }
});

Object.defineProperties(Object.prototype, {
    objectFilter: {
        value: function (callback) { // callback(key, value) => boolean
            return Object.keys(this).filter(key =>
                callback(key, this[key])).mapToObject(key => ({ key, value: this[key] }));
        }
    },
    objectMap: {
        value: function (callback) { // callback(key, value) => { key, value }
            return Object.keys(this).mapToObject(key => callback(key, this[key]));
        }
    },
    mapToArray: {
        value: function (callback) { // callback(key, value) => item
            return Object.keys(this).map(key => callback(key, this[key]));
        }
    },
    objectForEach: {
        value: function (callback) { // callback(key, value) => item
            return Object.keys(this).forEach(key => callback(key, this[key]));
        }
    }
});
