const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTH, createTD } = require('./dom-util');

class TableView {

  constructor(model) {
    this.model =　model;
  }

  init() {
    this.initDomRerefences();
    this.initCurrentCell();
    this.renderTable();
    this.attachEventHandlers();
  }

  initDomRerefences() {
    this.headerRowEl = document.querySelector('THEAD TR');
    this.sheetBodyEl = document.querySelector('TBODY');
    this.footerRowEl = document.querySelector('TFOOT TR');
    this.formulaBarEl = document.querySelector('#formula-bar');
  //   console.log(this.headerRowEl);
  //   console.log(this.footerRowEl);
   }

  initCurrentCell() {
    this.currentCellLocation = { col: 0, row: 0 };
    this.renderFormulaBar();
  }

  normalizeValueForRendering(value) {
    return value || '';
  }

  renderFormulaBar() {
    const currentCellValue = this.model.getValue(this.currentCellLocation);
    this.formulaBarEl.value = this.normalizeValueForRendering(currentCellValue);
    this.formulaBarEl.focus();
  }

  renderTable() {
    this.renderTableHeader();
    this.renderTableBody();
    this.renderTableFooter();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    getLetterRange('A', this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th));
  }

  calcColSum(model, col, numRows) {
    let sum = 0;
    for(let row = 0; row < numRows; row++) {
      const position = { col: col, row: row};
      const value = model.getValue(position);
      if(value && Number(value)) {
        sum += Number(value);
      }
    }
    return String(sum) || '';
  }

  getSumArr(model, numCols) {
    var sumArr = [];
    for(let col = 0; col < numCols; col++) {
      sumArr.push(this.calcColSum(model, col, numCols));
    }
    return sumArr;
  }

  renderTableFooter() {
    if(this.footerRowEl) {
      removeChildren(this.footerRowEl);
      this.getSumArr(this.model, this.model.numCols)
        .map(eachValue => createTD(eachValue))
        .forEach(td => this.footerRowEl.appendChild(td));
    }
  }

  isCurrentCell(col, row) {
    return this.currentCellLocation.col === col
      &&
           this.currentCellLocation.row === row;
  }

  renderTableBody() {
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.model.numRows; row++) {
      const tr = createTR();
      for (let col = 0; col < this.model.numCols; col++) {
        const position = {col: col, row: row};
        const value = this.model.getValue(position);
        const td = createTD(value);

        if (this.isCurrentCell(col, row)) {
          td.className = 'current-cell';
        }

        tr.appendChild(td);
      }
      fragment.appendChild(tr);
    }
    removeChildren(this.sheetBodyEl);
    this.sheetBodyEl.appendChild(fragment);
  }

  attachEventHandlers() {
    this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
    this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
  }

  handleFormulaBarChange(evt) {
    const value = this.formulaBarEl.value;
    this.model.setValue(this.currentCellLocation, value);
    this.renderTableBody();
  }

  handleSheetClick(evt) {
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex - 1;

    this.currentCellLocation = { col: col, row: row };
    this.renderTableBody();

    this.renderFormulaBar();

  }
}

module.exports = TableView;