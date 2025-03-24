import Link from "next/link";

type MenuItemProps = {
  title: string;
  pageRef: string;
  isActive: boolean;
  isScrolled: boolean;
};

export default function TopMenuItem({
  title,
  pageRef,
  isActive,
  isScrolled,
}: MenuItemProps) {
  return (
    <Link
      href={pageRef}
      className={`px-4 py-2 rounded-full transition-all ${
        isActive
          ? isScrolled
            ? "text-green-600 font-medium bg-green-50"
            : "text-white font-medium bg-white/20"
          : isScrolled
            ? "text-gray-700 hover:bg-gray-100"
            : "text-white hover:bg-white/10"
      }`}
    >
      {title}
    </Link>
  );
}
