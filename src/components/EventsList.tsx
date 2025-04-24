
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { LegalEvent } from "@/types/event";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { edit, trash } from "lucide-react";

interface EventsListProps {
  events: LegalEvent[];
  onDelete: (id: string) => void;
  onEdit: (event: LegalEvent) => void;
}

export function EventsList({ events, onDelete, onEdit }: EventsListProps) {
  const getStatusColor = (status: string) => {
    return status === "Aguardando" ? "bg-yellow-500" : "bg-green-500";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Canal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>
                {format(new Date(event.date), "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>{event.category}</TableCell>
              <TableCell>{event.channel}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(event.status)} text-white`}
                >
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(event)}
                  >
                    <edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(event.id)}
                  >
                    <trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
