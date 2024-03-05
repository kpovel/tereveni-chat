export function ErrorMessage({
  showError,
  errorMessage,
}: {
  showError: boolean;
  errorMessage: string;
}) {
  if (showError) {
    return <div className="text-[#FF453A]">{errorMessage}</div>;
  }

  return <></>;
}
