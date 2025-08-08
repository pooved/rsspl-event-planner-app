import EventForm from "./EventForm";

export default function EventCreationPage() {
  return (
    <section class="justify-center items-center flex-col">
      <h2 className="text-2xl font-medium text-secondary my-4 ml-3">
        Create New Event
      </h2>
      <EventForm />
    </section>
  );
}
