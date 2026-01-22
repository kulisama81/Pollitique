export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4">Pollitique</h3>
            <p className="text-sm text-gray-600">
              Insights sur la politique française à travers les sondages, articles et données.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/politicians" className="hover:text-blue-600">
                  Politiques
                </a>
              </li>
              <li>
                <a href="/articles" className="hover:text-blue-600">
                  Articles
                </a>
              </li>
              <li>
                <a href="/videos" className="hover:text-blue-600">
                  Vidéos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Informations</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/about" className="hover:text-blue-600">
                  À propos
                </a>
              </li>
              <li>
                <a href="/legal" className="hover:text-blue-600">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-600">
                  Confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Pollitique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
