const { getLetterRange } = require('./array-util');
const { removeChildren, createTH } = require('./dom-util');

class TableView {

  constructor(model) {
    this.model =　model;
  }

  init() {
    this.initDomRerefences();
    this.renderTable();
  }

  initDomRerefences() {
    this.headerRowEl = document.querySelector('THEAD TR');
  }

  renderTable() {
    this.renderTableHeader();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    getLetterRange('A', this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th));
  }
}

module.exports = TableView;