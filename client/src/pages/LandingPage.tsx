import { Button } from '@/components/ui/button'
import { CrowdCanvas, Skiper39 } from '@/components/ui/skiper-ui/skiper39'
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react'
import React from 'react'

const LandingPage = () => {
  return (
    
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        // style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 " />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>Powered by Blockchain Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold  mb-6 leading-tight">
            Revolutionize
            <br />
            Crowdfunding
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Empower innovation through transparent, secure, and decentralized crowdfunding. 
            Connect directly with creators using Web3 technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button 
              size="lg" 
             
            >
              Start Exploring
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              
            >
              Create Campaign
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Transparent</h3>
              <p className="text-muted-foreground text-sm">Smart contracts ensure complete transparency and security</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Access</h3>
              <p className=" text-sm">Connect with supporters worldwide without borders</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 " />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Transfers</h3>
              <p className=" text-sm">Direct blockchain transactions with minimal fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 " />
    </section>
    </div>
  )
}

export default LandingPage

// import { CrowdCanvas, Skiper39 } from "@/components/v1/skiper39";

// Using the complete component
// const DemoSkiper39 = () => {
//   return <Skiper39 />;
// };

// // Using just the crowd canvas
// const CustomCrowd = () => {
//   return (
//     <div className="relative h-screen w-full">
//       <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
//     </div>
//   );
// };
