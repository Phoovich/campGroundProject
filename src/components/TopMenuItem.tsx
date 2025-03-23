import Link from "next/link";

type MenuItemProps = {
  title: string;
  pageRef: string;
};

export default function TopMenuItem({ title, pageRef }: MenuItemProps) {
  return (
    <Link
      href={pageRef}
      className="px-4 py-2 text-gray-700 hover:text-cyan-600 transition-all"
    >
      {title}
    </Link>
  );
}
