import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onUpdateLanguage, isSelected} = props
  const {id, language} = languageDetails

  const onClickChangeLanguage = () => {
    onUpdateLanguage(id)
  }

  const selectedClassName = isSelected
    ? 'selected-button'
    : 'non-selected-button'

  return (
    <li>
      <button
        type="button"
        className={selectedClassName}
        onClick={onClickChangeLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
