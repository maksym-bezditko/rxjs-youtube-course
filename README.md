# RxJS Быстрый курс - Реактивное программирование на JavaScript [2020]

This repository contains the notes and code examples from the YouTube tutorial "RxJS Быстрый курс - Реактивное программирование на JavaScript [2020]" by Владилен Минин.

## Tutorial Link

Watch the full tutorial on YouTube: [RxJS Быстрый курс - Реактивное программирование на JavaScript [2020]](https://www.youtube.com/watch?v=gCwSVQO_PtY&t=852s&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD)

## Overview

This course provides a fast-paced introduction to RxJS and reactive programming in JavaScript. The tutorial covers the following key concepts and operators in RxJS:

1. **Observables**: Observables are the foundation of RxJS. They are data streams that can emit values over time. You can think of an observable as a blueprint for creating streams that can be observed (or subscribed to). Observables can emit multiple values (unlike Promises), and they can be used to represent events, HTTP requests, or any other asynchronous data streams.

2. **Operators**: Operators are functions that allow you to manipulate and transform the data emitted by observables. RxJS provides a wide range of operators that can be used to filter, map, merge, and reduce data streams. Examples include `map`, `filter`, `scan`, `reduce`, `take`, `switchMap`, and many others. Operators are used to build complex asynchronous logic by composing simple functions.

3. **Subjects**: Subjects are a special type of observables that allow multicasting. This means that a subject can act as both an observable and an observer at the same time. Subjects are useful for situations where you need to share a single observable execution among multiple subscribers. There are different types of subjects in RxJS, including `Subject`, `BehaviorSubject`, and `ReplaySubject`, each with its unique behavior.

4. **Schedulers**: Schedulers are used to control the execution of observables. They allow you to manage concurrency by specifying when and how the observable streams should be executed. Schedulers can be used to perform operations asynchronously or to ensure that operations are performed in a specific order. RxJS provides several built-in schedulers, such as `asyncScheduler`, `queueScheduler`, and `animationFrameScheduler`.


## Key Takeaways

1. **of**: Creates an observable that emits the arguments you provide, then completes.
2. **from**: Converts an array or promise into an observable.
3. **scan**: Applies an accumulator function over the source observable, returning each intermediate result.
4. **Observable**: A class that creates observables, which can emit data over time.
5. **fromEvent**: Creates an observable from DOM events.
6. **map**: Projects each source value to a new value.
7. **range**: Creates an observable that emits a sequence of numbers within a specified range.
8. **timer**: Creates an observable that starts emitting after an initial delay, and optionally, at a periodic interval.
9. **interval**: Creates an observable that emits sequential numbers every specified interval of time.
10. **switchMap**: Projects each source value to an observable which is merged in the output observable, emitting values only from the most recently projected observable.
11. **tap**: Transparently performs actions or side-effects, such as logging.
12. **take**: Emits only the first N values, then completes.
13. **reduce**: Applies an accumulator function over the source observable, emitting only the final value.
14. **filter**: Emits only those items from the source observable that pass a predicate test.
15. **Subject**: A multicast observable.
16. **BehaviorSubject**: A subject that requires an initial value and emits the current value to new subscribers.
17. **ReplaySubject**: A subject that can cache a specified number of last emitted values and replay them to new subscribers.

## Code Examples

### Example 1: Creating and Subscribing to a Basic Observable

```javascript
import { of } from 'rxjs';

const stream$ = of(1, 2, 3, 4);
stream$.subscribe(console.log);
```

### Example 2: Converting an Array to an Observable

```javascript
import { from } from 'rxjs';
import { scan } from 'rxjs/operators';

const arr$ = from([1, 2, 3, 4]).pipe(scan((acc, v) => acc.concat(v), []));
arr$.subscribe(console.log);
```

### Example 3: Creating a Custom Observable

```javascript
import { Observable } from 'rxjs';

const stream$ = new Observable((observer) => {
  observer.next('First value');

  setTimeout(() => {
    observer.next('After 1000 ms');
  }, 1000);

  setTimeout(() => {
    observer.complete();
  }, 1500); 

  setTimeout(() => {
    observer.error('Something went wrong');
  }, 2000);

  setTimeout(() => {
    observer.next('After 3000 ms');
  }, 3000);
});

stream$.subscribe({
  next: console.log,
  error: console.log,
  complete: () => console.log('complete'),
});
```

### Example 4: Using fromEvent to Track Mouse Movements on a Canvas

```javascript
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

fromEvent(document.querySelector('canvas'), 'mousemove')
  .pipe(
    map(e => ({
      x: e.offsetX,
      y: e.offsetY,
      ctx: e.target.getContext('2d')
    }))
  )
  .subscribe(pos => {
    pos.ctx.fillRect(pos.x, pos.y, 2, 2);
  });

fromEvent(document.getElementById('clear'), 'click')
  .subscribe(() => {
    const canvas = document.querySelector('canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  });
```

### Example 5: Using interval to Create a Timer

```javascript
import { interval } from 'rxjs';

const subscription = interval(500).subscribe(v => console.log(v));
setTimeout(() => subscription.unsubscribe(), 4000);
```

### Example 6: Using timer to Create a Delayed Observable

```javascript
import { timer } from 'rxjs';

timer(2500).subscribe(console.log);
```

### Example 7: Using range to Emit a Sequence of Numbers

```javascript
import { range } from 'rxjs';

range(42, 10).subscribe(console.log);
```

### Example 8: Using switchMap to Create a Nested Observable

```javascript
import { fromEvent, interval } from 'rxjs';
import { switchMap, tap, take, reduce } from 'rxjs/operators';

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
```

### Example 9: Using RxJS with DOM Elements

```javascript
import { filter, interval, map, take, scan } from 'rxjs';

const btn = document.getElementById('interval');
const rxjsBtn = document.getElementById('rxjs');
const display = document.querySelector('#problem .result');

const people = [
  { name: 'Vladilen', age: 25 },
  { name: 'Elena', age: 17 },
  { name: 'Ivan', age: 18 },
  { name: 'Igor', age: 14 },
  { name: 'Lisa', age: 32 },
  { name: 'Irina', age: 23 },
  { name: 'Oleg', age: 20 },
];

btn.addEventListener('click', () => {
  let i = 0;
  const canDrink = [];

  const intervalToClear = setInterval(() => {
    if (people[i]) {
      if (people[i].age >= 18) {
        canDrink.push(people[i].name);
      }
      display.textContent = canDrink.join(' ');

      i += 1;
    } else {
      clearInterval(intervalToClear);
    }
  }, 1000);
});

rxjsBtn.addEventListener('click', () => {
  rxjsBtn.disabled = true;

  interval(1000).pipe(
    take(people.length),
    filter(v => people[v].age >= 18),
    map((v) => people[v].name),
    scan((acc, val) => acc.concat(val), [])
  )
    .subscribe({
      next: (res) => {
        display.textContent = res.join(' ');
      },
      complete: () => { rxjsBtn.disabled = false; }
    });
});
```

### Example 10: Using Subjects in RxJS

```javascript
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

document.addEventListener('click', () => {
  const stream = new ReplaySubject(2); // buffer size

  stream.next('JS');
  stream.next('TS');

  stream.subscribe(console.log);
});
```

## Resources

- [RxJS Documentation](https://rxjs.dev/)
- [Official RxJS GitHub](https://github.com/ReactiveX/rxjs)

## Author

Владилен Минин - [YouTube Channel](https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w)
