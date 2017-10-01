export default {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'auto',
  },
  containerIsOpen: {
    pointerEvents: 'auto',
  },
  containerContentIsVerticallyCentered: {
    alignItems: 'center',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'relative',
    background: 'white',
    margin: 20,
    padding: 20,
    maxWidth: 1000,
    borderRadius: 4,
    boxShadow: '0 0 10px black',
  },
  contentIsFullScreen: {
    margin: 0,
    borderRadius: 0,
  },
};
