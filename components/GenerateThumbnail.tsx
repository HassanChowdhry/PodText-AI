import { useState, Dispatch, SetStateAction, useRef } from 'react'
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "./ui/label";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { Id } from '@/convex/_generated/dataModel';
import { Input } from './ui/input';
import Image from 'next/image';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuidv4 } from 'uuid';

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
  const pictureRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { startUpload }  = useUploadFiles(generateUploadUrl)
  const getImageUrl = useMutation(api.podcasts.getUrl)
  const generateThumbnail = useAction(api.openai.generateThumbnailAction)


  const sanitizeImage = async (blob: Blob, fileName: string) => {
    setIsGenerating(true);
    setImage("");

    try {
      const file = new File([blob], fileName, { type: 'image/png' })
      const uploaded = await startUpload([file])
      const storageId = (uploaded[0].response as any).storageId
      setImageStorageId(storageId)
      const imageUrl = await getImageUrl({ storageId })
      setImage(imageUrl!);
      toast({ title: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", variant: "destructive" });
    }
    setIsGenerating(false);
  }
  const uploadImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const blob = await file.arrayBuffer()
      .then((ab) => new Blob([ab]));
      sanitizeImage(blob, file.name);
    } catch (error) {
      console.error(error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  }

  const generatePicture = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await generateThumbnail({ input: imagePrompt });
      const blob = new Blob([res], { type: 'image/png' });
      sanitizeImage(blob, `thumbnail-${uuidv4()}.png`);
      toast({ title: "Image generated successfully" });
    } catch (error) {
      console.error(error);
      toast({ title: "Error generating image", variant: "destructive" });
    }
    setIsGenerating(false)
  }

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
              Prompt to generate thumbnail.
            </Label>
            <Textarea className="input-class font-light text-white-1"
              placeholder="Write a prompt to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>

          <div className="w-full max-w-[200px]">
            <Button className="w-full mt-10 text-white-1 transition-all hover:bg-sakura-2 duration-500
                text-[16px] bg-sakura-1 py-4 font-bold" onClick={generatePicture} type="submit">
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
        <div className='image_div' onClick={() => pictureRef?.current?.click()}>
          <Input 
            type="file" 
            className='hidden'
            ref={pictureRef}   
            onChange={(e) => uploadImage(e)}
          />       
          {!isGenerating ? (
            <Image src="/icons/upload-image.svg" alt="thumbnail" width={40} height={40} />
          ): (
            <div className='text-[16px] flex-center font-medium text-white-1'>
              Uploading...
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className='flex flex-col items-center gap-1s'>
            <h2 className='text-[14px] font-bold text-sakura-1'>
              Click to upload
            </h2>
            <p className='font-normal text-[14px] text-gray-1'>SVG, PNG, JPG, or GIF</p>
          </div>
        </div>
      )}
      {image && (
        <div className='flex-center w-full'>
          <Image src={image} alt="thumbnail" width={200} height={200} className='mt-5' />
        </div>
      )}
    </>
  )
}

export default GenerateThumbnail