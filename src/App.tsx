import logo from "./assets/images/logo-full.svg";
import FixedBackgrounds from "./components/fixed-bg";
import TicketForm from "./components/ticket_form";

function App() {
  return (
    <main className="relative mx-auto flex h-[inherit] max-w-[1440px] flex-col py-8 text-center">
      <h1 className="sr-only">Coding Conference Generator</h1>
      <img
        src={logo}
        alt="logo"
        width={160}
        height={160}
        className="mx-auto w-40 pb-8"
      />
      <TicketForm />
      <FixedBackgrounds />
    </main>
  );
}

export default App;
