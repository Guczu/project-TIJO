const Header = ({ title, styles }) => {
  return (
    <header>
        <span className={styles}>
            {title}
        </span>
    </header>
  )
}

export default Header