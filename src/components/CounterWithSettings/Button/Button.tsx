import styles from './Button.module.css';

type DefaultButtonPropsType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ className, ...restProps }: DefaultButtonPropsType) => {
  console.log('render Button');

  const finalClassName = `${styles.default}${className ? ' ' + className : ''}`;

  return <button className={finalClassName} {...restProps} />;
};
