import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// document.addEventListener('click', () => {

// 	const stream = new Subject();

// 	stream.subscribe(console.log);

// 	stream.next('test')

// });



// document.addEventListener('click', () => {

// 	const stream = new BehaviorSubject('first');

// 	stream.subscribe(console.log);
	
// 	stream.next('test')
// });




document.addEventListener('click', () => {

	const stream = new ReplaySubject(2); // buffer size

	stream.next('JS')
	stream.next('TS')

	stream.subscribe(console.log);
});