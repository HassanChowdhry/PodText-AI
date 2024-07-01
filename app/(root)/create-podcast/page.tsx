"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import GeneratePodcast, { VoiceType } from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
})

export default function CreatePodcast() {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter();

  const voices = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"]
  const [voiceType, setVoiceType] = useState<VoiceType | null>(null);
  const [voicePrompt, setVoicePrompt] = useState('');
  
  const [imagePrompt, setImagePrompt] = useState('')
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(null)
  const [audioUrl, setAudioUrl] = useState('')
  const [audioDuration, setAudioDuration] = useState(0)
  
  const createPodcast = useMutation(api.podcasts.createPodcast)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      if (!audioUrl || !imageUrl || !voiceType) {
        toast({ title: "Please generate podcast and thumbnail", variant: "destructive" })
        setLoading(false)
        throw new Error("Please generate podcast and thumbnail")
      }
      const podcastData = {
        podcastTitle: values.podcastTitle,
        podcastDescription: values.podcastDescription,
        audioUrl,
        audioStorageId: audioStorageId!,
        imageUrl,
        imageStorageId: imageStorageId!,
        voiceType,
        audioDuration,
        voicePrompt,
        imagePrompt,
        views: 0,        
      }

      const podcast = await createPodcast(podcastData)
      toast({ title: "Podcast created" })
      router.push('/')
    } catch (error) {
      console.error(error)
      toast({ title: "Error submitting form", variant: "destructive" })  
    }
    setLoading(false)
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
                    <Input className="input-class" placeholder="Podcast Title" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-[16px] font-bold text-white-1">
                Select Voice
              </Label>

              <Select onValueChange={(value) => setVoiceType(value as VoiceType)}>
                <SelectTrigger className="text-[16px] w-full border-none focus-visible:ring-offset-sakura-1 bg-black-1 text-white-1">
                  <SelectValue placeholder="Select Voice" className="placeholder:text-gray-1" />
                </SelectTrigger>
                <SelectContent className="text-[16px] border-none
                   bg-black-1 font-bold text-white-1 focus:ring-sakura-1">
                    {voices.map((voice) => (
                      <SelectItem className="capitalize focus:bg-sakura-1" key={voice} value={voice}>
                        {voice}
                      </SelectItem>
                    ))}
                </SelectContent>
                {voiceType && 
                  <audio 
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                }
              </Select>
            </div>

            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-[16px] font-bold text-white-1">Podcast Description</FormLabel>
                  <FormControl>
                    <Textarea className="input-class" placeholder="Write a short podcast description" {...field} />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">
            <GeneratePodcast 
              setAudioStorageId={setAudioStorageId}
              setAudio={setAudioUrl}
              voiceType={voiceType}
              setAudioDuration={setAudioDuration}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
            />
            
            <GenerateThumbnail 
              setImage={setImageUrl}
              setImageStorageId={setImageStorageId}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />
            
            <Button className="w-full mt-10 text-white-1 transition-all hover:bg-black-1 duration-500
              text-[16px] bg-sakura-1 py-4 font-extrabold" type="submit">
                {loading ? (
                <>
                  Submitting...
                  <Loader size={20} className="animate-spin mr-2" />
                </>
                ) 
                  : "Create Podcast"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}

