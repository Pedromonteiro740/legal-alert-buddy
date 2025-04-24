
import { useState } from "react";
import { EventForm } from "@/components/EventForm";
import { EventsList } from "@/components/EventsList";
import { LegalEvent } from "@/types/event";

const Index = () => {
  const [events, setEvents] = useState<LegalEvent[]>([]);

  const handleAddEvent = (event: LegalEvent) => {
    setEvents([...events, event]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEditEvent = (event: LegalEvent) => {
    // To be implemented in the next iteration
    console.log("Editing event:", event);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LegalAlert – Lembrete Jurídico Inteligente
          </h1>
          <p className="text-gray-600">
            Cadastre seus eventos jurídicos e receba lembretes automáticos
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Novo Evento</h2>
            <EventForm onSubmit={handleAddEvent} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Eventos Cadastrados</h2>
            <EventsList
              events={events}
              onDelete={handleDeleteEvent}
              onEdit={handleEditEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
