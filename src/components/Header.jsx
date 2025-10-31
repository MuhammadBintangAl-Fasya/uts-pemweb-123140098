"use client"

export default function Header({ currentPage, onNavigate, favoriteCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          <h1>Museum Explorer</h1>
        </div>

        <nav className="navigation" role="navigation">
          <button
            className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
            onClick={() => onNavigate("home")}
            aria-current={currentPage === "home" ? "page" : undefined}
          >
            Jelajahi
          </button>
          <button
            className={`nav-btn ${currentPage === "favorites" ? "active" : ""}`}
            onClick={() => onNavigate("favorites")}
            aria-current={currentPage === "favorites" ? "page" : undefined}
          >
            Favorit
            {favoriteCount > 0 && <span className="badge">{favoriteCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  )
}
