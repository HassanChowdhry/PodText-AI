import { useState, Dispatch, SetStateAction} from 'react'
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "./ui/label";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { Id } from '@/convex/_generated/dataModel';

interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
  const [aiThumbnail, setAiThumbnail] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const generatePicture = async () => {}
  return (
    <>
      <div className='generate_thumbnail'>
        <Button 
          type='button'
          className={`${aiThumbnail && "bg-black-6"}`}
          onClick={() => setAiThumbnail(true)}
          variant="plain"
        >
          Generate picture using AI
        </Button>
        <Button 
          type='button'
          className={`${!aiThumbnail && "bg-black-6"}`}
          onClick={() => setAiThumbnail(false)}

          variant="plain"
        >
          Upload Custom button
        </Button>
      </div>
      {aiThumbnail ? (
        <div className='flex flex-col gap-5 mt-5'>
          <div className="flex flex-col gap-2.5">
            <Label className="text-[16px] font-bold text-white-1">
              Prompt to generate podcast.
            </Label>
            <Textarea className="input-class font-light text-white-1"
              placeholder="Write a prompt to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>

          <div className="w-full max-w-[200px]">
            <Button className="w-full mt-10 text-white-1 transition-all hover:bg-orange-700 duration-500
                text-[16px] bg-orange-1 py-4 font-bold" onClick={generatePicture} type="submit">
                  {isGenerating ? (
                  <>
                    Generating...
                    <Loader size={20} className="animate-spin mr-2" />
                  </>
                  ) 
                    : "Generate Image"}
              </Button>
          </div>
        </div>
      ): (
        <div></div>
      )}
    </>
  )
}

export default GenerateThumbnail