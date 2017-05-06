const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-view', ()=> {

  beforeEach(() => {
    const fixturePath = './client/js/test/fixtures/sheet-container.html';
    const html = fs.readFileSync(fixturePath, 'utf-8');
    document.documentElement.innerHTML = html;
  });

  describe('table body', () => {

    it('makes changes TO the value of the current cell', () => {
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      view.init();

      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[0].cells[0];
      expect(td.textContent).toBe('');

      document.querySelector('#formula-bar').value = '65';
      view.handleFormulaBarChange();

      trs = document.querySelectorAll('TBODY TR');
      expect(trs[0].cells[0].textContent).toBe('65');

    });

    it('updates FROM the value of the current cell', () => {
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      model.setValue({ col: 2, row: 1}, '123');
      view.init();

      const formulaBarEl = document.querySelector('#formula-bar')
      expect(formulaBarEl.value).toBe('');

      const trs = document.querySelectorAll('TBODY TR');
      trs[1].cells[2].click();

      expect(formulaBarEl.value).toBe('123');

    });

    it('hightlights the current cell when clicked', () => {
      const model = new TableModel(10, 5);
      const view = new TableView(model);
      view.init();

      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.className).toBe('');

      td.click();

      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.className).not.toBe('');
    });

    it('has the right size', () => {
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);
    });

    it('fills in values from the model', () => {
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      model.setValue({col: 2, row: 1}, '123');
      view.init();

      const trs = document.querySelectorAll('TBODY TR');
      expect(trs[1].cells[2].textContent).toBe('123');
    });

  });

  describe('table header', () => {
    it('has valid colmun header labels', () => {
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols,　numRows);
      const view = new TableView(model);
      view.init();

      let ths = document.querySelectorAll('THEAD TH');
      console.log(ths)
      expect(ths.length).toBe(numCols);

      let labelTexts = Array.from(ths).map(el => el.textContent);
      expect(labelTexts).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });
  });

  describe('table footer', () => {
    it('has valid sum value for each column', () => {
      //case:
      //initialize view
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      view.init();

      //simulate input to model
      model.setValue({ col: 0, row: 0}, '12');
      model.setValue({ col: 0, row: 1}, 'p');
      model.setValue({ col: 0, row: 2}, '-158');

      //make sure calcColSum works
      expect(view.calcColSum(model, 0, 3)).toBe('-146');

      //make sure getSumArr works
      // expect(view.getSumArr(model, 3)).toEqual(['-146', '', ''])

      //check each cell has appropriate value
      view.renderTableFooter();
      const tfs = document.querySelectorAll('TFOOT TR');
      console.log(tfs);
      expect(tfs[0].cells[0].textContent).toBe('-146');
    });
  });

});