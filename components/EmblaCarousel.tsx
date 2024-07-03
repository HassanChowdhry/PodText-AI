import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoaderSpinner from './LoaderSpinner'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { Id } from '@/convex/_generated/dataModel'

type PropType = {
  podcasts?: any
}

const EmblaCarousel: React.FC<PropType> = ({ podcasts }) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop:true }, [Autoplay()])
  const updateListens = useMutation(api.podcasts.updatePodcastViews);

  const onPodcastClick = (podcastId: Id<"podcasts">) => {
    updateListens({
      podcastId: podcastId,
    });
    router.push(`/podcast/${podcastId}`)
  }
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )
  if (!podcasts) return (<LoaderSpinner /> )

  return (
    <section ref={emblaRef} className="flex flex-col w-full gap-4 overflow-hidden mt-4">
      <div className='flex'>
        {podcasts && podcasts.map((podcast: any, index: number) => (
          <figure 
            key={index}
            className='carousel_box'
            onClick={() => onPodcastClick(podcast._id)}
            >
            <Image
              fill
              className='absolute size-full rounded-xl border-none'
              src={podcast.imageUrl} 
              alt={podcast.podcastTitle} 
            />
            <figcaption className='glassmorphism-black relative flex flex-col p-2 rounded-b-xl z-10'>
              <h2 className='font-bold text-white-1 text-[14px]'>
                {podcast.podcastTitle}
              </h2>
              <p className='text-[12px] font-semibold text-white-2'>
                {podcast.author}
              </p>
              <div className='flex gap-2'>
                <Image 
                  src="/icons/headphone.svg"
                  width={20}
                  height={20}
                  alt='headphones icon'
                />
                <h2 className='text-[14px] font-bold text-white-1'>
                  {podcast?.views}
                </h2>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              selected={selectedIndex === index}
            />
          ))}
        </div>
    </section>
  )
}

export default EmblaCarousel
