/**
 * Shared Markdown processor construction.
 *
 * Keeping CommonMark and GFM setup in one place prevents parser and renderer
 * drift as Commonloom grows additional Markdown options.
 */
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

/** Create the Commonloom Markdown parser base used by parse and render paths. */
export function createMarkdownProcessor() {
  return unified().use(remarkParse).use(remarkGfm);
}
