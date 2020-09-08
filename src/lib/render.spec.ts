/* tslint:disable:no-expression-statement no-unused-expression */
import { expect } from 'chai';
import { renderDynamicPage } from './render';

describe('render', () => {
  describe('renderDynamicPage()', () => {
    it('should fail with an error for an invalid url', async () => {
      try {
        await renderDynamicPage('invalid url');
      } catch (e) {
        expect(e.toString()).to.eql(
          'Error: Protocol error (Page.navigate): Cannot navigate to invalid URL'
        );
      } finally {
        // Do nothing here
      }
    });

    it('should return the full html source', async () => {
      const html = await renderDynamicPage('http://southportventures.com');
      expect(html).to.contain('<html');
      expect(html).to.contain('</html>');
      expect(html).to.contain('<body');
      expect(html).to.contain('</body>');
    });

    it('should play nice with some JavaScript pages (still testing)', async () => {
      const html = await renderDynamicPage('https://builderbook.org');
      expect(html).to.contain('Why this book?');
    });
  });
});
