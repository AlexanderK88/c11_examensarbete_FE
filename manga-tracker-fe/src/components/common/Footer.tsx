export default function Footer() {
  return (
    <footer className="w-full py-4 mt-8 ">
      <div className="text-center text-white font-sans">
        &copy; {new Date().getFullYear()} Manga Vault<sup>™</sup>. All rights
        reserved.
      </div>
    </footer>
  );
}
