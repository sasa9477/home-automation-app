const usePubSub = () => {
  const subscribe = (eventName: string, callback: EventListenerOrEventListenerObject) => {
    document.addEventListener(eventName, callback, { passive: true });
  };

  const unsubscribe = (eventName: string, callback: EventListenerOrEventListenerObject) => {
    document.removeEventListener(eventName, callback);
  };

  const publish = (eventName: string, data?: any) => {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
  };

  return {
    subscribe,
    unsubscribe,
    publish,
  };
};

export default usePubSub;
