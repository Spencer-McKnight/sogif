import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 64, className = '' }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="SOGIF Logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

