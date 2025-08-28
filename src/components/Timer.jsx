  import React , {useState , useEffect} from "react";
  import style from './Timer.module.css' 
  import {formatTime , calculateTime} from '../utils/auxiliaryFunctions'


  const Timer =() => {
      const [time , setTime] = useState(0);

      const [initialTime , setInitialTime] = useState(0);
      const [isRunning , setIsRunning] = useState(false);
      const [editField , setEditField] = useState({field : null , value : ''})

      useEffect(() => {
        let interval = null;
        if(isRunning && time > 0){
        interval = setInterval(() => {
              setTime((prevTime) => prevTime - 1)
          }, 1000);
        }
        else if(time === 0){
          setIsRunning(false);
        }

        return () => {
          if(interval){
            clearInterval(interval)
          }
        }
      } , [isRunning , time])

      const handleEditField = (field) => {
          if(editField.field === field){
            const newTime = {...formatTime(time) , [field] : editField.value.padStart(2 , '0')}
          
            const calculatedTime = calculateTime(newTime.hours , newTime.minutes , newTime.seconds);

            setTime(calculatedTime)
            setInitialTime(calculatedTime)

            setEditField({field : null , value : ''});
          }

          else{
            setIsRunning(false);
            setEditField({field , value : formatTime(time)[field].replace(/^0+/ , '')})
          }
      }


      const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g , '').slice(0 , 2);

        setEditField((prevField) => ({
          ...prevField , value
        }))
      }

      const {hours , minutes , seconds}  = formatTime(time);
      return (
        <div className={style.timerApp}>
            <div className={style.timerDisplay}>
                <div className={style.timerCircle}>
                    <div className={style.timerTime}>

                        {editField.field === 'hours' ? (
                            <input
                                className={style.timeInput}
                                type="text"
                                value={editField.value}
                                onChange={handleInputChange}
                                onBlur={() => handleEditField('hours')}
                                autoFocus
                            />
                        ) : (
                            <span className={style.timeUnit} onClick={() => handleEditField('hours')}>
                                {hours}
                            </span>
                        )}
                        :
                        {editField.field === 'minutes' ? (
                            <input
                                className={style.timeInput}
                                type="text"
                                value={editField.value}
                                onChange={handleInputChange}
                                onBlur={() => handleEditField('minutes')}
                                autoFocus
                            />
                        ) : (
                            <span className={style.timeUnit} onClick={() => handleEditField('minutes')}>
                                {minutes}
                            </span>
                        )}
                        :
                        {editField.field === 'seconds' ? (
                            <input
                                className={style.timeInput}
                                type="text"
                                value={editField.value}
                                onChange={handleInputChange}
                                onBlur={() => handleEditField('seconds')}
                                autoFocus
                            />
                        ) : (
                            <span className={style.timeUnit} onClick={() => handleEditField('seconds')}>
                                {seconds}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className={style.actionButtons}>
                
              <button className={style.actionButton} onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Pause' : 'Start'} {/* Toggle between Start and Pause */}
              </button>
              <button className={style.actionButton} onClick={() => { setTime(0); setInitialTime(0); setIsRunning(false); }}>
                Reset {/* Reset the timer */}
              </button>
            </div>
        </div>
    )
  }

  export default Timer;