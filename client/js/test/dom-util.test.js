const { createTR,
				createTH,
				createTD,
				removeChildren,
				createEl} = require('../dom-util');

describe('dom-util', () => {
  describe('DOM creation functions', () => {
  	describe('createTR', () => {
  		it('creates valid TR element', () => {
  			const el = createTR();
  			expect(el.tagName).toBe('TR');
  		});
  	});

  	describe('createTH', () => {

  		it('creates valid TH element', () => {
  			const el = createTH();
  			expect(el.tagName).toBe('TH');
  		});

  		it('sets the text of the TH', () => {
  			const text = 'Oh that\`s just greate! Well, game over, man!';
  			const el = createTH(text);
  			expect(el.textContent).toEqual(text);
  		});

  	});

  	describe('createTD', () => {
  		it('creates valid TD element', () => {
  			const el = createTD();
  			expect(el.tagName).toBe('TD');
  		});
  	});

  });  	

  describe('removeChildren', () => {
	  it('removes one child', () => {
	  	
	  	//set up initial state
	  	const parent = document.createElement('DIV');
	  	const child = document.createElement('STRONG');
	  	parent.appendChild(child);

	  	//inspect initial state
	  	expect(parent.childNodes.length).toBe(1);
	  	expect(parent.childNodes[0]).toBe(child);

	  	removeChildren(parent);

	  	expect(parent.childNodes.length).toBe(0);
	  });
  });


});