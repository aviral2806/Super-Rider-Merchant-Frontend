import { Button } from "@/components/ui/button";

interface StyledButtonProps {
  type?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function StyledButton({
  children,
  type = "primary",
  onClick,
  className = "",
  disabled = false,
}: StyledButtonProps) {
  const primaryClass =
    "w-full bg-primary text-white hover:bg-[#bf442b] transition-colors ";
  const secondaryClass =
    "w-full bg-white text-primary border-2 border-primary hover:scale-102 hover:bg-white transition-transform ";

  return (
    <Button
      className={`${
        type === "primary" ? primaryClass : secondaryClass
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
