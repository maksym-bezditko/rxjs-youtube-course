import { of, from, scan, Observable, fromEvent, map, range, timer, interval } from 'rxjs';


// const stream$ = of(1, 2, 3, 4);
// stream$.subscribe(console.log);



// const arr$ = from([1, 2, 3, 4]).pipe(scan((acc, v) => acc.concat(v), []));
// arr$.subscribe(console.log);



// const stream$ = new Observable((observer) => {
// 	observer.next('First value');

// 	setTimeout(() => {
// 		observer.next('After 1000 ms');
// 	}, 1000);

// 	setTimeout(() => {
// 		observer.complete()
// 	}, 1500); // manually completes a stream

// 	setTimeout(() => {
// 		observer.error('Something went wrong')
// 	}, 2000);

// 	setTimeout(() => {
// 		observer.next('After 3000 ms');
// 	}, 3000);
// })

// stream$.subscribe({
// 	next: console.log,
// 	error: console.log,
// 	complete: () => console.log('complete'), // not triggered if error occurred
// });



// fromEvent(document.querySelector('canvas'), 'mousemove')
// 	.pipe(
// 		map(e => ({
// 			x: e.offsetX,
// 			y: e.offsetY,
// 			ctx: e.target.getContext('2d')
// 		}))
// 	)
// 	.subscribe(pos => {
// 		pos.ctx.fillRect(pos.x, pos.y, 2, 2)
// 	})

// fromEvent(document.getElementById('clear'), 'click')
// 	.subscribe(() => {
// 		const canvas = document.querySelector('canvas');
// 		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
// 	})



// const subscription = interval(500).subscribe(v => console.log(v));
// setTimeout(() => subscription.unsubscribe(), 4000);



// timer(2500).subscribe(console.log)



range(42, 10).subscribe(console.log)