import insane, { AllowedTags } from 'insane';
import { marked, Renderer } from 'marked';
import React, { CSSProperties, useMemo } from 'react';

const ALLOWED_TAGS: AllowedTags[] = [
  'a',
  'article',
  'b',
  'blockquote',
  'br',
  'caption',
  'code',
  'del',
  'details',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'ins',
  'kbd',
  'li',
  'main',
  'ol',
  'p',
  'pre',
  'section',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
];
const GENERIC_ALLOWED_ATTRIBUTES = ['style', 'title'];
const TABLE_ALLOWED_ATTRIBUTES = ['width', 'cellpadding', 'cellspacing', 'border', 'role'];
const PARAGRAPH_TOP_PADDING_PX = 5;
const PARAGRAPH_BOTTOM_PADDING_PX = 16;

function sanitizer(html: string): string {
  return insane(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      ...ALLOWED_TAGS.reduce<Record<string, string[]>>((res, tag) => {
        res[tag] = [...GENERIC_ALLOWED_ATTRIBUTES];
        return res;
      }, {}),
      img: ['src', 'srcset', 'alt', 'width', 'height', ...GENERIC_ALLOWED_ATTRIBUTES],
      table: [...TABLE_ALLOWED_ATTRIBUTES, ...GENERIC_ALLOWED_ATTRIBUTES],
      td: ['align', 'width', ...GENERIC_ALLOWED_ATTRIBUTES],
      th: ['align', 'width', ...GENERIC_ALLOWED_ATTRIBUTES],
      a: ['href', 'target', ...GENERIC_ALLOWED_ATTRIBUTES],
      ol: ['start', ...GENERIC_ALLOWED_ATTRIBUTES],
      ul: ['start', ...GENERIC_ALLOWED_ATTRIBUTES],
    },
  });
}

class CustomRenderer extends Renderer {
  private linkColor?: string | null;
  constructor(linkColor?: string | null) {
    super();
    this.linkColor = linkColor;
  }
  table(header: string, body: string) {
    return `<table width="100%">
<thead>
${header}</thead>
<tbody>
${body}</tbody>
</table>`;
  }

  link(href: string, title: string | null, text: string) {
    if (this.linkColor) {
      if (!title) {
        return `<a href="${href}" style="color: ${this.linkColor}" target="_blank">${text}</a>`;
      }
      return `<a href="${href}" title="${title}" style="color: ${this.linkColor}" target="_blank">${text}</a>`;
    }
    if (!title) {
      return `<a href="${href}" target="_blank">${text}</a>`;
    }
    return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  }

  paragraph(text: string) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="word-break:break-word">
<tbody>
<tr>
<td style="padding-top: ${PARAGRAPH_TOP_PADDING_PX}px; padding-bottom: ${PARAGRAPH_BOTTOM_PADDING_PX}px;">
<p style="margin: 0;">${text}</p>
</td>
</tr>
</tbody>
</table>`;
  }
}

function renderMarkdownString(str: string, linkColor?: string | null): string {
  const html = marked.parse(str, {
    async: false,
    breaks: true,
    gfm: true,
    pedantic: false,
    silent: false,
    renderer: new CustomRenderer(linkColor),
  });
  if (typeof html !== 'string') {
    throw new Error('marked.parse did not return a string');
  }
  return sanitizer(html);
}

type Props = {
  style: CSSProperties;
  markdown: string;
  linkColor?: string | null;
};
export default function EmailMarkdown({ markdown, linkColor, ...props }: Props) {
  const data = useMemo(() => renderMarkdownString(markdown, linkColor), [markdown, linkColor]);
  return <div {...props} dangerouslySetInnerHTML={{ __html: data }} />;
}
