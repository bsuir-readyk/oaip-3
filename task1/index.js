// f1: y = ln(1 + sqrt(1 + x*x))
// f2: y = ln(2) - sum(((-1)^k * (2k-1)! * x^(2k))/(2^2k * (k!)^2), k, 1, n)

const solve = () => {
  let x = 0, ans = "";
  ans = ans + "┌──────┬────────┬─────────────┬─────────────┬─────────────┐\n";
  ans = ans + "│ x    │ f1(x)  │   e=0.01    │  e=0.001    │  e=0.0001   │\n";
  ans = ans + "│      │        ├────────┬────┼────────┬────┼────────┬────┤\n";
  ans = ans + "│      │        │ f2(x)  │ N  │ f2(x)  │ N  │ f2(x)  │ N  │\n";
  ans = ans + "├──────┼────────┼────────┼────┼────────┼────┼────────┼────┤\n";

  while (x < 0.83) {
    ans = ans + `│ ${x.toFixed(2)} │ ${Math.log(1 + Math.sqrt(1 + x * x)).toFixed(4)}`;
    let k = 1,
      cur1 = -1,
      cur22k = 4,
      curFact = 1,
      cur2k1Fact = 1,
      curx2k = x * x,
      sum = (cur1 * cur2k1Fact * curx2k) / (cur22k * curFact * curFact),
      prev = Infinity,
      isE2Logged = false,
      isE3Logged = false;

    while (Math.abs(sum - prev) > 0.0001) {
      prev = sum;

      k = k + 1;
      cur1 = -cur1;
      cur22k = cur22k * 2 * 2;
      curFact = curFact * k;
      cur2k1Fact = cur2k1Fact * (2 * k) * (2 * k - 1);
      curx2k = curx2k * x * x;

      sum = sum + (cur1 * cur2k1Fact * curx2k) / (cur22k * curFact * curFact);

      if ((!isE2Logged) && Math.abs(sum - prev) < 0.01) {
        ans = ans + ` │ ${(Math.log(2) - sum).toFixed(4)} │ ${k < 10 ? k + " " : k}`;
        isE2Logged = true;
      }
      if ((!isE3Logged) && Math.abs(sum - prev) < 0.001) {
        ans = ans + ` │ ${(Math.log(2) - sum).toFixed(4)} │ ${k < 10 ? k + " " : k}`;
        isE3Logged = true;
      }
    }

    ans = ans + ` │ ${(Math.log(2) - sum).toFixed(4)} │ ${k < 10 ? k + " " : k}`;
    ans = ans + " │\n";

    x = Math.floor(x * 100 + 4) / 100;
    ans = ans + "├──────┼────────┼────────┼────┼────────┼────┼────────┼────┤\n";
  }
  ans = ans.slice(0, ans.length - 61);
  ans = ans + "\n└──────┴────────┴────────┴────┴────────┴────┴────────┴────┘\n";

  console.log(ans);
}

solve();

