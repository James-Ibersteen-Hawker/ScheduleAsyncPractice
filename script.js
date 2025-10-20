"use strict";
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
      "col-md-3"
    );
    const innerCell = this.create("div", "", "innerCell");
    const head = this.create("div", "", "tableHead");
    const body = this.create("div", "", "tableBody");
    const [name, teacher, number, period, subject] = Object.entries(this)
      .slice(1)
      .map((e) => this.create("p", e[1], e[0]));
    cell.append(innerCell), innerCell.append(head), innerCell.append(body);
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
    out.append(this.cell);
  }
}
function run(name, output) {
  output.classList.add("loading");
  try {
    fetch(name)
      .then((data) => data.json())
      .then((data) => {
        output.classList.remove("loading");
        output.innerHTML = "";
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
      });
  } catch (error) {
    output.innerHTML = "Error Loading";
  }
}
const outElem = document.querySelector("#out");
document.querySelector("#options").addEventListener("change", () => {
  run(document.querySelector("#options").value, outElem);
});
run("remy.json", outElem);
