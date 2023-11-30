export default function Home({params}: {params: {lang: string}}) {
  return (
    <div>
      selected lang is {params.lang}
      </div>
  );
}
