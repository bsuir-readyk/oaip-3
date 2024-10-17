program SolveEquations;

uses
  SysUtils;

var
  x, sum, prev, cur1, cur22k, curFact, cur2k1Fact, curx2k: Double;
  k: Integer;
  isE2Logged, isE3Logged: Boolean;
begin
  x := 0;
  WriteLn('┌──────┬────────┬─────────────┬─────────────┬─────────────┐');
  WriteLn('│ x    │ f1(x)  │   e=0.01    │  e=0.001    │  e=0.0001   │');
  WriteLn('│      │        ├────────┬────┼────────┬────┼────────┬────┤');
  WriteLn('│      │        │ f2(x)  │ N  │ f2(x)  │ N  │ f2(x)  │ N  │');

  { xCycle }
  while x < 0.83 do
  begin
    WriteLn('├──────┼────────┼────────┼────┼────────┼────┼────────┼────┤');
    Write(Format('│ %.2f │ %.4f', [x, Ln(1 + Sqrt(1 + x * x))]));
    k := 1;
    cur1 := -1;
    cur22k := 4;
    curFact := 1;
    cur2k1Fact := 1;
    curx2k := x * x;
    sum := (cur1 * cur2k1Fact * curx2k) / (cur22k * curFact * curFact);
    prev := 1.7e308;
    isE2Logged := False;
    isE3Logged := False;

    { sumCycle }
    while Abs(sum - prev) > 0.0001 do
    begin
      prev := sum;

      Inc(k);
      cur1 := -cur1;
      cur22k := cur22k * 2 * 2;
      curFact := curFact * k;
      cur2k1Fact := cur2k1Fact * (2 * k) * (2 * k - 1);
      curx2k := curx2k * x * x;

      sum := sum + (cur1 * cur2k1Fact * curx2k) / (cur22k * curFact * curFact);

      if (not isE2Logged) and (Abs(sum - prev) < 0.01) then
      begin
        Write(Format(' │ %.4f │ %2d', [Ln(2) - sum, k]));
        isE2Logged := True;
      end;
      if (not isE3Logged) and (Abs(sum - prev) < 0.001) then
      begin
        Write(Format(' │ %.4f │ %2d', [Ln(2) - sum, k]));
        isE3Logged := True;
      end;
    end;

    Write(Format(' │ %.4f │ %2d │', [Ln(2) - sum, k]));
    WriteLn();

    x := x + 0.04;
  end;
  
  WriteLn('└──────┴────────┴────────┴────┴────────┴────┴────────┴────┘');
end.

