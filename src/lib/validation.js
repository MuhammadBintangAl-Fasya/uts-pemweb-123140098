
const VALIDATION_RULES = {
  keyword: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-'.,&()]*$/,
    message: "Kata kunci harus minimal 2 karakter",
  },
  yearStart: {
    minValue: -3000,
    maxValue: new Date().getFullYear(),
    message: "Masukkan tahun mulai antara 3000 SM dan tahun ini",
  },
  yearEnd: {
    minValue: -3000,
    maxValue: new Date().getFullYear(),
    message: "Masukkan tahun akhir antara 3000 SM dan tahun ini",
  },
}


export const validateSearchForm = (formData) => {
  const errors = {}


  if (!formData.keyword || formData.keyword.trim().length === 0) {
    errors.keyword = "Kata kunci wajib diisi"
  } else if (formData.keyword.length < VALIDATION_RULES.keyword.minLength) {
    errors.keyword = `Kata kunci minimal ${VALIDATION_RULES.keyword.minLength} karakter`
  } else if (formData.keyword.length > VALIDATION_RULES.keyword.maxLength) {
    errors.keyword = `Kata kunci maksimal ${VALIDATION_RULES.keyword.maxLength} karakter`
  } else if (!VALIDATION_RULES.keyword.pattern.test(formData.keyword)) {
    errors.keyword = "Kata kunci mengandung karakter tidak diizinkan"
  }

  if (formData.yearStart) {
    const year = Number.parseInt(formData.yearStart)
    if (isNaN(year) || year < VALIDATION_RULES.yearStart.minValue || year > VALIDATION_RULES.yearStart.maxValue) {
      errors.yearStart = VALIDATION_RULES.yearStart.message
    }
  }

  if (formData.yearEnd) {
    const year = Number.parseInt(formData.yearEnd)
    if (isNaN(year) || year < VALIDATION_RULES.yearEnd.minValue || year > VALIDATION_RULES.yearEnd.maxValue) {
      errors.yearEnd = VALIDATION_RULES.yearEnd.message
    }
  }

  if (formData.yearStart && formData.yearEnd) {
    const start = Number.parseInt(formData.yearStart)
    const end = Number.parseInt(formData.yearEnd)
    if (start > end) {
      errors.yearEnd = "Tahun akhir harus lebih besar atau sama dengan tahun mulai"
    }
  }

  return errors
}

export const validateField = (fieldName, value) => {
  const rule = VALIDATION_RULES[fieldName]
  if (!rule) return ""

  if (fieldName === "keyword") {
    if (!value || value.trim().length === 0) return "Wajib diisi"
    if (value.length < rule.minLength) return `Minimal ${rule.minLength} karakter`
    if (value.length > rule.maxLength) return `Maksimal ${rule.maxLength} karakter`
    if (!rule.pattern.test(value)) return rule.message
  }

  return ""
}
