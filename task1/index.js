// f1: y = ln(1 + sqrt(1 + x*x))
// f2: y = ln(2) - sum(((-1)^k * (2k-1)! * x^(2k))/(2^2k * (k!)^2), k, 1, n)


/* @param {number} eps */
const f2Sum = (eps, x) => {
  let k = 1,
    cur1 = -1,
    cur22k = 4,
    curFact = 1,
    cur2k1Fact = 1,
    curx2k = x * x,
    sum = (cur1 * cur2k1Fact * curx2k) / (cur22k * curFact * curFact);
  prev = Infinity;

  while (Math.abs(sum - prev) > eps) {
    prev = sum;

    k = k + 1;
    cur1 = -cur1;
    cur22k = cur22k * 2 * 2;
    curFact = curFact * k;
    cur2k1Fact = cur2k1Fact * (2 * k) * (2 * k - 1);
    curx2k = curx2k * x * x;

    sum = sum + (cur1 * cur2k1Fact * curx2k) / (cur22k * curFact * curFact);
  }

  console.log(k);
  return sum;
}

const solve = () => {
  let x = 0;
  while (x < 0.83) {
    console.log(
      0.01 + " : x=" + x + " : " + f2Sum(0.01, x) + "\n",
      0.001 + " : x=" + x + " : " + f2Sum(0.001, x) + "\n",
      0.0001 + " : x=" + x + " : " + f2Sum(0.0001, x) + "\n",
    );
    x = Math.floor(x * 100 + 4) / 100;
  }
}

solve();

