import React from 'react';
import { default as WatsonAssistant } from '@/services/watson-assistant';

export default () => {
  const [assistant, setAssistant] = React.useState({});
  const [hooked, setHooked] = React.useState(false);
  const [error, setError] = React.useState(null);

  // init assistant
  React.useEffect(() => {
    let assistant;
    try {
      assistant = new WatsonAssistant()
      setAssistant(assistant)
      setHooked(true)
    } catch(e) {
      setHooked(false);
      setError(e);
    }
  }, [])

  return {hooked, error, assistant}
}
