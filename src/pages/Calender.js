import React from 'react';

const Calender = () => {
  const schedule = [
    { time: '9 AM', Sunday: 'Ladies\nJaclyn', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: '' },
    { time: '12 PM', Sunday: '', Monday: 'Murl', Tuesday: 'Peanut', Wednesday: 'NOON\nMichael B\n2nd Wed Keytags\nStick Meeting', Thursday: 'Cambria', Friday: 'Quarter', Saturday: 'T' },
    { time: '8 PM', Sunday: 'Gregory', Monday: 'Daniel M.', Tuesday: 'Cynthia', Wednesday: 'Analeigh', Thursday: 'Dinah R.', Friday: 'SPAD\nNellie P.', Saturday: 'Michael B' },
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  React.useEffect(() => {
    const targetNode = document.querySelector("#calendar-container");
    const config = { childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        }
      }
    };

    const observer = new MutationObserver(callback);

    if (targetNode) {
      observer.observe(targetNode, config);
    }

    return () => {
      if (observer) {
        observer.disconnect();
        console.log("MutationObserver disconnected.");
      }
    };
  }, []);

  return (
    <div id="calendar-container" className="p-4">
      <div className="grid grid-cols-8 gap-2 border border-black rounded-lg">
        <div className="bg-gray-200 font-bold text-center p-2">Time</div>
        {days.map((day) => (
          <div key={day} className="bg-gray-200 font-bold text-center p-2">
            {day}
          </div>
        ))}

        {schedule.map((slot, idx) => (
          <React.Fragment key={idx}>
            <div className="border border-gray-300 p-2 text-center font-bold">{slot.time}</div>
            {days.map((day) => (
              <div
                key={`${idx}-${day}`}
                className="border border-gray-300 p-2 whitespace-pre-line"
              >
                {slot[day] || ''}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calender;