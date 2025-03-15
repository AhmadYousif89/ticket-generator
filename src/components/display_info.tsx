import InfoIcon from "../assets/images/icon-info.svg?react";

type Props = { error: string; defaultMessage?: string };

export function DisplayInfo({ error, defaultMessage }: Props) {
  const message = <p className="text-(--neutral-500)/75">{defaultMessage}</p>;
  const errorMessage = <p className="text-red-400">{error}</p>;

  return (
    <div className="flex items-center gap-1 text-xs font-semibold">
      {(error || defaultMessage) && (
        <InfoIcon className={`size-4 ${error ? "stroke-red-400" : "stroke-(--neutral-500)/75"}`} />
      )}
      {error ? errorMessage : message}
    </div>
  );
}
