import { renderDynamicPage } from '../';

describe.skip('render', () => {
  jest.setTimeout(15000);

  describe('renderDynamicPage()', () => {
    it('should fail with an error for an invalid url', async () => {
      try {
        await renderDynamicPage('invalid url');
      } catch (e) {
        expect(e.toString()).toEqual(
          'Error: Protocol error (Page.navigate): Cannot navigate to invalid URL'
        );
      } finally {
        // Do nothing here
      }
    });

    it('should return the full html source', async () => {
      const html = await renderDynamicPage('http://southportventures.com');
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
      expect(html).toContain('<body');
      expect(html).toContain('</body>');
    });

    it('should play nice with some JavaScript pages (still testing)', async () => {
      const html = await renderDynamicPage('https://builderbook.org');
      expect(html).toContain('Why this book?');
    });
  });
});
