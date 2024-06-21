"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        podcastTitle: "",
      },
    })
   
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

  return (
    <section className="flex flex-col ">
      <h1 className="text-white-1 text-[20px] font-bold">Create Podcast</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 w-full flex-col">
          <div className="flex flex-col gap-[30px] border-black-5 pb-10 border-b">

            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-[16px] font-bold text-white-1">Podcast Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-orange-1" placeholder="Podcast Title" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-[16px] font-bold text-white-1">
                Select Voice
              </Label>

              <Select>
                <SelectTrigger className="text-[16px] w-full border-none bg-black-1 text-gray-1">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </section>
  )
}

