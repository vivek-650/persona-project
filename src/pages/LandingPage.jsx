import React from "react";
import PersonaSelector from "../components/PersonaSelector";
import { Button } from "@/components/retroui/Button";
 
// export default function ButtonStyleDefault() {
//   return <Button>Click Me!</Button>;
// }

const LandingPage = ({ selectedPersonaId, onPersonaSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13171D] via-[#232329] to-gray-900 text-white/90">
      {/* Hero Section */}
      <section className="px-6 md:px-20 lg:px-32 py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Meet 8-BIT CREATIVES AI Personas.
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Experience a smarter way to interact with AI through tailored
          personas—designed to think, talk, and assist like real experts.
        </p>
      </section>
      <Button>Test Button</Button>
      {/* Persona Selector */}
      <div className="flex justify-center">
        <PersonaSelector
          selectedPersonaId={selectedPersonaId}
          onSelect={onPersonaSelect}
        />
      </div>
    </div>
  );
};

export default LandingPage;
