const input = 4;

function isPrime(val) {
  for (let div = Math.floor(Math.sqrt(val)); div > 1; div--) {
    if (val % div === 0) {
      console.log(div + ":" + (val - div));
      return false;
    }
  }
  return true;
}

function prime(value) {
  let divider = Math.floor(value / 2);
  for (let dv = divider; dv > 1; dv--) {
    if (isPrime(dv) && isPrime(value - dv)) {
      console.log(dv + ":" + (value - dv));
      return dv * (value - dv);
    }
  }
  return 0;
}

console.log(prime(input));
