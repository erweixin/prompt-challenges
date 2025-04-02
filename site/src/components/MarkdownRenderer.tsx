import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'github-markdown-css/github-markdown.css';
// import 'highlight.js/styles/github.css';

interface MarkdownRendererProps {
  content: string;
}


export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body dark:text-white dark:bg-gray-900">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight, rehypeSlug]}
        components={{
          h1: (props) => <h1 className="text-3xl font-bold border-b pb-2 mb-4 mt-6" {...props} />,
          h2: (props) => <h2 className="text-2xl font-bold border-b pb-2 mb-3 mt-5" {...props} />,
          h3: (props) => <h3 className="text-xl font-semibold mb-2 mt-4" {...props} />,
          h4: (props) => <h4 className="text-lg font-semibold mb-2 mt-4" {...props} />,
          p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
          a: (props) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
          ul: (props) => <ul className="list-disc pl-8 mb-4" {...props} />,
          ol: (props) => <ol className="list-decimal pl-8 mb-4" {...props} />,
          li: (props) => <li className="mb-1" {...props} />,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: ({ inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-red-600 dark:text-red-400 text-sm" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: (props) => <pre className="rounded-md overflow-auto p-4 mb-4 bg-gray-100 dark:bg-gray-800" {...props} />,
          blockquote: (props) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4" {...props} />
          ),
          table: (props) => <table className="border-collapse w-full mb-4" {...props} />,
          th: (props) => <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 p-2 text-left" {...props} />,
          td: (props) => <td className="border border-gray-300 dark:border-gray-600 p-2" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 