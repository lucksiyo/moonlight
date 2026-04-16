import './App.css'
import { useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { easeInOut, motion, MotionConfig, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
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

  // detect scroll direction
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    if (current > previous && current > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

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
  const heroTextMove = useTransform(heroParallaxProgress, [0.5, 1], [0, -300])

  // gallery scroll
  const galleryRef = useRef(null)
  const { scrollYProgress: galleryProgress } = useScroll({
      target: galleryRef,
  })
  const galleryMove = useTransform(galleryProgress, [0, 1], [1800, -8200])
  const galleryTextOpacity = useTransform(galleryProgress, [0.1, 0.25, 0.8, 0.95], [0, 1, 1, 0])
  const galleryTopTextMove = useTransform(galleryProgress, [0.1, 0.2, 0.85, 0.95], [0, -100, -100, 0])
  const galleryBottomTextMove = useTransform(galleryProgress, [0.1, 0.2, 0.85, 0.95], [0, 100, 100, 0])
  
  // cast & crew scroll
  const castCrewRef = useRef(null)
  const { scrollYProgress: castCrewProgress } = useScroll({
    target: castCrewRef,
    offset: ['start 80%', 'end 20%'],
  })
  const castCrewOpacity = useTransform(castCrewProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const castTextMove = useTransform(castCrewProgress, [0, 0.2, 0.8, 1], [-100, 0, 0, -100])
  const crewTextMove = useTransform(castCrewProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  // awards scroll
  const awardsRef = useRef(null)
  const { scrollYProgress: awardsProgress } = useScroll({
    target: awardsRef,
    offset: ['start 80%', 'end 20%'],
  })
  const awardsOpacity = useTransform(awardsProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const awardsTextMove = useTransform(awardsProgress, [0, 0.2, 0.8, 1], [-100, 0, 0, -100])

  return (
    <>
      <UseSmoothScroll speed={2}/>

      {/* NAV */}
      {
        isDesktop && 
          <motion.nav
            className='fixed top-0 left-0 right-0 z-100 p-8 backdrop-blur-xs'
            animate={{
              y: hidden ? -150 : 0,
              opacity: hidden ? 0 : 1
            }}
            transition={{ ease: easeInOut, duration: 0.3}}
          >
            <ol className='flex justify-center gap-8 uppercase'>
              <li><a href='#about'>About</a></li>
              <li><a href='#gallery'>Gallery</a></li>
              <li><a href='#cast-crew'>Cast & Crew</a></li>
              <li><a href='#awards'>Awards</a></li>
            </ol>
          </motion.nav>
      }

      {/* HERO */}
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
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: easeInOut, duration: 0.5 }}
          style={{ 
            y: heroTextMove, 
            opacity: heroTextOpacity, 
            transition: 'opacity 0.3s linear'
          }} 
          className='site-title uppercase absolute inset-0 flex justify-center items-center'
        >
          Moonlight
        </motion.h1>
      </div>

      {/* ABOUT */}
      <div id='about' className='relative p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48'>
        <div className='flex flex-col md:grid grid-cols-2 gap-8 md:gap-12 xl:gap-24'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-8'>
            <motion.div className='flex flex-col'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ease: easeInOut, delay: 0.6, duration: 0.5 }}
            >
              <h6 className='section-title uppercase'>Director</h6>
              <p>Barry Jenkins</p>
            </motion.div>
            <motion.div className='flex flex-col'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ease: easeInOut, delay: 0.3, duration: 0.5 }}
            >
              <h6 className='section-title uppercase'>Release</h6>
              <p>2016</p>
            </motion.div>
            <motion.div className='flex flex-col'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ ease: easeInOut, duration: 0.5 }}
            >
              <h6 className='section-title uppercase'>Runtime</h6>
              <p>111 minutes</p>
            </motion.div>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: easeInOut, duration: 0.5 }}
            >
              A young African-American man grapples with his identity and sexuality  while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.
            </motion.p>
          </div>
        </div>
        <motion.h6 className='absolute bottom-0 translate-y-1/2 right-[2rem] z-10 uppercase tinted-large-text'
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ease: easeInOut, duration: 0.5 }}
        >
          About
        </motion.h6>
      </div>
      
      {/* POSTER */}
      <div className='tinted-section flex flex-col md:grid md:grid-cols-2'>
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: easeInOut, duration: 1 }}
        >
          <img className='p-6 pb-0 md:p-0' src={moviePoster} alt='Poster for Moonlight (2016).'/>
        </motion.div>
        <div className='p-8 xl:p-12 flex flex-col lg:grid lg:grid-cols-2 gap-8 md:justify-center lg:items-center'>
          <motion.div className='flex flex-col'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ease: easeInOut, duration: 0.5 }}          
          >
            <h6 className='tinted-section-title uppercase'>Distributed by</h6>
            <p>A24</p>            
          </motion.div>
          <motion.div className='flex flex-col'
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ease: easeInOut, delay: 0.3, duration: 0.5 }}          
          >
            <h6 className='tinted-section-title uppercase'>Production Companies</h6>
            <p>A24</p>
            <p>Plan B Entertainment</p>
            <p>Pastel Productions</p>
          </motion.div>
        </div>
      </div>

      {/* GALLERY */}
      <div id='gallery' ref={galleryRef} className='lg:h-[850vh] p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48'>
        <div className='lg:sticky lg:top-0 lg:h-screen lg:flex lg:justify-start lg:items-center lg:overflow-visible'>
          
          {/* DESKTOP GALLERY */}
          {isDesktop ? ( 
            <div className='relative uppercase'>
              <motion.h6 
                style={{ x: galleryTopTextMove, opacity: galleryTextOpacity }} 
                className='sticky top-0 flex justify-start large-text'
              >
                Gallery
              </motion.h6>
              <motion.div style={{ x: galleryMove }} className='flex gap-8'>
                <MotionConfig transition={{ ease: easeInOut, duration: 0.5 }}>
                  <motion.img className='w-[48rem]' src={still1} alt='Boy sticks his arm out of the passenger seat of a blue car. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still2} alt='Group of young boys playing on a grass field. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still3} alt='Man teaching a boy how to float in the ocean. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still4} alt='Woman stares directly at the camera. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still5} alt='Teen boy sits at train station at night. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still6} alt='Two teen boys looking at each other while sitting on the beach at night. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still7} alt='Fist clenching a handful of sand. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still8} alt='A man and his mother have a conversation at a table outside. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still9} alt='Two men sitting in a car. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still10} alt="A man leaning his head on another man's shoulder. Screencap from Moonlight (2016)."
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                </MotionConfig>
              </motion.div>
              <motion.h6 
                style={{ x: galleryBottomTextMove, opacity: galleryTextOpacity }} 
                className='sticky bottom-0 pt-2 flex justify-end large-text'
              >
                Gallery
              </motion.h6>
            </div>
          ) : (     
            <>
            {/* MOBILE GALLERY */}
              <motion.h6 className='mb-4 section-title uppercase text-center'
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: easeInOut, duration: 0.5 }} 
              >
                Gallery
              </motion.h6>
              <div className='flex flex-col items-center gap-8'>
                <MotionConfig transition={{ ease: easeInOut, duration: 0.5 }}>
                  <motion.img className='w-[48rem]' src={still1} alt='Boy sticks his arm out of the passenger seat of a blue car. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still2} alt='Group of young boys playing on a grass field. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still3} alt='Man teaching a boy how to float in the ocean. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still4} alt='Woman stares directly at the camera. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still5} alt='Teen boy sits at train station at night. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still6} alt='Two teen boys looking at each other while sitting on the beach at night. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still7} alt='Fist clenching a handful of sand. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still8} alt='A man and his mother have a conversation at a table outside. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still9} alt='Two men sitting in a car. Screencap from Moonlight (2016).'
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                  <motion.img className='w-[48rem]' src={still10} alt="A man leaning his head on another man's shoulder. Screencap from Moonlight (2016)."
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                  ></motion.img>
                </MotionConfig>
              </div>
            </>
          )
        }
        </div>
      </div>

      {/* CAST & CREW */}
      <div ref={castCrewRef} id='cast-crew' className='relative tinted-section p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48'>
        <motion.h6 
          className='absolute top-0 right-[2rem] z-10 uppercase tinted-large-text'
          style={{ x: castTextMove, opacity: castCrewOpacity }}
        >
          Cast
        </motion.h6>
        <div className='flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 xl:gap-24'>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: easeInOut, duration: 0.5 }}        
          >
            <h6 className='tinted-section-title uppercase'>Crew</h6>
            <div className='flex flex-col gap-2'>
              <p><span className='uppercase'>Screenplay</span>: Barry Jenkins</p>
              <p><span className='uppercase'>Story</span>: Tarell Alvin McCraney</p>
              <p><span className='uppercase'>Producers</span>: Adele Romanski, Dede Gardner, Jeremy Kleiner</p>
              <p><span className='uppercase'>Music</span>: Nicholas Britell</p>
              <p><span className='uppercase'>Cinematographer</span>: James Laxton</p>
              <p><span className='uppercase'>Editors</span>: Joi McMillon, Nat Sanders</p>
            </div>          
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: easeInOut, duration: 0.5 }}        
          >
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
          </motion.div>
        </div>
        <motion.h6 
          className='absolute bottom-0 left-[2rem] z-10 uppercase tinted-large-text'
          style={{ x: crewTextMove, opacity: castCrewOpacity }}
        >
          Crew
        </motion.h6>
      </div>

      {/* AWARDS */}
      <div ref={awardsRef} id='awards' className='relative p-8 md:py-32 lg:px-16 xl:px-32 xl:py-48'>
        <motion.h6 
          className='absolute top-0 right-[2rem] z-10 uppercase large-text'
          style={{ x: awardsTextMove, opacity: awardsOpacity }}
        >
          Awards
        </motion.h6>        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: easeInOut, duration: 0.5 }}         
        >
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
        </motion.div>        
      </div>

      {/* FOOTER */}
      <footer className='px-8 pb-8 lg:px-16 lg:pb-16 xl:px-32 flex flex-col gap-8 lg:gap-12 justify-center items-center'>
        <div>
          <motion.hr className='w-[90vw] border-t-[#CC83CB]'
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ ease: easeInOut, duration: 0.5 }}           
          ></motion.hr>

        </div>
        <motion.div className='text-center flex flex-col gap-2'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: easeInOut, delay: 0.3, duration: 0.5 }}     
        >
          <p>Prod. 2026 by <a href='https://lucksiyo.nekoweb.org/' target='_blank' rel='noopener noreferrer'><span className='signature'>lucksiyo!</span></a></p>
          <p>All media property of <a href='https://a24films.com/films/moonlight' target='_blank' rel='noopener noreferrer'>A24</a>. Used for portfolio purposes only.</p>
        </motion.div>        
      </footer>
    </>
  )
}

export default App
