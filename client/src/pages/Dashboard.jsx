import React from 'react';
import Navbar from '../components/Navbar';
import MainBody from '../components/MainBody';
import TitleBar from '../components/TitleBar';
// MainLayout is likely used higher up in your routing, not typically within Dashboard
// import MainLayout from '../layouts/MainLayout'; 

const Dashboard = () => {
  return (
    // 1. Main Dashboard Container:
    //    - h-screen: Ensures it takes 100% of the viewport height.
    //    - flex flex-col: Makes it a vertical flex container. Its children will stack vertically.
    //    - bg-amber-400: Your overall background color.
    <div className='h-screen flex flex-col bg-gray-100'>

      {/* 2. Top Section: TitleBar
          - This div will take its intrinsic height based on the TitleBar's content.
          - flex-none: (Optional) Explicitly tells this item not to grow or shrink, just take its content size.
      */}
      <div className='flex-none'> 
        <TitleBar />
      </div>

      {/* 3. Bottom Section: Navbar and MainBody
          - flex-grow: This is CRUCIAL! It makes this section expand to fill ALL remaining vertical space
                       after the TitleBar has taken its height.
          - flex: Makes *this* section a horizontal flex container for Navbar and MainBody.
          - w-full: Ensures it spans the full width of its parent (which is the h-screen div).
          - overflow-hidden: Helps prevent horizontal overflow if contents push beyond bounds,
                             though 'overflow-y-auto' on MainBody's wrapper is for vertical scroll.
      */}
      <section className='flex-grow flex w-full  overflow-hidden'> 
        {/* Navbar (Sidebar):
            - Its fixed width (e.g., w-72) should be defined within its own component.
            - It should stretch to the full height of THIS section (its parent), so it needs 'h-full'.
        */}
        <Navbar />

        {/* MainBody Content Area:
            - flex-grow: Makes this div take up all the remaining horizontal space after Navbar.
            - overflow-y-auto: This is crucial! If content inside MainBody exceeds its height,
                               only THIS div will scroll vertically, not the whole page.
            - p-4: Adds padding around the MainBody content.
        */}
        <div className='flex-grow overflow-y-auto p-4'>
          <MainBody />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;