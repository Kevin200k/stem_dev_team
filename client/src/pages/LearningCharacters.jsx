import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Astra from '../assets/avatars/learning_characters/astra_the_analyst.jpg'
import Lex from '../assets/avatars/learning_characters/lex_the_achiever.jpg'
import Mira from '../assets/avatars/learning_characters/mira_the_connector.jpg'
import Zeke from '../assets/avatars/learning_characters/zeke_the_explorer.jpg'
import Logo from '../assets/icon/image2.png'

const characters = [
  { 
    name: 'Astra the Analyst', 
    img: Astra,
    description: 'Astra loves solving problems and spotting smart solutions.',
    styles: { visual: 50, auditory: 10, reading: 30, kinesthetic: 10 }
  },
  { 
    name: 'Lex the Achiever', 
    img: Lex,
    description: 'Lex enjoys challenges and works hard to reach every goal.',
    styles: { visual: 30, auditory: 20, reading: 30, kinesthetic: 20 }
  },
  { 
    name: 'Mira the Connector', 
    img: Mira,
    description: 'Mira learns best by sharing ideas and talking with others.',
    styles: { visual: 20, auditory: 40, reading: 20, kinesthetic: 20 }
  },
  { 
    name: 'Zeke the Explorer', 
    img: Zeke,
    description: 'Zeke loves hands-on adventures and learning by trying things.',
    styles: { visual: 25, auditory: 15, reading: 20, kinesthetic: 40 }
  },
]

const LearningCharacters = () => {
  const navigate = useNavigate()
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const handleCharacterSelect = (charName) => {
    setSelectedCharacter(charName)
  }

  return (
    <section className="min-h-screen py-10 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      
      {/* Logo */}
      <div className="w-full flex justify-center md:justify-start">
        <img src={Logo} alt="LevelUp Logo" className="w-32 mb-6" />
      </div>

      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Choose Your Learning Character
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pick a character that matches your learning style. This will help us make your learning journey more fun.
        </p>
      </div>

      {/* Character Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {characters.map((char, index) => (
          <div
            key={index}
            onClick={() => handleCharacterSelect(char.name)}
            className={`relative group rounded-2xl overflow-hidden shadow-lg bg-white
                        transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                        hover:scale-105 cursor-pointer animate-fade-up
                        ${selectedCharacter === char.name ? 'ring-4 ring-purple-500 scale-105' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={char.img} alt={char.name} className="h-64 w-full object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{char.name}</h2>
            </div>

            {/* Hover Overlay with Glass Effect */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-lg text-gray-900 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                            flex flex-col justify-center items-center px-4 text-center rounded-2xl">
              <p className="mb-4 text-sm font-medium">{char.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm w-full max-w-xs">
                {Object.entries(char.styles).map(([style, value]) => (
                  <div key={style} className="flex justify-between bg-white/40 rounded-md px-2 py-1">
                    <span className="capitalize">{style}</span>
                    <span>{value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Check Icon Overlay */}
            {selectedCharacter === char.name && (
              <div className="absolute top-3 right-3 bg-purple-600 rounded-full p-1 shadow-lg animate-bounce">
                <CheckCircle2 className="text-white w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Customize Character (Coming Soon) */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative rounded-2xl border-2 border-dashed border-purple-300 
                        bg-white/70 backdrop-blur-md p-6 flex flex-col items-center justify-center
                        text-center shadow-inner transition hover:scale-105">
          <h3 className="text-2xl font-bold text-purple-700 mb-2">Customize Your Learning Style</h3>
          <p className="text-gray-600 mb-4">
            Want to create your own character? This feature is coming soon!
          </p>
          <span className="px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">
            Coming Soon
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          disabled={!selectedCharacter}
          className={`text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform 
                      ${selectedCharacter
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 hover:shadow-xl text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={() => navigate('/age-group')}
        >
          {selectedCharacter ? `Continue as ${selectedCharacter}` : 'Continue'}
        </button>
      </div>
    </section>
  )
}

export default LearningCharacters
