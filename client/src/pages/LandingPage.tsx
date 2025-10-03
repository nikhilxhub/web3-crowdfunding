import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react'
import React from 'react'


const LandingPage = () => {


  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/background1.jpg")' }}
        >
          {/* Optional dark overlay for readability */}
          {/* <div className="absolute inset-0 bg-black/40" /> */}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span>#1 CrowdFunding Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Revolutionize
              <br />
              Crowdfunding
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Empower innovation through transparent, secure, and decentralized crowdfunding.
              Connect directly with creators using Web3 technology.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Button size="lg"
                onClick={() => {
    window.location.href = "/main"
  }}
              >
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" 
              onClick={() => {
    window.location.href = "/main"
  }}>
                Create Campaign
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <Feature icon={<Shield className="w-6 h-6" />} title="Secure & Transparent" description="Smart contracts ensure complete transparency and security" />
              <Feature icon={<Globe className="w-6 h-6" />} title="Global Access" description="Connect with supporters worldwide without borders" />
              <Feature icon={<Zap className="w-6 h-6" />} title="Instant Transfers" description="Direct blockchain transactions with minimal fees" />
            </div>
          </div>
        </div>

        {/* Optional gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
      </section>
    </div>
  )
}

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
)

export default LandingPage
