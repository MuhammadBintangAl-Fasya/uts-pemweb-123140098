const FAVORITES_KEY = "museum_favorites"

export const getFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Gagal mengambil daftar favorit:", error)
    return []
  }
}

export const addFavorite = (artwork) => {
  try {
    const favorites = getFavorites()
    if (favorites.some((fav) => fav.objectID === artwork.objectID)) {
      return favorites
    }
    favorites.push({
      ...artwork,
      addedAt: new Date().toISOString(),
    })
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    console.log("Berhasil menambahkan ke favorit:", artwork.objectID)
    return favorites
  } catch (error) {
    console.error("Gagal menambahkan ke favorit:", error)
    return getFavorites()
  }
}

export const removeFavorite = (objectID) => {
  try {
    const favorites = getFavorites()
    const filtered = favorites.filter((fav) => fav.objectID !== objectID)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
    console.log("Berhasil menghapus dari favorit:", objectID)
    return filtered
  } catch (error) {
    console.error("Gagal menghapus dari favorit:", error)
    return getFavorites()
  }
}
