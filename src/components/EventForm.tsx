
import { useState } from 'react';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { EventCategory, ReminderChannel, LegalEvent } from "@/types/event";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Nome do evento é obrigatório"),
  category: z.enum(["Contrato", "Fiscal", "Licença", "Outros"]),
  date: z.date({
    required_error: "Data do evento é obrigatória",
  }),
  channel: z.enum(["E-mail", "WhatsApp"]),
  contact: z.string()
    .min(1, "Contato é obrigatório")
    .refine((value) => {
      if (value.includes("@")) {
        return z.string().email().safeParse(value).success;
      } else {
        return /^\d{10,11}$/.test(value.replace(/\D/g, ""));
      }
    }, "E-mail ou telefone inválido"),
});

interface EventFormProps {
  onSubmit: (data: LegalEvent) => void;
}

export function EventForm({ onSubmit }: EventFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Outros",
      channel: "E-mail",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newEvent: LegalEvent = {
      id: crypto.randomUUID(),
      ...values,
      status: "Aguardando",
    };
    
    onSubmit(newEvent);
    form.reset();
    
    toast({
      title: "Evento cadastrado com sucesso!",
      description: "Você receberá um lembrete 3 dias antes da data.",
    });
  };

  return (
    <Card className="w-full max-w-md p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Evento</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Renovação de Contrato" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                    <SelectItem value="Fiscal">Fiscal</SelectItem>
                    <SelectItem value="Licença">Licença</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data do Evento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                      locale={ptBR}
                      className={cn("pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canal de Lembrete</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um canal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="E-mail">E-mail</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato para Lembrete</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      form.watch("channel") === "E-mail"
                        ? "seu@email.com"
                        : "(11) 99999-9999"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <Check className="mr-2 h-4 w-4" /> Cadastrar Evento
          </Button>
        </form>
      </Form>
    </Card>
  );
}
