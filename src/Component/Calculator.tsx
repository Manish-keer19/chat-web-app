import React, { useState } from 'react';
import Navbar from './Navbar';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [animate, setAnimate] = useState<boolean>(false);

  const handleNumber = (number: string) => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 150);
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 150);
    setEquation(display + ' ' + operator + ' ');
    setDisplay('0');
  };

  const handleEqual = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 150);
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 150);
    setDisplay('0');
    setEquation('');
  };

  return (
    <>
  
      <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4">
      <div className={`bg-opacity-20 backdrop-blur-xl bg-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-[0_0_40px_rgba(139,92,246,0.3)] border border-opacity-30 border-purple-500 transform hover:scale-105 transition-all duration-300 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] ${animate ? 'scale-[1.02]' : ''}`}>
        {/* Calculator Display */}
        <div className="mb-4 sm:mb-6 bg-opacity-40 bg-black backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-opacity-20 border-purple-500">
          <div className="text-purple-300 text-right h-5 sm:h-6 text-xs sm:text-sm font-mono tracking-wider overflow-hidden">
            {equation}
          </div>
          <div className="text-right mt-1 sm:mt-2">
            <span className={`text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-wider font-mono transition-all duration-200 ${animate ? 'text-purple-300' : ''}`}>
              {display}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {/* First Row */}
          <button 
            onClick={handleClear} 
            className="col-span-2 bg-gradient-to-br from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-red-500/30 font-bold text-base sm:text-lg"
          >
            AC
          </button>
          <button 
            onClick={() => handleOperator('/')} 
            className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg"
          >
            ÷
          </button>
          <button 
            onClick={() => handleOperator('*')} 
            className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg"
          >
            ×
          </button>

          {/* Number Rows */}
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg hover:from-gray-600"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={() => handleOperator('-')} 
            className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg"
          >
            -
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg hover:from-gray-600"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={() => handleOperator('+')} 
            className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg"
          >
            +
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg hover:from-gray-600"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={handleEqual} 
            className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-green-500/30 font-bold text-base sm:text-lg"
          >
            =
          </button>

          {/* Last Row */}
          <button 
            onClick={() => handleNumber('0')} 
            className="col-span-2 bg-gradient-to-br from-gray-700 to-gray-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg hover:from-gray-600"
          >
            0
          </button>
          <button 
            onClick={() => handleNumber('.')} 
            className="bg-gradient-to-br from-gray-700 to-gray-800 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl transform hover:scale-95 transition-all duration-150 active:scale-90 shadow-lg hover:shadow-purple-500/30 font-bold text-base sm:text-lg hover:from-gray-600"
          >
            .
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Calculator;
