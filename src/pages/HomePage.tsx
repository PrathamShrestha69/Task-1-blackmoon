'use client'

import ButtonIcon from '@/components/lib/ui/ButtonIcon'
import SearchBarAutoComplete from '@/components/lib/ui/SearchBarAutoComplete'
import SkeletonCustom from '@/components/lib/ui/Skeleton'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import SearchBar from '@/components/lib/ui/SearchBar'

const HomePage = () => {


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">


      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        {/* Search Bar Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Search Bar Component</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-slate-600 mb-4">
              Autocomplete search bar with customizable styling and icons.
            </p>
            <SearchBarAutoComplete text="Search movies..." />
            <SearchBar className='w-54 bg-zinc-300 hover:bg-zinc-300  mt-10 ' />
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Button Components</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-slate-600 mb-6">
              Dynamic buttons with customizable icons, variants, and actions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-slate-200 rounded p-4">
                <p className="text-sm font-semibold text-slate-600 mb-3">Contained Variant</p>
                <ButtonIcon
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  text="Delete"
                />
              </div>
              <div className="border border-slate-200 rounded p-4">
                <p className="text-sm font-semibold text-slate-600 mb-3">Outlined Variant</p>
                <ButtonIcon
                  variant="outlined"
                  startIcon={<EditIcon />}
                  endIcon={<AddIcon />}
                  text="Edit"
                />
              </div>
              <div className="border border-slate-200 rounded p-4">
                <p className="text-sm font-semibold text-slate-600 mb-3">Text Variant</p>
                <ButtonIcon
                  variant="text"
                  startIcon={<AddIcon />}
                  text="Add New"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skeleton Loaders Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Skeleton Loaders</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-slate-600 mb-6">
              Animated skeleton placeholders for content loading states.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-2">Rectangular (Pulse)</p>
                <SkeletonCustom
                  variant="rectangular"
                  animation="pulse"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: 'grey.300' }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-2">Rectangular (Wave)</p>
                <SkeletonCustom
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: 'grey.400' }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-2">Circular</p>
                <SkeletonCustom
                  variant="circular"
                  animation="pulse"
                  width={50}
                  height={50}
                  sx={{ bgcolor: 'grey.300' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Drawer Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Swipeable Navigation Drawer</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-slate-600 mb-4">
              Click the menu button in the header to see the swipeable drawer in action. It supports navigation links and custom actions.
            </p>
            <div className="text-slate-500 text-sm italic">
              <p>Features:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Swipeable from the left edge</li>
                <li>Navigation links with href support</li>
                <li>Custom onClick handlers</li>
                <li>Customizable button labels and styles</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
