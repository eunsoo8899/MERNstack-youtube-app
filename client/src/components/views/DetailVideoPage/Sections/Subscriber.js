import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Subscriber(props) {
  const userTo = props.userTo
  const userFrom = props.userFrom

  const [SubscribeNumber,setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)

  const onSubscribe = () => {

    let subscribeVariable = {
      userTo : userTo,
      userFrom : userFrom
    }

    if(Subscribed) {
      //When we are already subscribed
      axios.post('/api/subscribe/unSubscribe', subscribeVariable)
      .then(response => {
        if(response.data.success) {
          setSubscribeNumber(SubscribeNumber - 1)
          setSubscribed(!Subscribed)
        } else {
          alert('Failed to unsubscribe')
        }
      })
    } else {
      //When we are not subscribed yet

      axios.post('/api/subscribe/subscribe', subscribeVariable)
      .then(response => {
      
        if (response.data.success) {
          setSubscribeNumber(SubscribeNumber + 1)
          setSubscribed(!Subscribed)
        } else {
          alert('Failed to subscribe')
        }
      })
    }
  }

  useEffect(() => {

    const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
    axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
    .then(response => {
      if(response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber)
      } else {
        alert('Failed to get subscriber number')
      }
    })

    axios.post('/api/subscribe/subscribed', subscribeNumberVariables )
    .then(response => {
      if(response.data.success) {
        console.log(response.data.subscribed)
        setSubscribed(response.data.subscribed)
      } else {
        alert('Fail to get Subscribed information')
      }
    })

  },[])

  return (
    <div>
      <button 
        onClick={onSubscribe}
        style={{
        backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000' }`, 
        borderRadius: '4px', color: 'white', border: '0',
        padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
      }}>
        {SubscribeNumber} {Subscribed? 'Subscribed': 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscriber
