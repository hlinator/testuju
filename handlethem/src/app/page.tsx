import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PartnerBar from '@/components/PartnerBar'
import HowItWorks from '@/components/HowItWorks'
import FeaturesSection from '@/components/FeaturesSection'
import ScienceSection from '@/components/ScienceSection'
import RankingSection from '@/components/RankingSection'
import NeuroGameSection from '@/components/NeuroGameSection'
import ChallengeSection from '@/components/ChallengeSection'
import PricingSection from '@/components/PricingSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FaqSection from '@/components/FaqSection'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PartnerBar />
      <HowItWorks />
      <FeaturesSection />
      <ScienceSection />
      <RankingSection />
      <NeuroGameSection />
      <ChallengeSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
