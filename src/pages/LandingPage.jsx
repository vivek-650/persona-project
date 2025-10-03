import React from "react";
import PersonaSelector from "../components/PersonaSelector";
import Footer from "../components/Footer";
// import { Button } from "@/components/retroui/Button";
 

const LandingPage = ({ selectedPersonaId, onPersonaSelect }) => {
  
  return (
    <div className="min-h-screen bg-gray-900 text-white/90">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 md:px-20 lg:px-32 py-12 sm:py-16 md:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
          Chat Known AI Personas.
        </h2>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
          Have fun with your fav persona and feel free to explore! Experience a smarter way to interact with AI through tailored
        </p>
      </section>
      {/* <div className="flex justify-center mb-8">
        <Button variant="secondary">try me</Button>
      </div> */}
      {/* Persona Selector */}
      <div className="flex justify-center pb-8">
        <PersonaSelector
          selectedPersonaId={selectedPersonaId}
          onSelect={onPersonaSelect}
        />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
