export function sortNameCapital(name) {
  const splitStr = name?.split(" ");
  var sortName = [];
  for (let i = 0; i < splitStr?.length && i < 2; i++) {
    sortName.push(splitStr[i].charAt(0).toUpperCase());
  }
  return sortName.join("");
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
