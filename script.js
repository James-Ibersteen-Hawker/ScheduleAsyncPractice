console.log("here");
async function testing() {
  let test = await fetch(
    "https://james-ibersteen-hawker.github.io/Team-Roster-Website/quotes.txt"
  );
  let testBody = await test.text();
  console.log(test, testBody);
}
testing();
