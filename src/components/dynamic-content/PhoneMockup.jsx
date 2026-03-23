import { useState } from 'react';
import { Wifi, Battery, Signal, Bell, User, X } from 'lucide-react';

export default function PhoneMockup({ content, previewMode = 'popup' }) {
  const [theme, setTheme] = useState('light');
  const [device, setDevice] = useState('iPhone 15');
  const [imageScale, setImageScale] = useState('Fill');

  const getObjectFit = () => {
    switch (imageScale) {
      case 'Fit': return 'object-contain';
      case 'Stretch': return 'object-fill';
      default: return 'object-cover';
    }
  };

  const getBannerHeight = () => {
    switch(content.ratio) {
      case '4:1': return 'h-[94px]'; // 375 / 4
      case '3:1': return 'h-[125px]'; // 375 / 3
      case '16:9': 
      default: return 'h-[210px]'; // 375 * 9 / 16
    }
  };

  const getPopupRatio = () => {
    switch(content.ratio) {
      case '3:4': return 'aspect-[3/4]';
      case '9:16': return 'aspect-[9/16]';
      case '1:1': 
      default: return 'aspect-square';
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full fade-in">
      <div className={`w-[375px] h-[812px] rounded-[3rem] p-3 shadow-2xl relative flex-shrink-0 transition-colors duration-500 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-black border-black border-4'}`}>
        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-32 h-7 bg-black rounded-b-3xl"></div>
        </div>
        
        {/* Screen */}
        <div className={`w-full h-full rounded-[2.25rem] overflow-hidden relative border border-gray-800 transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-[#F8FAFC]'}`}>
          
          {/* Status Bar */}
          <div className={`h-12 w-full px-6 flex justify-between items-center text-xs font-semibold absolute top-0 z-40 pt-1 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
            <span>9:41</span>
            <div className="flex space-x-1.5 items-center">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 ml-1" />
            </div>
          </div>

          {previewMode === 'popup' ? (
            /* POPUP PREVIEW */
            <div className="w-full h-full relative">
              {/* Background App Content */}
              <div className="pt-14 px-4 space-y-4 opacity-40 filter blur-[2px]">
                <div className={`h-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}></div>
                <div className={`h-32 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}></div>
                <div className={`h-32 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}></div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center px-6">
                {/* Popup Card */}
                <div className={`w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                  <button className={`absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md transition-colors`}>
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Image Area - Top 60% */}
                  <div className={`w-full bg-gray-100 relative ${getPopupRatio()}`}>
                    {content.imageUrl ? (
                      <img src={content.imageUrl} className={`w-full h-full ${getObjectFit()}`} alt="Popup Content" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-400 font-medium">
                        Image Area ({content.ratio})
                      </div>
                    )}
                  </div>

                  {/* Content Area - Bottom 40% */}
                  <div className="p-6 flex flex-col items-center text-center space-y-4">
                    <h3 className={`text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {content.name || 'Special Offer'}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Tap the button below to see more details.
                    </p>
                    <button className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold mt-2 shadow-sm hover:bg-blue-600 transition-colors">
                      View Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* BANNER PREVIEW */
            <div className="w-full h-full flex flex-col">
              {/* App Header */}
              <div className={`pt-14 pb-4 px-5 shadow-sm border-b relative z-10 flex items-center justify-between ${isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-[#E2E8F0] text-gray-900'}`}>
                <h1 className="text-xl font-bold">DM App</h1>
                <div className="flex items-center gap-4">
                  <Bell className="w-5 h-5" />
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pb-20">
                {/* Banner Slot */}
                <div className={`w-full bg-blue-50 relative ${getBannerHeight()}`}>
                  {content.imageUrl ? (
                    <img src={content.imageUrl} className={`w-full h-full ${getObjectFit()}`} alt="Banner Content" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-400 font-medium border-y border-blue-200">
                      Banner Slot ({content.ratio})
                    </div>
                  )}
                </div>

                {/* Mock Flow */}
                <div className="p-5 space-y-4">
                  <div className="flex gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`w-16 h-16 rounded-2xl flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}></div>
                    ))}
                  </div>
                  
                  <h3 className={`font-bold mt-6 mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
                  {[1,2,3].map(i => (
                    <div key={i} className={`w-full h-20 rounded-xl flex items-center p-4 ${isDark ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'}`}>
                       <div className={`w-12 h-12 rounded-full mr-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}></div>
                       <div className="flex-1 space-y-2">
                         <div className={`h-3 rounded w-3/4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                         <div className={`h-2.5 rounded w-1/2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bottom Nav */}
              <div className={`absolute bottom-0 w-full h-20 backdrop-blur-md border-t flex justify-around items-center px-6 pb-6 z-20 ${isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-[#E2E8F0]'}`}>
                <div className="w-6 h-6 rounded-full bg-[#2563EB]"></div>
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        {/* Action Description */}
        <p className="text-[#475569] bg-white px-4 py-2 border border-[#E2E8F0] shadow-sm rounded-full text-sm font-medium mb-6">
          <span className="text-[#64748B] mr-2">Tap action:</span> 
          <span className="text-[#0F172A]">
            {content.actionType === 'Direct to Service Screen' && `Opens ${content.actionValue || 'Service'}`}
            {content.actionType === 'Direct to URL' && `Opens ${content.actionValue || 'URL'}`}
            {content.actionType === 'Biller Payment' && `Opens Bill Payment — ${content.actionValue || 'Biller'}`}
          </span>
        </p>

        {/* Controls */}
        <div className="flex items-center gap-6 bg-white p-2 rounded-xl border border-[#E2E8F0] shadow-sm">
          <select 
            value={device} 
            onChange={e => setDevice(e.target.value)}
            className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer px-2"
          >
            <option>iPhone 15</option>
            <option>iPhone 13 mini</option>
            <option>iPhone SE</option>
            <option>Android Large</option>
          </select>
          
          <div className="w-px h-6 bg-[#E2E8F0]"></div>
          
          <div className="flex bg-[#F1F5F9] rounded-lg p-0.5">
            <button 
              onClick={() => setTheme('light')} 
              className={`px-3 text-xs font-medium rounded-md py-1 transition-colors ${theme === 'light' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')} 
              className={`px-3 text-xs font-medium rounded-md py-1 transition-colors ${theme === 'dark' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              Dark
            </button>
          </div>
          
          <div className="w-px h-6 bg-[#E2E8F0]"></div>

          <div className="flex items-center gap-2 px-2">
            <span className="text-xs text-[#64748B] font-medium mr-1">Scale:</span>
            {['Fit', 'Fill', 'Stretch'].map(scale => (
              <button 
                key={scale}
                onClick={() => setImageScale(scale)} 
                className={`px-2 text-xs font-medium rounded py-1 transition-colors ${imageScale === scale ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
