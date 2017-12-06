'use strict';



const EXP = /(\{([0-9A-Za-z\.\[\]^\}]*)\})/;



function getImpl(object, property) {
	let elems = Array.isArray(property) ? property : property.split('.'),
		name = elems[0],
		value = object[name];

	if (elems.length <= 1) {
		return value;
	}
	// Note that typeof null === 'object'
	/* istanbul ignore next */
	if (value === null || typeof value !== 'object') {
		return undefined;
	}
	return getImpl(value, elems.slice(1));
};



module.exports = class CtxScope {


	static match(def, current, ctx) {
		ctx = ctx || {};
		// let last = def.length - 1;

		def = def.map(item => {

			let replaced = item;
			let match;

			while ((match = replaced.match(EXP)) !== null) {
				replaced = replaced.replace(match[1], getImpl(ctx, match[2]));
			}

			return replaced;
		});

		let somes = def.filter(item => !['+', '-'].includes(item.substr(0, 1)));
		let everys = def.filter(item => item.substr(0, 1) === '+').map(item => item.substr(1));
		let nones = def.filter(item => item.substr(0, 1) === '-').map(item => item.substr(1));

		let somesRes = somes.length ? somes.some((item, index) => current.includes(item)) : true;

		let everyRes = everys.length ? everys.every(item => current.includes(item)) : true;
		let nonesRes = nones.length ? nones.every(item => !current.includes(item)) : true;


		let res = [everyRes, nonesRes, somesRes].every(Boolean);

		if (res !== true) {
			throw new Error();
		}

		return true;
	}
};
