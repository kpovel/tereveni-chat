export function InputHint({
  showHint,
  hint,
}: {
  showHint: boolean;
  hint: string;
}) {
  if (showHint) {
    return <div className="text-neutral-50">{hint}</div>;
  }

  return <></>;
}
