import React from 'react';
import { useForm, FormProvider } from 'react-hook-form'
import useFetch from '@/hooks/useFetch.js';
import ChatLoader from '@/components/ChatLoader';
import { ASSISTANT_V2_MESSAGE } from '@/constants/actions.js';

const Foobar = () => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    setError,
    watch,
    errors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { fetchWrapper, response, isPending, error, success } = useFetch();
  const [conversation, setConversation] = React.useState([]);

  const onSubmit = data => {
    reset()
    setConversation([
      ...conversation,
      {text: data.message, type: 'user'}
    ])
    fetchWrapper({
      method: 'POST',
      path: ASSISTANT_V2_MESSAGE,
      body: data,
    })
  }

  React.useEffect(() => {
    require('@/services/audio.js')
    if(success) {
      const messages = response.output.generic.map(m => ({...m, type: 'bot'}))
      setConversation([
        ...conversation,
        ...messages
      ])
    }
  }, [response, error])

  return (
    <div className="chat__container">
      <div className="audio__container">
        <div className="waveform">
          <canvas className="js-canvas waveform__canvas"></canvas>
        </div>
      </div>
      <ul className="chat-thread">
        {
          conversation.length ? conversation.map((message, index) => (
            <li key={index} className={message.type}>{message.text}</li>
          )) : null
        }
        {
          isPending ? (
            <li className="bot">
              <ChatLoader/>
            </li>
          ) : null
        }
      </ul>

      <FormProvider {...{errors, register, control, watch}} >
        <form className="chat-window" onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register}
            name="message"
            autoFocus
            type="text"
            autoComplete="off"
            className="chat-window-message"
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default Foobar;
