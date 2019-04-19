import { expect } from 'chai';
import { Analyzer, Bit, splitText } from '../analyzer';
import { describe } from 'mocha';

describe('analyzer', () => {
  describe('analyzer class', () => {
    let underTest;

    beforeEach(() => {
      underTest = new Analyzer(['abs', '123', 'блядь']);
    });

    it('runs analyzer', () => {
      expect(underTest.run()).to.deep.equal([
        {
          word: 'abs',
          isBad: false,
        },
        {
          word: '123',
          isBad: false,
        }, {
          word: 'блядь',
          isBad: true,
        }]);
    });
  });

  describe('analyzer functions', () => {
    let hello;
    let world;
    let space;
    let dot;

    beforeEach(() => {
      hello = new Bit('привет');
      world = new Bit('мир');
      space = new Bit(' ', 1);
      dot = new Bit('.', 1);
    });

    it('splits text to array of word 1', () => {
      expect(splitText('привет мир')).to.deep.equal([hello, space, world]);
    });

    it('splits text to array of word 2', () => {
      expect(splitText('привет .')).to.deep.equal([hello, space, dot]);
    });

    it('splits text to array of word 3', () => {
      expect(splitText('привет!.')).to.deep.equal([
        hello,
        new Bit('!', 1),
        dot,
      ]);
    });

    it('splits text to array of word 4', () => {
      expect(splitText('привет.мир')).to.deep.equal([hello, dot, world]);
    });

    it('splits text to array of word 6', () => {
      expect(splitText('привет МИР')).to.deep.equal([
        hello,
        space,
        new Bit('МИР', 0),
      ]);
    });

    it('splits text to array of word 7', () => {
      expect(splitText('ПРИВЕТ')).to.deep.equal([new Bit('ПРИВЕТ', 0)]);
    });

    it('splits text to array of word 8', () => {
      expect(splitText(';123/')).to.deep
        .equal([
          new Bit(';', 1),
          new Bit('1', 1),
          new Bit('2', 1),
          new Bit('3', 1),
          new Bit('/', 1),
        ]);
    });

    it('splits text to array of word 9', () => {
      expect(splitText('`d Привет wj МИР ')).to.deep
        .equal([
          new Bit('`', 1),
          new Bit('d', 1),
          space,
          new Bit('Привет', 0),
          space,
          new Bit('w', 1),
          new Bit('j', 1),
          space,
          new Bit('МИР', 0),
          space,
        ]);
    });
  });
});
