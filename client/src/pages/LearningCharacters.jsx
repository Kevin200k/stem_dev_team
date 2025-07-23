import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Astra from '../assets/avatars/learning_characters/astra_the_analyst.jpg'
import Lex from '../assets/avatars/learning_characters/lex_the_achiever.jpg'
import Mira from '../assets/avatars/learning_characters/mira_the_connector.jpg'
import Zeke from '../assets/avatars/learning_characters/zeke_the_explorer.jpg'

const characters = [
  { name: 'Astra the Analyst', img: Astra },
  { name: 'Lex the Achiever', img: Lex },
  { name: 'Mira the Connector', img: Mira },
  { name: 'Zeke the Explorer', img: Zeke },
]

const LearningCharacters = () => {
  const navigate = useNavigate()
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const handleCharacterSelect = (charName) => {
    setSelectedCharacter(charName)
  }

  return (
    <section className="min-h-screen pt-10 px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Choose Your Learning Character
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pick a character that matches your learning style. This will help personalize your experience.
        </p>
      </div>

      {/* Character Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {characters.map((char, index) => (
          <div
            key={index}
            onClick={() => handleCharacterSelect(char.name)}
            className={`relative rounded-2xl overflow-hidden shadow-lg bg-white
                        transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                        hover:scale-105 cursor-pointer animate-fade-up
                        ${selectedCharacter === char.name ? 'ring-4 ring-purple-500 scale-105' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={char.img} alt={char.name} className="h-64 w-full object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{char.name}</h2>
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

      {/* Continue Button */}
      <div className="mt-16 flex justify-center">
        <button
          disabled={!selectedCharacter}
          className={`text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform 
                      ${selectedCharacter
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 hover:shadow-xl text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={() => navigate('/dashboard')}
        >
          {selectedCharacter ? `Continue as ${selectedCharacter}` : 'Continue'}
        </button>
      </div>
    </section>
  )
}

export default LearningCharacters
