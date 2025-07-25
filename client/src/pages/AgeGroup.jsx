import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Logo from '../assets/icon/image2.png'
import { useNavigate } from 'react-router-dom'

const ageGroups = [
  { label: '7 - 12', value: '7-12' },
  { label: '13 - 18', value: '13-18' },
  { label: '19 - 25', value: '19-25' },
  { label: '26 - 40', value: '26-40' },
  { label: '41 and above', value: '41-60' },
]

const AgeGroup = () => {
  const navigate = useNavigate()
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [loading, setLoading] = useState(false)
  const userId = '2ls6Jv40FfVIOQfLZyasfzjsYbf1' 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedGroup) return;

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5000/api/user/update-age-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ageGroup: selectedGroup.value
        }),
      });

      if (!response.ok) throw new Error("Failed to update age group");

      const data = await response.json();
      alert(`You selected: ${selectedGroup.label}`);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error updating age group:", error);
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false); 
    }
  };


  return (
    <section className="min-h-screen flex flex-col p-4 bg-gray-100">
      {/* Logo Section */}
      <div className="w-full flex justify-center md:justify-start">
        <img src={Logo} alt="LevelUp Logo" className="w-32 mb-6" />
      </div>

      {/* Centered Form Section */}
      <div className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Please Select Your Age Group
          </h1>

          <Listbox value={selectedGroup} onChange={setSelectedGroup}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-700">
                <span className="block truncate">
                  {selectedGroup ? selectedGroup.label : '-- Choose Age Group --'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>

              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none text-gray-800 z-50">
                {ageGroups.map((group, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={group}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-purple-100 text-purple-700' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {group.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-3 flex items-center text-purple-600">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <button
            type="submit"
            disabled={!selectedGroup || loading}
            className={`mt-6 w-full py-3 text-white font-medium rounded-lg transition
              ${selectedGroup && !loading
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            {loading ? 'Submitting...' : 'Continue'}
          </button>

        </form>
      </div>
    </section>
  )
}

export default AgeGroup
