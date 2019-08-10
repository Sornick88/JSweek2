const input = 4238;

function isPrime(val) {
  let divider = Math.floor(Math.sqrt(val));
  for (let dv = divider; dv !== 0; dv--) {
    if (val % divider === 0) {
      return false;
    }
  }
  return true;
}

function prime(value) {
  let divider = Math.floor(value / 2);
  for (let dv = divider; dv > 1; dv--) {
    if (!isPrime(dv) && !isPrime(value - dv)) {
      return dv * (value - dv);
    }
  }
  return 0;
}

console.log(prime(input));
