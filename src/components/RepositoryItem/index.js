import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name">{name}</h1>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="avatar-logo"
        />
        <p className="statistics">{forksCount} forks</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="avatar-logo"
        />
        <p className="statistics">{starsCount} stars</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="avatar-logo"
        />
        <p className="statistics">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
