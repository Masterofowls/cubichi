'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  return (
    <div
      className={`prose prose-sm sm:prose-base max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h2:text-xl prose-h3:text-lg
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-em:text-gray-700
        prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
        prose-code:bg-sky-50 prose-code:text-sky-800 prose-code:px-1 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-blockquote:border-sky-400 prose-blockquote:bg-sky-50/50
        prose-blockquote:text-gray-700 prose-blockquote:rounded-r-lg
        prose-ul:text-gray-700 prose-ol:text-gray-700
        prose-li:my-0.5
        prose-hr:border-gray-200
        prose-table:text-sm
        prose-th:bg-sky-50 prose-th:text-sky-800
        prose-img:rounded-lg prose-img:shadow-sm
        ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
