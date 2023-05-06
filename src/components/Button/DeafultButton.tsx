import React, { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

/**
 * @param isPrimary - status button, primary button using background color
 * @param isCustomButton - status button, primary button using background color
 * @param onCLick - store function for button if doing click function
 * @param className - css style for button
 * @param children - JSX element in case you want to add like icon, or anything
 *
 * please do not add any padding because it already implemented in component. thanks
 * reminder: please change the color on primaryButton with bg-primary instead of bg-orange-500
 * if you want to increase the size of button, you can use width or height classes to control size of button
 */
function Button(props: { isPrimary?: boolean; isCustomButton?: boolean; onClick?: any; className?: string; children?: ReactNode; id?: string; options?: ButtonHTMLAttributes<HTMLButtonElement> }): JSX.Element {
  const primaryButton = 'lg:px-4 lg:py-2  py-[6px] px-3 bg-orange-500 text-white  hover:bg-black';
  const secondaryButton = 'bg-transparent text-black hover:text-white border  hover:bg-black lg:px-4 lg:py-2  py-[6px] px-3';
  const customButton = '';
  const defaultStyle = props.isPrimary ? primaryButton : props.isCustomButton ? customButton : secondaryButton;
  return (
    <button {...props.options} className={`rounded-md ${defaultStyle} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

/**
 * @param isPrimary - status button, primary button using text color
 * @param onCLick - store function for button if doing click function
 * @param className - css style for button
 * @param children - JSX element in case you want to add like icon, or anything
 *
 * Button without background, add icon with text or just text as children
 */
const TextButton = React.forwardRef(function TextButton(
  props: {
    id?: string;
    isPrimary?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    children?: ReactNode;
    options?: ButtonHTMLAttributes<HTMLButtonElement>;
    style?: CSSProperties;
  },
  ref?: React.ForwardedRef<HTMLButtonElement>
) {
  const primaryButton = 'text-primary';
  const secondaryButton = 'text-black';
  const defaultStyle = props.isPrimary ? primaryButton : secondaryButton;
  return (
    <button id={props.id} ref={ref} className={`${props.className} ${defaultStyle}`} onClick={props.onClick} {...props.options} style={props.style}>
      {props.children}
    </button>
  );
});

/**
 * @param onCLick - store function for button if doing click function
 * @param className - css style for button
 * @param children - JSX element in case you want to add like icon, or anything
 *
 * please do not add any padding because it already implemented in component. thanks
 * if you want to increase the size of button, you can use width or height classes to control size of button
 */
function RoundedButton(props: { children: JSX.Element; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; className?: string; options?: ButtonHTMLAttributes<HTMLButtonElement> }): JSX.Element {
  return (
    <button className={`rounded-full ${props.className} p-2 flex justify-center items-center`} onClick={props.onClick} {...props.options}>
      {props.children}
    </button>
  );
}

export { Button, RoundedButton, TextButton };
