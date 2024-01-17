"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TTaskFormSchema,
  TaskFormSchema,
} from "@/lib/types/schemas/taskform.schema.type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { MultiSelect } from "../_components/multiselect";
import { TOptionItem, TPostUpdateReturn } from "@/lib/types/types";
import { CreateTask } from "@/app/actions/action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TTaskFormSchema>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      status: "todo",
      label: ["bug"],
    },
  });

  const onSubmit = async (data: TTaskFormSchema) => {
    const response: TPostUpdateReturn = await CreateTask(data);
    console.log(response);
    toast({
      variant: response.status ? "default" : "destructive",
      title: "Creating new task!",
      description: response.message,
    });
    form.reset();
    router.refresh();
  };
  return (
    <section className="container">
      <h3 className="pb-[32px]">Create new task</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[600px] grid grid-cols-1 sm:grid-cols-2 gap-[40px]"
        >
          <fieldset>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell a little bit about this task"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can put important links.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start</FormLabel>
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
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
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
                          date <
                          new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End</FormLabel>
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
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
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
                        disabled={(date) => date < form.getValues().start}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-[12px]">
              <Button
                type="submit"
                variant={form.formState.isSubmitting ? "outline" : "secondary"}
                disabled={form.formState.isSubmitting}
                style={{ minWidth: "80px" }}
              >
                {form.formState.isSubmitting ? "Adding..." : "Add"}
              </Button>
            </div>
          </fieldset>
          <fieldset>
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for your task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="done">done</SelectItem>
                      <SelectItem value="enhancement">Enhancement</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={() => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <MultiSelect
                    OPTIONITEMS={multiOptions}
                    form={form}
                    name="label"
                    defaultSelection={["good_first"]}
                  />
                  <FormDescription>Add labels</FormDescription>
                </FormItem>
              )}
            />
          </fieldset>
        </form>
      </Form>
    </section>
  );
};

export default Page;

const multiOptions: TOptionItem[] = [
  {
    value: "documentation",
    label: "documentation",
  },
  {
    value: "enhancement",
    label: "Enhancement",
  },
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "fixing",
    label: "Fixing",
  },
  {
    value: "good_first",
    label: "Good first",
  },
];
