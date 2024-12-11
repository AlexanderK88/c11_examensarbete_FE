export default function Footer() {
  return (
    <footer className="w-full py-4 mt-8">
      <div className="text-center text-gray-600 font-serif">
        &copy; {new Date().getFullYear()} Manga Vault<sup>™</sup>. All rights
        reserved.
      </div>
    </footer>
  );
}
