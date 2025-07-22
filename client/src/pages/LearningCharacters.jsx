import React from 'react'
import TitleBar from '../components/TitleBar'
import Astra from '../assets/avatars/learning_characters/astra_the_analyst.jpg'
import Lex from '../assets/avatars/learning_characters/lex_the_achiever.jpg'
import Mira from '../assets/avatars/learning_characters/mira_the_connector.jpg'
import Zeke from '../assets/avatars/learning_characters/zeke_the_explorer.jpg'

const characters = [
  { name: 'Astra the Analyst', img: Astra, bg: 'from-yellow-300 to-yellow-500' },
  { name: 'Lex the Achiever', img: Lex, bg: 'from-red-300 to-red-500' },
  { name: 'Mira the Connector', img: Mira, bg: 'from-green-300 to-green-500' },
  { name: 'Zeke the Explorer', img: Zeke, bg: 'from-blue-300 to-blue-500' },
]

const LearningCharacters = () => {
  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-white to-gray-100 pt-10 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Choose Your Learning Character
          </h1>
          <p className="text-lg text-gray-600">
            Pick a character that matches your learning style. This will help personalize your experience.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((char, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${char.bg} transform transition hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
            >
              <img src={char.img} alt={char.name} className="h-64 w-full object-cover" />
              <div className="p-4 bg-white">
                <h2 className="text-xl font-semibold text-gray-800 text-center">{char.name}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-3 rounded-full shadow-md transition">
            Continue
          </button>
        </div>
      </section>
    </>
  )
}

export default LearningCharacters
