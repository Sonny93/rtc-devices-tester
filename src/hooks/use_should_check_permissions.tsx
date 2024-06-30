import Bowser from 'bowser';

const useShouldCheckPermission = () =>
  Bowser.getParser(window.navigator.userAgent).getEngineName().toLowerCase() !==
  'gecko';

export default useShouldCheckPermission;
