"use strict";
class _Class {
  constructor(name, teacher, number, period, subject) {
    (this.D = document), (this.name = name);
    (this.teacher = teacher), (this.number = number);
    (this.period = period), (this.subject = subject);
    this.cell = this.init();
  }
  init() {
    const cell = this.create("div", "", "tableCell");
    const head = this.create("div", "", "tableHead");
    const body = this.create("div", "", "tableBody");
    const [name, teacher, number, period, subject] = Object.entries(this)
      .slice(1)
      .map((e) => this.create("p", e[1], e[0]));
    cell.append(head), cell.append(body);
    head.append(name), head.append(number);
    body.append(teacher), body.append(period), body.append(subject);
    return cell;
  }
  create(arg, txt = "", ...classes) {
    const e = this.D.createElement(arg);
    if (classes.length > 0) e.classList.add(classes);
    e.innerHTML = txt;
    return e;
  }
}

new _Class("ji", 1, 2, 3, 4);

fetch("scheduleR.json")
  .then((data) => data.json())
  .then((data) => {
    data.forEach((e) =>
      document
        .querySelector("#out")
        .insertAdjacentHTML("beforeend", `<h2>${e.className}</h2>`)
    );
  });
