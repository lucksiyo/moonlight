import './App.css'
import { useRef } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { easeInOut, motion, useScroll, useTransform } from 'motion/react'
import { UseSmoothScroll } from 'smooth-motion'
import heroImg from './assets/images/hero.webp'
import moviePoster from './assets/images/poster.webp'
import still1 from './assets/images/still-1.webp'
import still2 from './assets/images/still-2.webp'
import still3 from './assets/images/still-3.webp'
import still4 from './assets/images/still-4.webp'
import still5 from './assets/images/still-5.webp'
import still6 from './assets/images/still-6.webp'
import still7 from './assets/images/still-7.webp'
import still8 from './assets/images/still-8.webp'
import still9 from './assets/images/still-9.webp'
import still10 from './assets/images/still-10.webp'

function App() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // hero blur scroll
  const heroRef = useRef(null)
  const { scrollYProgress: heroBlurProgress } = useScroll({
    target: heroRef,
    offset: ['end start', 'end end'],
  })
  const heroOpacity = useTransform(heroBlurProgress, [1, 0], [1, 0])
  const heroScale = useTransform(heroBlurProgress, [1, 0], [1, 1.25])
  const heroTextOpacity = useTransform(heroBlurProgress, [1, 0], [1, 0])
  
  // hero parallax scroll
  const { scrollYProgress: heroParallaxProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroMove = useTransform(heroParallaxProgress, [1, 0], ['-15%', '15%'])
  const heroTextMove = useTransform(heroParallaxProgress, [0, 1], [300, -300])

  // gallery horizontal scroll
  const galleryRef = useRef(null)
  const { scrollYProgress: galleryProgress } = useScroll({
      target: galleryRef,
      offset: ['start 50%', 'end 75%'],
  })
  
  const x = useTransform(galleryProgress, [0, 1], [1800, -8100])

  return (
    <>
      <UseSmoothScroll speed={1.5}/>
      <div ref={heroRef} id='hero' className='h-screen'>
        <motion.img 
          style={{
            opacity: heroOpacity, 
            translateY: heroMove,
            scale: heroScale,
            transition: 'opacity 0.3s linear' 
          }}
          className='object-cover h-full absolute inset-0'
          src={heroImg}
          alt='Boy looks out towards the ocean. Screencap from Moonlight (2016).'
        />
        <motion.h1
          initial={{
            opacity: 0,
            y: 100
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          transition={{ ease: easeInOut, duration: 0.5 }}
          style={{ 
            y: heroTextMove, 
            opacity: heroTextOpacity, 
            transition: 'opacity 0.3s ease'
          }} 
          className='site-title uppercase absolute inset-0 flex justify-center items-center'
        >
          Moonlight
        </motion.h1>
      </div>

      <div id='summary' className='p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48 flex flex-col md:grid grid-cols-2 gap-8 md:gap-12 xl:gap-24'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
          <div className='flex flex-col'>
            <h6 className='section-title uppercase'>Director</h6>
            <p>Barry Jenkins</p>
          </div>
          <div className='flex flex-col'>
            <h6 className='section-title uppercase'>Release</h6>
            <p>2016</p>
          </div>
          <div className='flex flex-col'>
            <h6 className='section-title uppercase'>Runtime</h6>
            <p>111 minutes</p>
          </div>
        </div>
        <div>
          <p>
            A young African-American man grapples with his identity and sexuality  while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.
          </p>
        </div>
      </div>

      <div className='tinted-section flex flex-col md:grid md:grid-cols-2'>
        <div>
          <img className='p-6 md:p-0' src={moviePoster} alt='Poster for Moonlight (2016).'/>
        </div>
        <div className='p-8 xl:p-12 flex flex-col lg:grid lg:grid-cols-2 gap-8 md:justify-center lg:items-center'>
          <div className='flex flex-col '>
            <h6 className='tinted-section-title uppercase'>Distributed by</h6>
            <p>A24</p>            
          </div>
          <div className='flex flex-col'>
            <h6 className='tinted-section-title uppercase'>Production Companies</h6>
            <p>A24</p>
            <p>Plan B Entertainment</p>
            <p>Pastel Productions</p>
          </div>
        </div>
      </div>

      <div id='gallery' ref={galleryRef} className='lg:h-[850vh] p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48'>
        <div className='lg:sticky lg:top-0 lg:h-screen lg:flex lg:justify-start lg:items-center lg:overflow-visible'>
          {isDesktop && 
            <motion.div style={{ x }} className='flex gap-8'>
              <img className='w-[48rem]' src={still1} alt=''></img>
              <img className='w-[48rem]' src={still2} alt=''></img>
              <img className='w-[48rem]' src={still3} alt=''></img>
              <img className='w-[48rem]' src={still4} alt=''></img>
              <img className='w-[48rem]' src={still5} alt=''></img>
              <img className='w-[48rem]' src={still6} alt=''></img>
              <img className='w-[48rem]' src={still7} alt=''></img>
              <img className='w-[48rem]' src={still8} alt=''></img>
              <img className='w-[48rem]' src={still9} alt=''></img>
              <img className='w-[48rem]' src={still10} alt=''></img>
            </motion.div>
          }
          {!isDesktop && 
            <motion.div className='flex flex-col gap-8'>
              <img className='w-[48rem]' src={still1} alt=''></img>
              <img className='w-[48rem]' src={still2} alt=''></img>
              <img className='w-[48rem]' src={still3} alt=''></img>
              <img className='w-[48rem]' src={still4} alt=''></img>
              <img className='w-[48rem]' src={still5} alt=''></img>
              <img className='w-[48rem]' src={still6} alt=''></img>
              <img className='w-[48rem]' src={still7} alt=''></img>
              <img className='w-[48rem]' src={still8} alt=''></img>
              <img className='w-[48rem]' src={still9} alt=''></img>
              <img className='w-[48rem]' src={still10} alt=''></img>
            </motion.div>
          }
          
        </div>
      </div>

      <div id='cast-crew' className='tinted-section p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 xl:gap-24'>
        <div>
          <h6 className='tinted-section-title uppercase'>Crew</h6>
          <div className='flex flex-col gap-2'>
            <p><span className='uppercase'>Screenplay</span>: Barry Jenkins</p>
            <p><span className='uppercase'>Story</span>: Tarell Alvin McCraney</p>
            <p><span className='uppercase'>Producers</span>: Adele Romanski, Dede Gardner, Jeremy Kleiner</p>
            <p><span className='uppercase'>Music</span>: Nicholas Britell</p>
            <p><span className='uppercase'>Cinematographer</span>: James Laxton</p>
            <p><span className='uppercase'>Editors</span>: Joi McMillon, Nat Sanders</p>
          </div>
          
        </div>
        <div>
          <h6 className='tinted-section-title uppercase'>Cast</h6>
          <div className='flex flex-col gap-2'>
            <p>Trevante Rhodes as Adult Chiron</p>
            <p>Ashton Sanders as Teen Chiron</p>
            <p>Alex Hibbert as Child Chiron</p>
            <p>André Holland as Adult Kevin</p>
            <p>Jharrel Jerome as Teen Kevin</p>
            <p>Jaden Piner as Child Kevin</p>
            <p>Janelle Monáe as Teresa</p>
            <p>Naomie Harris as Paula</p>
            <p>Mahershala Ali as Juan</p>
          </div>
        </div>
      </div>

      <div id='awards' className='p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48'>
        <h6 className='section-title uppercase'>Awards</h6>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <p>2017 Academy Award Winner</p>
            <p>Best Picture</p>
          </div>
          <div className='flex flex-col'>
            <p>2017 Academy Award Winner</p>
            <p>Best Adapted Screenplay</p>
          </div>
          <div className='flex flex-col'>
            <p>2017 Academy Award Winner</p>
            <p>Best Supporting Actor, Mahershala Ali</p>
          </div>
          <div className='flex flex-col'>
            <p>2017 Golden Globe Award Winner</p>
            <p>Best Picture (Drama)</p>
          </div>
        </div>
        
      </div>

      <footer className='p-16 md:pt-32 flex flex-col gap-2 justify-center items-center'>
        <p>Prod. 2026 by <a href='https://fjtria.github.io/' target='_blank' rel='noopener noreferrer'>FJTRIA</a></p>
        <p>All media property of <a href='https://a24films.com/films/moonlight' target='_blank' rel='noopener noreferrer'>A24</a>. Used for portfolio purposes only.</p>
      </footer>
    </>
  )
}

export default App
