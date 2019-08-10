const input = 5.8605656568626596e-8;

function iterPi(eps) {
  let muxRaw = 1 / eps;
  console.log(muxRaw);
  if (eps < 0.0001) {
    muxRaw += eps;
    console.log(Math.ceil(muxRaw));
  }
  //let mux = Math.ceil((1 / eps));
  let mux = Math.ceil(muxRaw);
  let summ = 0;
  for (let iter = 0; iter !== mux; iter++) {
    if (iter % 2) summ -= 1 / (1 + iter * 2);
    else summ += 1 / (1 + iter * 2);
  }
  summ *= 4;
  return [mux, parseFloat(summ.toFixed(10))];
}

console.log(iterPi(input));
