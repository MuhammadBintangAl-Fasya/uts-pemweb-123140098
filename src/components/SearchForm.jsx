"use client"

import { useState, useRef } from "react"
import { validateSearchForm } from "../lib/validation"
import { getDepartments } from "../lib/api"
import { useEffect } from "react"

export default function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    keyword: "",
    department: 0,
    yearStart: "",
    yearEnd: "",
    hasImages: true,
    sortBy: "relevance",
  })
  const [errors, setErrors] = useState({})
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const formRef = useRef(null)

  // Load departments on mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const depts = await getDepartments()
        setDepartments(depts)
      } catch (err) {
        console.error("[v0] Failed to load departments:", err)
      } finally {
        setLoading(false)
      }
    }
    loadDepartments()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formErrors = validateSearchForm(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setErrors({})
    onSearch(formData)
  }

  const handleReset = () => {
    setFormData({
      keyword: "",
      department: 0,
      yearStart: "",
      yearEnd: "",
      hasImages: true,
      sortBy: "relevance",
    })
    setErrors({})
  }

  if (loading) {
    return <div className="search-form-loading">Memuat form pencarian...</div>
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} ref={formRef} noValidate>
      <h2 className="section-title">Cari Artwork</h2>

      <div className="form-grid">
        {/* Keyword Input */}
        <div className="form-group">
          <label htmlFor="keyword">Kata Kunci</label>
          <input
            id="keyword"
            type="text"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            placeholder="Cari judul, artis, dll..."
            className={`form-input ${errors.keyword ? "error" : ""}`}
            required
            minLength="2"
            maxLength="100"
            aria-invalid={!!errors.keyword}
            aria-describedby={errors.keyword ? "keyword-error" : undefined}
          />
          {errors.keyword && (
            <span className="error-message" id="keyword-error">
              {errors.keyword}
            </span>
          )}
        </div>

        {/* Department Select */}
        <div className="form-group">
          <label htmlFor="department">Departemen</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-select"
            aria-label="Pilih departemen"
          >
            <option value="0">Semua Departemen</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Year Start */}
        <div className="form-group">
          <label htmlFor="yearStart">Tahun Mulai</label>
          <input
            id="yearStart"
            type="number"
            name="yearStart"
            value={formData.yearStart}
            onChange={handleChange}
            placeholder="Contoh: 1900"
            className={`form-input ${errors.yearStart ? "error" : ""}`}
            min="-3000"
            max={new Date().getFullYear()}
            aria-invalid={!!errors.yearStart}
            aria-describedby={errors.yearStart ? "yearStart-error" : undefined}
          />
          {errors.yearStart && (
            <span className="error-message" id="yearStart-error">
              {errors.yearStart}
            </span>
          )}
        </div>

        {/* Year End */}
        <div className="form-group">
          <label htmlFor="yearEnd">Tahun Akhir</label>
          <input
            id="yearEnd"
            type="number"
            name="yearEnd"
            value={formData.yearEnd}
            onChange={handleChange}
            placeholder="Contoh: 2023"
            className={`form-input ${errors.yearEnd ? "error" : ""}`}
            min="-3000"
            max={new Date().getFullYear()}
            aria-invalid={!!errors.yearEnd}
            aria-describedby={errors.yearEnd ? "yearEnd-error" : undefined}
          />
          {errors.yearEnd && (
            <span className="error-message" id="yearEnd-error">
              {errors.yearEnd}
            </span>
          )}
        </div>

        {/* Has Images Checkbox */}
        <div className="form-group checkbox-group">
          <label htmlFor="hasImages" className="checkbox-label">
            <input
              id="hasImages"
              type="checkbox"
              name="hasImages"
              checked={formData.hasImages}
              onChange={handleChange}
              className="form-checkbox"
              aria-label="Hanya tampilkan artwork yang memiliki gambar"
            />
            <span>Hanya dengan Gambar</span>
          </label>
        </div>

        {/* Sort By */}
        <div className="form-group">
          <label htmlFor="sortBy">Urutkan Berdasarkan</label>
          <select
            id="sortBy"
            name="sortBy"
            value={formData.sortBy}
            onChange={handleChange}
            className="form-select"
            aria-label="Pilih urutan hasil"
          >
            <option value="relevance">Relevansi</option>
            <option value="date">Tanggal (Terbaru)</option>
            <option value="title">Judul (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Cari
        </button>
        <button type="reset" className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  )
}
