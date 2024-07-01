import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useToast } from "@/components/ui/use-toast"
import { set } from "zod";


const useGeneratePodcast = ({ voicePrompt, voiceType, setVoicePrompt, setAudio, setAudioStorageId }: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload }  = useUploadFiles(generateUploadUrl)
  
  const getPodcastAudio = useAction(api.openai.generateAudioAction)

  const getAudioUrl = useMutation(api.podcasts.getUrl)

  const { toast } = useToast()
  
  const generatePodcast = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsGenerating(true)
    setAudio('')

    if (!voicePrompt) {
      toast({
        title: "Please provide a voiceType to generate podcast",
        variant: "destructive",
      })
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({ voice: voiceType as string, input: voicePrompt })
      const blob = new Blob([response], { type: 'audio/mpeg' })
      const fileName = `podcast-${uuidv4()}.mp3`
      const file = new File([blob], fileName, { type: 'audio/mpeg' })
      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId
      setAudioStorageId(storageId)
      const audioUrl = await getAudioUrl({ storageId })
      setAudio(audioUrl!);
      setIsGenerating(false)
      toast({
        title: "Podcast generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error generating podcast",
        variant: "destructive",
      })
      setIsGenerating(false)
      console.error(error)
    }
  }
  
  return {
    isGenerating,
    generatePodcast,
  }
}

export type VoiceType = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer" | null
type GeneratePodcastProps = {
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  setAudio: Dispatch<SetStateAction<string>>;
  voiceType: VoiceType;
  setAudioDuration: Dispatch<SetStateAction<number>>;
  audio: string | null;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props)
  const [isCreating, setIsCreating] = useState(false)
  const [aiPrompt, setAIPrompt] = useState(false)
  const [podcastPrompt, setPodcastPrompt] = useState('');
  const { voicePrompt, setVoicePrompt, audio, setAudio, setAudioDuration } = props
  const generatePodcastPrompt = useAction(api.openai.generatePodcastPromptAction)
  const { toast } = useToast()

  const generatePodcastUsingPrompt = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsCreating(true)
    try {
      if (!podcastPrompt) {
        toast({
          title: "Please provide a prompt to generate podcast",
          variant: "destructive",
        })
        return setIsCreating(false)
      }
      const response = await generatePodcastPrompt({ input: podcastPrompt })
      if (!response) {
        toast({
          title: "No podcast generated using prompt",
          variant: "destructive",
        })
        return setIsCreating(false)
      }
      setVoicePrompt(response)
      toast({
        title: "Podcast generated using prompt successfully",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error generating podcast using prompt",
        variant: "destructive",
      })
    }
    setIsCreating(false)
  }
  
  return (
    <div>
      <div className='generate_thumbnail'>
        <Button 
          type='button'
          className={`${aiPrompt && "bg-black-6"}`}
          onClick={() => setAIPrompt(true)}
          variant="plain"
        >
          Generate Podcast using AI
        </Button>
        <Button 
          type='button'
          className={`${!aiPrompt && "bg-black-6"}`}
          onClick={() => setAIPrompt(false)}

          variant="plain"
        >
          Write your own Podcast
        </Button>
      </div>

      {aiPrompt ? (
        <>
          <div className="flex flex-col gap-2.5 mt-5">
            <Label className="text-[16px] font-bold text-white-1">
              Prompt to generate podcast using AI.
            </Label>
            <Textarea className="input-class font-light text-white-1"
              placeholder="Write a prompt to generate podcast"
              rows={5}
              value={podcastPrompt}
              onChange={(e) => setPodcastPrompt(e.target.value)}
            />
          </div>

          <div className="w-full max-w-[200px]">
            <Button className="w-full mt-10 text-white-1 transition-all hover:bg-sakura-2 duration-500
                text-[16px] bg-sakura-1 py-4 font-bold" onClick={generatePodcastUsingPrompt} type="submit">
                  {isCreating ? (
                  <>
                    Creating...
                    <Loader size={20} className="animate-spin mr-2" />
                  </>
                  ) 
                    : "Submit Prompt"}
              </Button>
          </div>

          <div className="flex flex-col gap-2.5 mt-5">
            <Label className="text-[16px] font-bold text-white-1">
              AI generated Podcast
            </Label>
            <Textarea className="input-class font-light text-white-1"
              placeholder="AI generated Podcast"
              rows={5}
              value={voicePrompt}
              onChange={(e) => setVoicePrompt(e.target.value)}
            />
          </div>
          
        </>
      ) : (
        <div className="flex flex-col gap-2.5 mt-5">
          <Label className="text-[16px] font-bold text-white-1">
            Write your own podcast.
          </Label>
          <Textarea className="input-class font-light text-white-1"
            placeholder="Write your own podcast"
            rows={5}
            value={voicePrompt}
            onChange={(e) => setVoicePrompt(e.target.value)}
          />
        </div>
      )}

      <div className="mt-5 w-full max-w-[200px]">
        <Button className="w-full mt-10 text-white-1 transition-all hover:bg-sakura-2 duration-500
            text-[16px] bg-sakura-1 py-4 font-bold" onClick={generatePodcast} type="submit">
              {isGenerating ? (
              <>
                Generating...
                <Loader size={20} className="animate-spin mr-2" />
              </>
              ) 
                : "Generate Podcast"}
          </Button>
      </div>
      {audio && (
      <audio 
        controls
        src={audio}
        autoPlay
        className="mt-5"
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
      />
      )}
    </div>
  )
}

export default GeneratePodcast