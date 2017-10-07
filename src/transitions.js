export const fade = duration => ({
  enter: {
    duration: duration.enter || duration,
    transition: `opacity ${duration.enter || duration}ms ease-in-out`,
    from: {opacity: 0},
    to: {opacity: 1},
  },
  exit: {
    duration: duration.exit || duration,
    transition: `opacity ${duration.exit || duration}ms ease-in-out`,
    from: {opacity: 1},
    to: {opacity: 0},
  },
});

export const fromBottom = duration => ({
  enter: {
    duration: duration.enter || duration,
    transition: `
      opacity ${duration.enter || duration}ms ease-out,
      transform ${duration.enter || duration}ms ease-out
    `,
    from: {
      opacity: 0,
      transform: 'translateY(10%)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  exit: {
    duration: duration.exit || duration,
    transition: `
      opacity ${duration.exit || duration}ms ease-out,
      transform ${duration.exit || duration}ms ease-out
    `,
    from: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    to: {
      opacity: 0,
      transform: 'translateY(10%)',
    },
  },
});
