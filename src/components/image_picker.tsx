import { useRef, useState, useEffect, useImperativeHandle } from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DisplayInfo } from "./display_info";
import UploadIcon from "../assets/images/icon-upload.svg?react";

type Props = {
  ref: React.Ref<{ validate: () => void }>;
  onSelectImage: (img: File | null) => void;
  maxFileSize?: number;
  acceptedFiles?: string;
};

export default function ImagePicker({
  ref,
  onSelectImage,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  acceptedFiles = "image/*",
}: Props) {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePickerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    validate() {
      if (imagePickerRef.current) {
        imagePickerRef.current.focus();
      }
      setError("Please upload your avatar image!");
    },
  }));

  useEffect(() => {
    if (preview) setError("");

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Announce errors to screen readers
  useEffect(() => {
    if (error) {
      // Create a live region announcement
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "alert");
      announcement.setAttribute("aria-live", "assertive");
      announcement.className = "sr-only";
      announcement.textContent = error;
      document.body.appendChild(announcement);
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 3000);
    }
  }, [error]);

  function processFile(file: File) {
    const fileType = file.type;
    const acceptedTypes = acceptedFiles.split(",").map((type) => type.trim());

    if (
      !acceptedTypes.some(
        (type) =>
          type === fileType ||
          (type.endsWith("/*") && fileType.startsWith(type.replace("/*", "/"))),
      )
    ) {
      setError(`File type not accepted. Please upload: ${acceptedFiles}`);
      revokeImage();
      return;
    }

    if (file.size > maxFileSize) {
      setError(
        `File too large. Please upload a photo under ${maxFileSize / (1024 * 1024)}MB!`,
      );
      revokeImage();
      return;
    }

    const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);
    onSelectImage(file);
  }

  function handleImagePicker(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFile(files[0]);
    e.target.value = ""; // Reset the input value to allow reselecting the same file
  }

  function openImagePicker() {
    fileInputRef.current?.click();
  }

  function revokeImage() {
    setPreview("");
    onSelectImage(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openImagePicker();
    }
  }

  function handleImageRemove(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    setError("");
    setPreview("");
    onSelectImage(null);
  }

  // Drag and drop handlers
  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    // Disable dragging if we're leaving the dropzone itself and not one of its children
    if (e.currentTarget === e.target) setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) processFile(files[0]);
  }

  return (
    <section className="my-4 flex flex-col justify-center text-left">
      <h2 className="text-base sm:text-xl">Upload Avatar</h2>
      <div
        id="image-picker"
        role="button"
        tabIndex={0}
        ref={imagePickerRef}
        aria-label="Select an image"
        aria-describedby="image-picker-status"
        className={cn(
          "relative overflow-hidden rounded-xl",
          "my-2 min-w-xs px-6 py-3 backdrop-blur-xs",
          "flex flex-col items-center justify-center gap-4 sm:gap-6",
          `border border-dashed border-(--neutral-700)`,
          "bg-(--neutral-300)/5 transition-[background-color]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--neutral-500)",
          "transition-[borderColor]",
          preview
            ? "border-green-400"
            : "cursor-pointer hover:bg-(--neutral-300)/15",
          isDragging ? "border-blue-400" : "",
          error && !isDragging && !preview ? "border-red-400" : "",
        )}
        onClick={!preview ? openImagePicker : () => {}}
        onKeyDown={!preview ? handleKeyDown : () => {}}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className="flex size-14 items-center justify-center overflow-hidden rounded-[.65rem] border border-(--neutral-500)/15 bg-(--neutral-700)/40 shadow shadow-neutral-900 sm:size-16">
          {preview ? (
            <img
              src={preview}
              alt="user avatar"
              className="size-full object-cover object-top"
            />
          ) : (
            <UploadIcon className="size-9" />
          )}
        </span>
        {preview ? (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="z-10 h-6 cursor-pointer rounded bg-(--neutral-300)/10 px-2 py-1 text-[.7rem] text-(--neutral-500) underline-offset-2 hover:bg-(--neutral-300)/5 hover:underline sm:py-4 sm:text-base"
              onClick={handleImageRemove}
            >
              Remove image
            </Button>
            <Button
              type="button"
              className="z-10 h-6 cursor-pointer rounded bg-(--neutral-300)/10 px-2 py-1 text-[.7rem] text-(--neutral-500) underline-offset-2 hover:bg-(--neutral-300)/5 hover:underline sm:py-4 sm:text-base"
              onClick={openImagePicker}
            >
              Change image
            </Button>
          </div>
        ) : (
          <p className="text-base text-(--neutral-500)">
            Drag and Drop or click to upload
          </p>
        )}
        <input
          type="file"
          name="image"
          id="image-file"
          className="hidden"
          autoFocus={false}
          multiple={false}
          ref={fileInputRef}
          accept={acceptedFiles}
          onChange={handleImagePicker}
        />
      </div>
      <DisplayInfo
        error={error}
        defaultMessage="Upload you photo (JPG or PNG, max size: 5MB)."
      />
    </section>
  );
}
