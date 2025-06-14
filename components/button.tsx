import { ComponentChild, JSX } from "preact";
import clsx from "clsx";

type AnchorButtonProps = {
  href: string;
} & JSX.HTMLAttributes<HTMLAnchorElement>;

type ButtonButtonProps = JSX.HTMLAttributes<HTMLButtonElement>;

export type ButtonProps = (AnchorButtonProps | ButtonButtonProps) & {
  color: string;
  children?: ComponentChild;
};

function isAnchorButtonProps(
  props: AnchorButtonProps | ButtonButtonProps,
): props is AnchorButtonProps {
  return "href" in props;
}

function Content({ children }: { children: ComponentChild }) {
  return (
    <>
      <span class="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      </div>
    </>
  );
}

export default function Button(props: ButtonProps) {
  const { children, className, color, ...restProps } = props;
  const commonClassNames =
    "group relative py-2 px-4 rounded-full font-medium text-white transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 active:scale-95 border-solid border border-white/20";
  const style = {
    background: `rgb(${color})`,
    boxShadow:
      `0 8px 32px rgb(${color} / 0.3), inset 0 1px 0 rgb(255 255 255 / 0.2)`,
  };

  if (isAnchorButtonProps(props)) {
    return (
      <a
        {...(restProps as AnchorButtonProps)}
        className={clsx(
          className,
          commonClassNames,
        )}
        style={style}
      >
        <Content>
          {children}
        </Content>
      </a>
    );
  }

  return (
    <button
      {...(restProps as ButtonButtonProps)}
      className={clsx(
        className,
        commonClassNames,
      )}
      style={style}
    >
      <Content>
        {children}
      </Content>
    </button>
  );
}
