import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      return (
        <h1 className="mb-10 text-center text-lg font-medium text-neutral-50">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-3 mt-5 text-sm font-normal text-white">{children}</h2>
      );
    },
    a: ({ children, href }) => {
      if (href?.startsWith("mailto:")) {
        return (
          <Link href={href!} className="text-[#7C01F6]">
            {children}
          </Link>
        );
      }

      return (
        <Link
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7C01F6]"
        >
          {children}
        </Link>
      );
    },
    ul: ({ children }) => {
      return <ul className="my-3 *:pl-0 pl-5">{children}</ul>;
    },
    li: ({ children }) => {
      return <li className="m-0 text-sm leading-normal *:my-3">{children}</li>;
    },
    p: ({ children }) => {
      return <p className="my-5 text-sm">{children}</p>;
    },
    table: ({ children }) => {
      return (
        <table className="mb-5 ml-6 mt-3 w-[calc(100%-20px)] border-collapse rounded-[24px] border-hidden leading-normal shadow-[0_0_0_1px_#444444]">
          {children}
        </table>
      );
    },
    tr: ({ children }) => {
      return (
        <tr className="[&>th:first-child]:rounded-tl-3xl [&>th:first-child]:bg-[#050404] [&>th:nth-child(2)]:rounded-tr-3xl [&>th:nth-child(2)]:bg-[#050404]">
          {children}
        </tr>
      );
    },
    th: ({ children }) => {
      return (
        <th className="border border-[#444444] px-4 py-2 align-middle text-white">
          {children}
        </th>
      );
    },
    td: ({ children }) => {
      return (
        <td className="border border-[#444444] px-4 py-2 align-middle text-white">
          {children}
        </td>
      );
    },
    ...components,
  };
}
