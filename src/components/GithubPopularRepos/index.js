import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiResponseConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    selectedOption: languageFiltersData[0].id,
    repositoriesList: [],
    status: apiResponseConstants.initial,
  }

  componentDidMount() {
    this.getSelectedRepos()
  }

  onUpdateLanguage = id => {
    this.setState({selectedOption: id}, this.getSelectedRepos)
  }

  onSuccessView = popularRepos => {
    const updatedData = popularRepos.map(eachRepos => ({
      name: eachRepos.name,
      id: eachRepos.id,
      issuesCount: eachRepos.issues_count,
      forksCount: eachRepos.forks_count,
      starsCount: eachRepos.stars_count,
      avatarUrl: eachRepos.avatar_url,
    }))
    this.setState({
      repositoriesList: updatedData,
      status: apiResponseConstants.success,
    })
  }

  onFailureView = () => {
    this.setState({status: apiResponseConstants.failure})
  }

  getSelectedRepos = async () => {
    this.setState({status: apiResponseConstants.inProgress})
    const {selectedOption} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${selectedOption}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      this.onSuccessView(popularRepos)
    }
  }

  renderLoader = () => {
    const {selectedOption} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(item => (
            <LanguageFilterItem
              languageDetails={item}
              key={item.id}
              onUpdateLanguage={this.onUpdateLanguage}
              isSelected={selectedOption === item.id}
            />
          ))}
        </ul>
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
        </div>
      </div>
    )
  }

  renderSuccessView = () => {
    const {selectedOption, repositoriesList} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(item => (
            <LanguageFilterItem
              languageDetails={item}
              key={item.id}
              onUpdateLanguage={this.onUpdateLanguage}
              isSelected={selectedOption === item.id}
            />
          ))}
        </ul>
        <ul className="reposit-container">
          {repositoriesList.map(eachRepository => (
            <RepositoryItem
              repositoryDetails={eachRepository}
              key={eachRepository.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const {selectedOption} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(item => (
            <LanguageFilterItem
              repositoryDetails={item}
              key={item.id}
              onUpdateLanguage={this.onUpdateLanguage}
              isSelected={selectedOption === item.id}
            />
          ))}
        </ul>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-view-img"
        />
        <h1 className="failure-heading">Something Went Wrong</h1>
      </div>
    )
  }

  render() {
    const {status} = this.state
    switch (status) {
      case apiResponseConstants.success:
        return this.renderSuccessView()
      case apiResponseConstants.failure:
        return this.renderFailureView()
      case apiResponseConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
