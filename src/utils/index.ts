export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => (word.toUpperCase()))
    .replace(/\s+/g, '');
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
