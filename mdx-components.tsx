import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      return (
        <h1 className="text-center text-lg font-medium text-neutral-50">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return <h2 className="text-sm font-normal text-white mt-5 mb-3">{children}</h2>;
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
      return <ul className="*:pl-0 my-3">{children}</ul>;
    },
    li: ({ children }) => {
      return <li className="leading-normal m-0 text-sm *:my-3">{children}</li>;
    },
    p: ({ children }) => {
      return <p className="text-sm">{children}</p>;
    },
    table: ({ children }) => {
      return (
        <table className="border-collapse rounded-[24px] border-hidden leading-normal shadow-[0_0_0_1px_#444444]">
          {children}
        </table>
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
