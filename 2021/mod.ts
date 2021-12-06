console.log("\x1b[1mYear 2021\x1b[0m");

const path = new URL("./", import.meta.url);
const dayRegexp = /day_\d+.ts/;

const files = [...Deno.readDirSync(path)].filter(({ name }) =>
  dayRegexp.test(name)
).sort(({ name: n1 }, { name: n2 }) => {
  const a = Number(n1.match(/\d+/)?.[0] || 0);
  const b = Number(n2.match(/\d+/)?.[0] || 0);

  return a - b;
});

for (const { name } of files) {
  await import(path + name);
}
