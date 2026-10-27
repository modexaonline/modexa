import Header from './Header'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'
import BackToTop from './BackToTop'
import ErrorBoundary from './ErrorBoundary'
import CookieNotice from './CookieNotice'

export default function Layout({ children, savedCount }) {
  return <><a className="skip-link" href="#main-content">Skip to content</a><AnnouncementBar/><Header savedCount={savedCount}/><main id="main-content"><ErrorBoundary>{children}</ErrorBoundary></main><Footer/><BackToTop/><CookieNotice/></>
}
