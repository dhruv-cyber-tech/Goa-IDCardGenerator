import { useRef } from "react";

export function UploadArea({
  photo,
  onSelect,
  hint = true,
}: {
  photo: string | null;
  onSelect: (file: File) => void;
  hint?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];

    if (!file) return;

    onSelect(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        id="hh-photo"
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files);

          // Allows selecting the same file again
          e.currentTarget.value = "";
        }}
      />

      <label
        htmlFor="hh-photo"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="block w-full cursor-pointer border-2 border-dashed border-goa-pink/70 bg-transparent px-4 py-7 text-center transition-colors hover:bg-goa-pink/5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-goa-pink"
      >
        {photo ? (
          <span className="flex flex-col items-center gap-3">
            <img
              src={photo}
              alt="Your uploaded photo"
              className="h-24 w-24 object-cover"
            />

            <span className="font-mono text-[0.62rem] tracking-[0.12em] text-goa-green-deep">
              CHANGE PHOTO
            </span>
          </span>
        ) : (
          <span className="flex flex-col items-center">
            <span
              className="text-3xl leading-none font-light text-goa-pink"
              aria-hidden="true"
            >
              +
            </span>

            <span className="mt-3 font-mono text-[0.68rem] font-bold tracking-[0.12em] text-goa-green-deep md:hidden">
              TAP TO UPLOAD
            </span>

            <span className="mt-3 hidden font-mono text-[0.62rem] font-bold leading-[1.5] tracking-[0.12em] text-goa-green-deep md:block">
              DRAG &amp; DROP
              <br />
              OR CLICK TO UPLOAD
            </span>

            {hint && (
              <span className="mt-2 font-mono text-[0.62rem] tracking-[0.1em] text-goa-green-deep/70">
                JPG / PNG / HEIC • MAX 10MB
              </span>
            )}
          </span>
        )}
      </label>
    </div>
  );
}