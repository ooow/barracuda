/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { Analyzer, checkIsBad, splitText } from '../src/analyzer';
import { Bit } from '../src/model';

describe('analyzer', () => {
  describe('analyzer class', () => {
    let underTest;

    beforeEach(() => {
      underTest = new Analyzer('z 7 блядь!привет');
    });

    it('runs analyzer', () => {
      expect(underTest.run())
        .to
        .deep
        .equal([
          {
            data: 'z',
            isWord: false,
            isBad: false,
          },
          {
            data: ' ',
            isWord: false,
            isBad: false,
          },
          {
            data: '7',
            isWord: false,
            isBad: false,
          },
          {
            data: ' ',
            isWord: false,
            isBad: false,
          },
          {
            data: 'блядь',
            isWord: true,
            isBad: true,
          },
          {
            data: '!',
            isWord: false,
            isBad: false,
          },
          {
            data: 'привет',
            isWord: true,
            isBad: false,
          },
        ]);
    });
  });

  describe('analyzer functions', () => {
    describe('splitText', () => {
      let hello;
      let world;
      let space;
      let dot;

      beforeEach(() => {
        hello = new Bit('привет');
        world = new Bit('мир');
        space = new Bit(' ', false);
        dot = new Bit('.', false);
      });

      it('splits text to array of word 1', () => {
        expect(splitText('привет мир'))
          .to
          .deep
          .equal([hello, space, world]);
      });

      it('splits text to array of word 2', () => {
        expect(splitText('привет .'))
          .to
          .deep
          .equal([hello, space, dot]);
      });

      it('splits text to array of word 3', () => {
        expect(splitText('привет!.'))
          .to
          .deep
          .equal([
            hello,
            new Bit('!', false),
            dot,
          ]);
      });

      it('splits text to array of word 4', () => {
        expect(splitText('привет.мир'))
          .to
          .deep
          .equal([hello, dot, world]);
      });

      it('splits text to array of word 6', () => {
        expect(splitText('привет МИР'))
          .to
          .deep
          .equal([
            hello,
            space,
            new Bit('МИР', true),
          ]);
      });

      it('splits text to array of word 7', () => {
        expect(splitText('ПРИВЕТ'))
          .to
          .deep
          .equal([new Bit('ПРИВЕТ', true)]);
      });

      it('splits text to array of word 8', () => {
        expect(splitText(';123/'))
          .to
          .deep
          .equal([
            new Bit(';', false),
            new Bit('1', false),
            new Bit('2', false),
            new Bit('3', false),
            new Bit('/', false),
          ]);
      });

      it('splits text to array of word 9', () => {
        expect(splitText('`d Привет wj МИР '))
          .to
          .deep
          .equal([
            new Bit('`', false),
            new Bit('d', false),
            space,
            new Bit('Привет', true),
            space,
            new Bit('w', false),
            new Bit('j', false),
            space,
            new Bit('МИР', true),
            space,
          ]);
      });
    });

    describe('checkIsBad', () => {
      it('marks the bit as bad', () => {
        expect(checkIsBad(new Bit('блядь')).isBad).to.be.true;
      });

      it('marks the bit in camel case as bad', () => {
        expect(checkIsBad(new Bit('Блядь')).isBad).to.be.true;
      });

      it('marks the bit in upper case as bad', () => {
        expect(checkIsBad(new Bit('БЛЯДЬ')).isBad).to.be.true;
      });

      it('skips symbol', () => {
        expect(checkIsBad(new Bit(';')).isBad).to.be.false;
      });

      it('does not mark common word', () => {
        expect(checkIsBad(new Bit('привет')).isBad).to.be.false;
      });

      describe('using pizd regexp', () => {
        it('marks пизд as bad', () => {
          expect(checkIsBad(new Bit('пизд')).isBad).to.be.true;
        });

        it('marks ппппппииеиизссдец as bad', () => {
          expect(checkIsBad(new Bit('ппппппииеиизссдец')).isBad).to.be.true;
        });

        it('does not mark поезд as bad', () => {
          expect(checkIsBad(new Bit('поезд')).isBad).to.be.false;
        });

        it('does not mark пес/пёс as bad', () => {
          expect(checkIsBad(new Bit('пес')).isBad).to.be.false;
          expect(checkIsBad(new Bit('пёс')).isBad).to.be.false;
        });

        it('does not mark пистолет as bad', () => {
          expect(checkIsBad(new Bit('пистолет')).isBad).to.be.false;
        });
      });

      describe('using blyad regexp', () => {
        it('marks бля as bad', () => {
          expect(checkIsBad(new Bit('бля')).isBad).to.be.true;
        });

        it('marks ббббббляяяяя as bad', () => {
          expect(checkIsBad(new Bit('ббббббляяяяя')).isBad).to.be.true;
        });

        it('does not mark рубль as bad', () => {
          expect(checkIsBad(new Bit('рубль')).isBad).to.be.false;
        });
      });

      describe('using hui regexp', () => {
        it('marks хуйль as bad', () => {
          expect(checkIsBad(new Bit('хуйль')).isBad).to.be.true;
        });

        it('marks нааааахуууууууй as bad', () => {
          expect(checkIsBad(new Bit('нааааахуууууууй')).isBad).to.be.true;
        });

        it('marks нахуй as bad', () => {
          expect(checkIsBad(new Bit('нахуй')).isBad).to.be.true;
        });

        it('marks хуйло as bad', () => {
          expect(checkIsBad(new Bit('хуйло')).isBad).to.be.true;
        });
      });
    });
  });
});
