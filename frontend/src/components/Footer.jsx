const FOOTER_LINKS = [
  { label: "A propos de nous", href: "#a-propos" },
  { label: "Nous contacter", href: "#contact" },
  { label: "Nous rejoindre", href: "#rejoindre" },
  { label: "FAQ", href: "#faq" },
  { label: "Livraison", href: "#livraison" },
  { label: "CGV", href: "#cgv" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <nav className="footer-tabs" aria-label="Liens du pied de page">
        {FOOTER_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="footer-tab">
            {link.label}
          </a>
        ))}
      </nav>
      <p className="footer-copy">Catalogue mode — test technique Finlive</p>
    </footer>
  );
}
