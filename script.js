"use strict";
let current = null;
class _Class {
  constructor(name, teacher, number, period, subject) {
    (this.D = document), (this.name = name);
    (this.teacher = teacher), (this.number = number);
    (this.period = period), (this.subject = subject);
    this.cell = this.init();
  }
  init() {
    const cell = this.create(
      "div",
      "",
      "tableCell",
      "col-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-4",
      "col-xxl-3"
    );
    const innerCell = this.create("div", "", "innerCell");
    const head = this.create("div", "", "tableHead");
    const body = this.create("div", "", "tableBody");
    const svg = `<div class="svgDiv"><svg viewBox="0 0 50 50"
          style="display: block; height: 100%; width: 100%"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none">
    <path d="M 50 0 L 0 50 L 50 50 Z" fill="#00400C"/>
    <path d="M 0 0 A 50 50 0 0 0 50 50 L 0 200 Z" fill="green"/>
    
    </svg></div>`;
    const [name, teacher, number, period, subject] = Object.entries(this)
      .slice(1)
      .map((e) => this.create("p", e[1], e[0]));
    cell.append(innerCell), innerCell.append(head), innerCell.append(body);
    innerCell.insertAdjacentHTML("beforeend", svg);
    head.append(name), head.append(number);
    body.append(teacher), body.append(period), body.append(subject);
    return cell;
  }
  create(arg, txt = "", ...classes) {
    const e = this.D.createElement(arg);
    if (classes.length > 0) e.classList.add(...classes);
    e.innerHTML = txt;
    return e;
  }
  print(out) {
    out.insertAdjacentElement("beforeend", this.cell);
  }
}
function run(name, output) {
  output.classList.add("loading");
  fetch(name)
    .then((data) => data.json())
    .then((data) => {
      output.classList.remove("loading");
      output.innerHTML = "";
      current = data;
      data.forEach(
        ({ className, teacher, roomNumber, period, subjectArea }) => {
          const elem = new _Class(
            className,
            teacher,
            `Room: ${roomNumber}`,
            `Period: ${period}`,
            subjectArea
          );
          elem.print(output);
        }
      );
    })
    .catch(
      () =>
        (output.innerHTML =
          "Error Loading Files, please try reloading the webpage. If this error persists, know that we will fix it within two days.")
    );
}
const outElem = document.querySelector("#out");
document.querySelector("#options").addEventListener("change", () => {
  run(document.querySelector("#options").value, outElem);
});
document.querySelector("#sorter").addEventListener("change", () => {
  const v = document.querySelector("#sorter").value;
  switch (v) {
    case "className":
      current = current.sort((a, b) => a[v].charCodeAt(0) - b[v].charCodeAt(0));
      break;
    case "teacher":
      current = current.sort(
        (a, b) =>
          a[v].split(" ")[1].charCodeAt(0) - b[v].split(" ")[1].charCodeAt(0)
      );
      break;
    case "period":
      current = current.sort((a, b) => Number(a[v]) - Number(b[v]));
      break;
    case "roomNumber":
      current = current.sort(
        (a, b) => Number(a[v].slice(1)) - Number(b[v].slice(1))
      );
      break;
    case "subjectArea":
      current = current.sort((a, b) => a[v].charCodeAt(0) - b[v].charCodeAt(0));
      break;
    default:
      throw new Error("invalid");
  }
  outElem.textContent = "";
  current.forEach(({ className, teacher, roomNumber, period, subjectArea }) => {
    const elem = new _Class(
      className,
      teacher,
      `Room: ${roomNumber}`,
      `Period: ${period}`,
      subjectArea
    );
    elem.print(outElem);
  });
});
document.querySelector("#searcher").addEventListener("keyup", () => {
  const v = document.querySelector("#searcher").value;
  let fuse = new Fuse(current, {
    keys: ["teacher", "period", "className", "subjectArea", "roomNumber"],
    threshold: 0.4,
  });
  let results = fuse.search(v);
  outElem.textContent = "";
  if (results.length !== 0) {
    results.forEach(({ item }) => {
      const { className, teacher, roomNumber, period, subjectArea } = item;
      const elem = new _Class(
        className,
        teacher,
        `Room: ${roomNumber}`,
        `Period: ${period}`,
        subjectArea
      );
      elem.print(outElem);
    });
  } else {
    current.forEach(
      ({ className, teacher, roomNumber, period, subjectArea }) => {
        const elem = new _Class(
          className,
          teacher,
          `Room: ${roomNumber}`,
          `Period: ${period}`,
          subjectArea
        );
        elem.print(outElem);
      }
    );
  }
});
run("remy.json", outElem);
