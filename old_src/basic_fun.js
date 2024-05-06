const a5 = [1, 2, 3];

for (let i = 0; i < a5.length; i++) {
  console.log(a5[i]);
}
console.log('-------------------');
a5.forEach((n) => {
  console.log(n);
}); // forEach는 리턴값이 없음(위와 동일한 표현)
console.log('-------------------');

const b5 = a5.map((n) => {
  return n * 2;
}); // map은 리턴값이 있음

console.log(`b5의 값은 : ${b5}`);
