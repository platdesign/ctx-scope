'use strict';


const Code = require('code');
const expect = Code.expect;

const ctxScope = require('../');


describe('ctx-scope', function() {

	it('one of some', function() {

		let res = ctxScope.match(['a', 'b'], ['a']);

		expect(res)
			.to.be.true();

	});

	it('none of some', function() {


		expect(() => {
			let res = ctxScope.match(['a', 'b'], ['c']);
		})
			.to.throw(Error);

	});

	it('none of every', function() {

		expect(() => {
			let res = ctxScope.match(['a', '+b'], ['a']);
		})
			.to.throw(Error);

	});


	it('all of every + one of some', function() {

		let res = ctxScope.match(['c', '+a', 'b'], ['a', 'c']);

		expect(res)
			.to.be.true();

	});



	it('none of none', function() {

		let res = ctxScope.match(['-b'], ['a']);

		expect(res)
			.to.be.true();

	});



	it('one of none', function() {

		expect(() => {
			let res = ctxScope.match(['a', '-b'], ['b']);
		})
			.to.throw(Error);

	});


	it('one of some with ctx', function() {

		let res = ctxScope.match(['a-{params.test}-{qwe}-{test.1}', 'b', 'c'], ['a-123-321-2'], {
			params: {
				test: 123
			},
			qwe:321,
			test:[1,2,3]
		});

		expect(res)
			.to.be.true();

	});


});
