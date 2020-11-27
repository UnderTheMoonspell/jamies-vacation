import {
  capitalize,
  clamp,
  generateId,
  getCookie,
  getObjectDiff,
  getPlainStringFromRichHtml,
  makeStringUrlSafe,
  sanitize,
} from './utils.service';

describe('Utility functions', () => {
  describe('Compare, and get the difference of 2 objects', () => {
    it('When there is no difference, return an empty object', () => {
      const obj1 = {
        a: 'a',
        b: 'b',
      };

      const obj2 = {
        a: 'a',
        b: 'b',
      };

      expect(getObjectDiff(obj1, obj2)).toEqual({});
    });

    it('Finds difference and returns a new object with only those key/value pairs', () => {
      const obj1 = {
        a: {
          deep: {
            data: 'noChange',
          },
        },
        b: {
          deep: {
            data: 'willChange',
          },
        },
        c: 'rootNoChangeData',
        d: 'rootWillChangeData',
      };

      const obj2 = {
        a: {
          deep: {
            data: 'noChange',
          },
        },
        b: {
          some: {
            deep: 'b-changed',
          },
        },
        c: 'rootNoChangeData',
        d: 'd-changed',
      };

      const expected = {
        b: {
          some: {
            deep: 'b-changed',
          },
        },
        d: 'd-changed',
      };

      expect(getObjectDiff(obj1, obj2)).toEqual(expected);
    });
  });

  describe('random id generator', () => {
    it('Should generate random id', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toEqual(id2);
    });

    it('Should generate id upto 5 characters', () => {
      const id = generateId();
      expect(id.length < 6).toBe(true);
    });
  });

  describe('makeStringUrlSafe', () => {
    it('Should make string url safe', () => {
      const testString = '2j/s24&ˆ#@ _@%';
      expect(makeStringUrlSafe(testString)).toEqual('2js24-');
    });
  });

  describe('getPlainStringFromRichHtml', () => {
    it('Should get plain text from rich html', () => {
      const html = ' <p>Some<br><span>cool</span>text&nbsp;here</p> ';
      expect(getPlainStringFromRichHtml(html)).toEqual('Some cool text here');
    });
  });

  describe('capitalize', () => {
    it('Should capitalize first letter of a string', () => {
      expect(capitalize('abc def G')).toEqual('Abc def G');
    });
  });

  describe('getcookie', () => {
    it('should retrieve cookie', () => {
      const name = 'cookieName';
      const value = 'cookieValue';
      document.cookie = `${name}=${value || ''}; path=/`;
      expect(getCookie(name)).toBe(value);
    });
  });

  describe('sanitize', () => {
    it('should sanitize html content', () => {
      const content =
        '<script>safffasf</script><h1>HEYYYY</h1><img src="sdfg.com"/>PORTUGAL';
      expect(sanitize(content)).toBe(
        'safffasf<h1>HEYYYY</h1><img src="sdfg.com"/>PORTUGAL'
      );
    });
  });

  describe('clamp', () => {
    it('should clamp a number between a max and min value', () => {
      expect(clamp(42, 1, 12)).toBe(12);
      expect(clamp(6, 1, 12)).toBe(6);
      expect(clamp(1, 3, 12)).toBe(3);
    });
  });
});
