import Logo from "../assets/images/logo-full.svg?react";
import GithubIcon from "../assets/images/icon-github.svg?react";
import Ticket from "../assets/images/pattern-ticket.svg?react";
import { FormInputs } from "./ticket_form";

type Props = FormInputs;

export default function GeneratedTicket({ name, email, social, image }: Props) {
  return (
    <section className="mx-2 flex flex-col items-center">
      <header className="max-w-sm">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Congrats,{" "}
          <span className="bg-gradient-to-r from-(--orange-700) via-(--orange-500) via-30% to-(--neutral-300) bg-clip-text text-transparent">
            {name}!
          </span>{" "}
          Your ticket is ready.
        </h2>

        <p className="pt-4 text-base font-semibold text-balance text-(--neutral-500) sm:text-xl">
          We have emailed your ticket to{" "}
          <span className="text-(--orange-500)">{email}</span> and will send
          updates in the run up to the event.
        </p>
      </header>

      <div className="@container mt-24 grid size-full grid-cols-1 grid-rows-2 backdrop-blur-sm">
        <Ticket className="col-span-full row-span-full size-full" />
        <div className="col-span-full row-[1] p-4 @md:mt-4 @md:ml-2">
          <Logo className="size-1/2" />
          <p className="pl-8 text-left text-base font-medium text-(--neutral-500) @md:pl-12 @md:text-xl">
            Jan 31, 2025 / Austin, TX
          </p>
        </div>

        <div className="col-span-full row-[2] flex gap-4 px-4 pt-4 @md:ml-2">
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt="attendance avatar"
            className="size-14 rounded-lg border border-(--neutral-500)/15 object-cover shadow shadow-neutral-900 @md:size-16 @lg:size-20"
          />
          <span className="text-left font-semibold">
            <h3 className="text-(--neutral-300) @md:text-2xl @lg:text-3xl">
              {name}
            </h3>
            <p className="flex items-center gap-1 text-base text-(--neutral-500) @md:text-xl">
              <GithubIcon className="size-5 @md:size-6" />
              <a
                href={`https://github.com/${social}`}
                referrerPolicy="no-referrer"
                target="_blank"
              >
                @{social}
              </a>
            </p>
          </span>
        </div>

        <span className="absolute top-1/2 -right-0 -translate-y-1/2 rotate-90 text-2xl font-semibold text-(--neutral-500) opacity-50 @md:text-3xl">
          #01609
        </span>
      </div>
    </section>
  );
}
