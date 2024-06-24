import { filter, interval, map, tap, take, takeLast, takeWhile, scan, reduce, fromEvent, switchMap } from 'rxjs';

fromEvent(document, 'click')
	.pipe(
		switchMap(event => interval(1000)
			.pipe(
				tap(console.log),
				take(5),
				reduce((acc, v) => acc + v, 0),
			)),
	)
	.subscribe({
		next: v => console.log('next', v),
		complete: (res) => {
			console.log('complete', res);
		}
	});

// const stream$ = interval(1000)
// 	.pipe(
// 		tap((v) => console.log('tap', v)),
// 		// takeWhile(v => v < 5),
// 		// map((v) => v * 3),
// 		// filter(v => v % 2 === 0),
// 		scan((acc, v) => acc + v, 0),
// 		reduce((acc, v) => acc + v, 0),
// 	);

// stream$.subscribe({
// 	next: v => console.log('next', v),
// 	complete: (res) => {
// 		console.log('complete', res);
// 	}
// })