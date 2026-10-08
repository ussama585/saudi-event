import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import Hero from './components/home-page/Hero'
import StatsBand from './components/home-page/StatsBand'
import AboutSection from './components/home-page/AboutSection'
import AgendaSection from './components/home-page/AgendaSection'
import SpeakersSection from './components/home-page/SpeakersSection'
import PassesSection from './components/home-page/PassesSection'
import VenueSection from './components/home-page/VenueSection'
import FAQSection from './components/home-page/FAQSection'
import ClosingBand from './components/home-page/ClosingBand'
import Footer from './components/home-page/Footer'
import SpeakerModal from './components/home-page/SpeakerModal'

function App() {
  const [day, setDay] = useState(0);
  const [faq, setFaq] = useState(0);
  const { openRegister } = useOutletContext();
  const [speaker, setSpeaker] = useState(null);

  return (
    <div>
      <Hero openRegister={openRegister} />
      <StatsBand />
      <AboutSection />
      <AgendaSection day={day} setDay={setDay} />
      <SpeakersSection setSpeaker={setSpeaker} />
      <PassesSection openRegister={openRegister} />
      <VenueSection />
      <FAQSection faq={faq} setFaq={setFaq} />
      <ClosingBand openRegister={openRegister} />

      <Footer />

      <SpeakerModal
        speaker={speaker}
        setSpeaker={setSpeaker}
      />
    </div>
  )
}

export default App
