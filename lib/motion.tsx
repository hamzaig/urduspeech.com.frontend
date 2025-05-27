export const motion = {
  div: (props: any) => <div {...props}>{props.children}</div>,
  span: (props: any) => <span {...props}>{props.children}</span>,
  button: (props: any) => <button {...props}>{props.children}</button>,
  a: (props: any) => <a {...props}>{props.children}</a>,
  ul: (props: any) => <ul {...props}>{props.children}</ul>,
  li: (props: any) => <li {...props}>{props.children}</li>,
  initial: () => motion,
  whileInView: () => motion,
  viewport: () => motion,
  transition: () => motion,
  animate: () => motion,
};