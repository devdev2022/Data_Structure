function fibonacci1(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

function fibonacci2(n, memo) {
  if (n === 0 || n === 1) return n;

  if (memo[n] === null || memo[n] === undefined) {
    memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
  }
  return memo[n];
}

let start = new Date();
console.log(fibonacci1(5));
let end = new Date();
console.log(`fibonacci1 함수 실행시간 : ${end - start}ms`);

start = new Date();
console.log(fibonacci2(5, {}));
end = new Date();
console.log(`fibonacci2 함수 실행시간 : ${end - start}ms`);
