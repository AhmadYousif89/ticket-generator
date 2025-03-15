import { useRef, useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ImagePicker from "./image_picker";
import { DisplayInfo } from "./display_info";
import GeneratedTicket from "./generated_ticket";

const NAME_REGEX_PATTERN = /^[A-Za-z]{3,}(?:\s[A-Za-z]+)*$/;
const EMAIL_REGEX_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOCIAL_REGEX_PATTERN = /^[A-Za-z\d](?:[A-Za-z\d]|-(?=[A-Za-z\d])){0,38}$/;

export type FormInputs = {
  name: string;
  email: string;
  social: string;
  image: File | null;
};

export default function TicketForm() {
  const [form, setForm] = useState<FormInputs>({
    name: "",
    email: "",
    social: "",
    image: null,
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState({ name: "", email: "", social: "" });
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const socialRef = useRef<HTMLInputElement>(null);
  const imagePickerRef = useRef<{ validate: () => void }>({ validate() {} });

  function handleOnBlur(input: string | undefined) {
    const value =
      input === "name"
        ? nameRef.current?.value
        : input === "email"
          ? emailRef.current?.value
          : socialRef.current?.value;

    const regex =
      input === "name"
        ? NAME_REGEX_PATTERN
        : input === "email"
          ? EMAIL_REGEX_PATTERN
          : SOCIAL_REGEX_PATTERN;

    if (input && value) {
      if (regex.test(value)) {
        console.log({ regex, value });
        setError((state) => ({ ...state, [input]: "" }));
        console.log("valid");
      } else {
        const title =
          input === "social"
            ? "github username"
            : input === "email"
              ? "email address"
              : input;
        setError((state) => ({
          ...state,
          [input]: `Please enter a valid ${title}!`,
        }));
        console.log("invalid");
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = nameRef.current;
    const email = emailRef.current;
    const social = socialRef.current;

    if (!image) imagePickerRef.current.validate();
    if (!name?.value)
      setError((state) => ({ ...state, name: `Please enter a valid name!` }));
    if (!email?.value)
      setError((state) => ({
        ...state,
        email: `Please enter a valid email address!`,
      }));
    if (!social?.value)
      setError((state) => ({
        ...state,
        social: `Please enter a valid github username!`,
      }));
    if (!name?.value || !email?.value || !social?.value || !image) {
      return;
    }

    setForm((state) => ({
      ...state,
      name: name.value,
      email: email.value,
      social: social.value,
      image: image,
    }));
  }

  const formIsValid = form.name && form.email && form.social && form.image;

  return (
    <div className="mx-auto w-full max-w-3xl self-center px-4">
      {!formIsValid ? (
        <>
          <header className="text-balance">
            <h2 className="mx-auto flex flex-col text-2xl font-bold sm:text-4xl xl:text-5xl">
              <span>Your Journey to Coding Conf</span>
              <span>{new Date().getFullYear()} Start Here!</span>
            </h2>
            <p className="pt-4 text-base leading-5 font-semibold text-[var(--neutral-500)]">
              Secure your spot at next year&apos;s biggest coding conference.
            </p>
          </header>
          <form className="pt-6" onSubmit={handleSubmit}>
            <ImagePicker
              ref={imagePickerRef}
              onSelectImage={(image: File | null) => setImage(image)}
            />
            <div className="mt-8 flex flex-col gap-4 text-left">
              <fieldset className="space-y-2">
                <Input
                  id="name"
                  type="text"
                  label="Full Name"
                  ref={nameRef}
                  minLength={3}
                  defaultValue={nameRef.current?.value}
                  placeholder="anonymous"
                  title="Please enter your full name"
                  className={`backdrop-blur-xs ${error.name ? "border-red-400" : ""}`}
                  onBlur={() => handleOnBlur(nameRef.current?.id)}
                />
                <DisplayInfo error={error.name} />
              </fieldset>
              <fieldset className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  ref={emailRef}
                  defaultValue={emailRef.current?.value}
                  label="Email Address"
                  placeholder="example@email.com"
                  title="Please enter a valid email address"
                  className={`backdrop-blur-xs ${error.email ? "border-red-400" : ""}`}
                  onBlur={() => handleOnBlur(emailRef.current?.id)}
                />
                <DisplayInfo error={error.email} />
              </fieldset>
              <fieldset className="space-y-2">
                <Input
                  id="social"
                  type="text"
                  minLength={3}
                  ref={socialRef}
                  defaultValue={socialRef.current?.value}
                  label="GitHub Username"
                  placeholder="@github-username"
                  title="Please enter your social username"
                  className={`backdrop-blur-xs ${error.social ? "border-red-400" : ""}`}
                  onBlur={() => handleOnBlur(socialRef.current?.id)}
                />
                <DisplayInfo error={error.social} />
              </fieldset>
            </div>
            <Button className="mt-6 h-12 w-full rounded-lg bg-(--orange-500) py-3 text-base font-bold text-(--neutral-900) focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-(--neutral-300) focus-within:outline-dashed hover:bg-(--orange-700)">
              Generate My Ticket
            </Button>
          </form>
        </>
      ) : (
        <GeneratedTicket {...form} />
      )}
    </div>
  );
}
