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
