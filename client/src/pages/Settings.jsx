import React from 'react';
import { NavLink } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import { House } from 'lucide-react';

const allSettings = [
  {
    id: 1,
    group: "General",
    options: [
      {
        label: "Theme",
        type: "toggle",
        name: "theme",
        values: ["Light Mode", "Dark Mode"],
      },
    ],
  },
  {
    id: 2,
    group: "Notifications",
    options: [
      {
        label: "Email Alerts",
        type: "switch",
        name: "email_alerts",
      },
      {
        label: "Push Notifications",
        type: "switch",
        name: "push_notifications",
      },
    ],
  },
  {
    id: 3,
    group: "Account",
    options: [
      {
        label: "Change Password",
        type: "action",
        name: "change_password",
      },
      {
        label: "Delete Account",
        type: "action",
        name: "delete_account",
        danger: true,
      },
    ],
  },
  {
    id: 4,
    group: "Language",
    options: [
      {
        label: "App Language",
        type: "dropdown",
        name: "language",
        values: ["English", "French", "Spanish"],
      },
    ],
  },
];

const Settings = () => {
  return (
    <>

      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <TitleBar />
      </div>

      <div className="pt-24 px-4">
        
        <div className="flex items-center justify-between mb-6 pr-7">
          <h1 className="text-4xl font-bold text-purple-800">Settings</h1>
          
          <NavLink to='/dashboard' className="flex items-center gap-2 border-2 rounded-md px-4 py-3 text-purple-600 cursor-pointer hover:text-purple-800 transition">
            <House size={20} />
            <span className="text-sm font-medium">Home</span>
          </NavLink>
        </div>

        <div className="p-6 bg-white shadow-xl border border-gray-200 rounded-xl space-y-10">
          {allSettings.map((group) => (
            <div key={group.id}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{group.group}</h2>
              <div className="space-y-4">
                {group.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-3 rounded-md ${
                      option.danger ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span className="text-base">{option.label}</span>

                    {option.type === 'toggle' && (
                      <select className="p-2 rounded-md border border-gray-300 bg-white">
                        {option.values.map((val, i) => (
                          <option key={i} value={val}>{val}</option>
                        ))}
                      </select>
                    )}

                    {option.type === 'switch' && (
                      <input type="checkbox" className="w-5 h-5 accent-purple-600" />
                    )}

                    {option.type === 'dropdown' && (
                      <select className="p-2 rounded-md border border-gray-300 bg-white">
                        {option.values.map((val, i) => (
                          <option key={i} value={val}>{val}</option>
                        ))}
                      </select>
                    )}

                    {option.type === 'action' && (
                      <button
                        className={`text-sm font-medium underline ${
                          option.danger ? 'text-red-600' : 'text-blue-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Settings;
