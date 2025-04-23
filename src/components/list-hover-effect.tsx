import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

/**
 * Props for the ListHoverEffect component
 */
interface ListHoverEffectProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Content to render inside the list */
  children: React.ReactNode;
  /** Optional CSS class to apply to the component */
  className?: string;
}

/**
 * A list component that provides hover effects for its children
 */
const ListHoverEffect = forwardRef<HTMLUListElement, ListHoverEffectProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ul ref={ref} className={cn("group relative", className)} {...props}>
        {children}
      </ul>
    );
  },
);

ListHoverEffect.displayName = "ListHoverEffect";

/**
 * Props for the ListHoverEffectItem component
 */
interface ListHoverEffectItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Content to render inside the list item */
  children: React.ReactNode;
  /** Optional CSS class to apply to the component */
  className?: string;
  /** Whether to clone children instead of wrapping them in an li element */
  asChild?: boolean;
  /** Duration of the hover transition in milliseconds */
  transitionDuration?: number;
}

/**
 * A list item component that provides hover effects
 */
const ListHoverEffectItem = forwardRef<HTMLLIElement, ListHoverEffectItemProps>(
  (
    { children, className, asChild = true, transitionDuration = 300, ...props },
    ref,
  ) => {
    const itemClassName = cn("relative hover:!opacity-100", className);

    const style = {
      transitionProperty: "opacity",
      transitionDuration: `${transitionDuration}ms`,
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
      // Add focus handling for keyboard navigation
      const parentUl = e.currentTarget.closest("ul");
      if (parentUl) {
        Array.from(parentUl.children).forEach((child) => {
          (child as HTMLElement).style.opacity = "0.5";
        });
        (e.currentTarget as HTMLElement).style.opacity = "1";
      }
      props.onFocus?.(e as unknown as React.FocusEvent<HTMLLIElement>);
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      // Reset opacity on blur
      const parentUl = e.currentTarget.closest("ul");
      if (parentUl) {
        Array.from(parentUl.children).forEach((child) => {
          (child as HTMLElement).style.opacity = "";
        });
      }
      props.onBlur?.(e as unknown as React.FocusEvent<HTMLLIElement>);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<any, React.ElementType>,
        {
          className: cn(
            "group-hover:opacity-50",
            itemClassName,
            (children.props as any).className,
          ),
          style: {
            ...(children.props as any).style,
            ...style,
          },
          onFocus: handleFocus,
          onBlur: handleBlur,
          ref,
        },
      );
    }

    return (
      <li
        ref={ref}
        className={cn(itemClassName, "group-hover:opacity-50")}
        style={style}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...props}
      >
        {children}
      </li>
    );
  },
);

ListHoverEffectItem.displayName = "ListHoverEffectItem";

export { ListHoverEffect, ListHoverEffectItem };
