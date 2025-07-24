import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, CheckCircle2 } from 'lucide-react'
import Astra from '../assets/avatars/learning_characters/astra_the_analyst.jpg'
import Lex from '../assets/avatars/learning_characters/lex_the_achiever.jpg'
import Mira from '../assets/avatars/learning_characters/mira_the_connector.jpg'
import Zeke from '../assets/avatars/learning_characters/zeke_the_explorer.jpg'
import Logo from '../assets/icon/image2.png'

import AuthManager from '../utils/AuthManager'
import { saveLearningStyle } from '../userLearningStyle'

// Helpers
const getInitials = (name) => {
  if (!name) return 'AU'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

const characters = [
  {
    name: 'Astra the Analyst',
    img: Astra,
    description: 'Astra is methodical and detail-oriented, perfect for analytical learners.',
    styles: { visual: 50, auditory: 10, reading: 30, kinesthetic: 10 }
  },
  {
    name: 'Lex the Achiever',
    img: Lex,
    description: 'Lex thrives on challenges and structured goals to stay motivated.',
    styles: { visual: 30, auditory: 20, reading: 30, kinesthetic: 20 }
  },
  {
    name: 'Mira the Connector',
    img: Mira,
    description: 'Mira learns best by connecting ideas and discussing with others.',
    styles: { visual: 20, auditory: 40, reading: 20, kinesthetic: 20 }
  },
  {
    name: 'Zeke the Explorer',
    img: Zeke,
    description: 'Zeke loves hands-on exploration and discovery while learning.',
    styles: { visual: 25, auditory: 15, reading: 20, kinesthetic: 40 }
  },
]

const LearningCharacters = () => {
  const navigate = useNavigate()
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  const user = AuthManager.getCurrentUser()
  const avatarRef = useRef(null)
  const profileRef = useRef(null)

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)
  }

  const handleContinue = async () => {
    if (!selectedCharacter || !user) return

    const payload = {
      character: selectedCharacter.name,
      styles: selectedCharacter.styles
    }

    await saveLearningStyle(user.id, payload)
    navigate('/dashboard')
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        !avatarRef.current.contains(e.target)
      ) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      
      {/* Header */}
      <header className="w-full h-20 px-8 fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-sm bg-white">
        <img src={Logo} alt="LevelUp Logo" className="h-5 md:h-6 lg:h-5" />

        <div className="flex items-center gap-4">
          <div className="w-[42px] h-[42px] flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 transition">
            <Bell size={20} className="text-gray-500" />
          </div>

          <div
            ref={avatarRef}
            onClick={() => setShowProfile(prev => !prev)}
            className="w-[42px] h-[42px] flex items-center justify-center rounded-full cursor-pointer bg-purple-100 hover:bg-purple-200 transition"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${getInitials(
                user?.name || user?.username
              )}&background=7c3aed&color=fff`}
              alt="User Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        {showProfile && (
          <div
            ref={profileRef}
            className="absolute top-20 right-4 z-50 bg-white border border-gray-200 shadow-xl rounded-xl w-64 p-4"
          >
            <h2 className="text-gray-800 font-semibold text-lg mb-1">{user?.name || 'Anonymous User'}</h2>
            <p className="text-sm text-gray-500">@{user?.username || 'anonymous'}</p>
            <button
              onClick={() => {
                setShowProfile(false)
                navigate('/profile')
              }}
              className="mt-4 px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg w-full"
            >
              View Profile
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <section className="pt-28 px-6">
        <div className="text-center mb-12">
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
              onClick={() => handleCharacterSelect(char)}
              className={`relative group rounded-2xl overflow-hidden shadow-lg bg-white
                transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                hover:scale-105 cursor-pointer
                ${selectedCharacter?.name === char.name ? 'ring-4 ring-purple-500 scale-105' : ''}`}
            >
              <img src={char.img} alt={char.name} className="h-64 w-full object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{char.name}</h2>
              </div>

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

              {selectedCharacter?.name === char.name && (
                <div className="absolute top-3 right-3 bg-purple-600 rounded-full p-1 shadow-lg animate-bounce">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="relative rounded-2xl border-2 border-dashed border-purple-300 
              bg-white/70 backdrop-blur-md p-6 flex flex-col items-center justify-center
              text-center shadow-inner transition hover:scale-105">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">Customize a Learning Character</h3>
            <p className="text-gray-600 mb-4">Want to build your own unique learning character? This feature is coming soon!</p>
            <span className="px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-10 flex justify-center">
          <button
            disabled={!selectedCharacter}
            className={`text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform 
              ${selectedCharacter
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 hover:shadow-xl text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            onClick={handleContinue}
          >
            {selectedCharacter ? `Continue as ${selectedCharacter.name}` : 'Continue'}
          </button>
        </div>
      </section>
    </div>
  )
}

export default LearningCharacters
