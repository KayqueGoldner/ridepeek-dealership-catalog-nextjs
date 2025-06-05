import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";

interface ContactLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export const ContactLink = ({
  children,
  className,
  ...props
}: ContactLinkProps) => {
  return (
    <Link href="mailto:contact@ridepeek.com" className={className} {...props}>
      {children}
    </Link>
  );
};
